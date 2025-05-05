<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

//Models
use App\Models\Tenant;
use Illuminate\Support\Facades\Storage;

//Requests
use App\Http\Requests\StoreTenantRequest;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;

class TenantSetupController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Tenant/Setup', [
            'tenants' => Tenant::with(['plan', 'owner'])->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Tenant/Create', [
            'plans' => Plan::all(),
        ]);
    }

    public function store(StoreTenantRequest $request)
    {
        $tenantName = Str::lower(Str::slug($request->tenant_name));
        $tenantExists = Tenant::where('name', "$tenantName")->first();
        if ($tenantExists) {
            return to_route('tenantCreate')->with(['error' => 'La tienda ya existe']);
        }

        DB::beginTransaction();
        try {
            $additionalData = [
                'currency' => $request->currency,
                'timezone' => $request->tenant_timezone,
                'language' => $request->tenant_language,
                'email' => $request->tenant_email
            ];

            $tenant = Tenant::create([
                'name' => $tenantName,
                'plan_id' => $request->plan,
                'is_active' => true,
                'api_token' => hash('sha256', Str::uuid()->toString() . now()),
                'config' => $additionalData,
            ]);

            $pathLogo = null;
            if ($request->hasFile('tenant_logo')) {
                $pathLogo = $this->saveLogo($request->file('tenant_logo'), $tenant->id);
            }

            $this->createOwner($request, $tenant, $pathLogo);

            $tenantDomain = Str::slug($request->domain).".".Str::lower($request->domain_extension);
            $tenant->domains()->create(['domain' => $tenantDomain]);

            tenancy()->initialize($tenant);
            DB::connection('tenant')->statement("SET search_path TO \"tenant$tenant->id\"");

            Artisan::call('tenants:migrate', [
                '--path' => 'database/migrations/tenant',
                '--database' => 'tenant',
                '--force' => true,
            ]);
        
            DB::commit();
            tenancy()->end();

            return to_route('tenantIndex')->with(['success' => "Tienda {$tenantName} creada con éxito."]);
        
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creando tenant', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return to_route('tenantCreate')->with(['error' => 'Error al crear la tienda']);
        }
    }

    private function saveLogo($tenantLogo, $tenantId)
    {
        $logoName = uniqid() . '.' . $tenantLogo->getClientOriginalExtension();
        $logopath = "logos/$logoName";

        $logoSaved = $tenantLogo->storeAs(
            "$tenantId/images/logos", 
            $logoName,
            'tenant'
        );

        if($logoSaved){
            return $logopath;
        }
    }

    private function createOwner($request, $tenant, $logoPath)
    {
        try{
            $user = User::create([
                'name' => $request->user_name,
                'email' => $request->user_email,
                'password' => Hash::make($request->user_password),
                'role' => 'owner',
                'tenant_id' => $tenant->id,
                'phone' => trim($request->phone_indicator." ".$request->user_phone),
            ]);
    
            if(!$user->wasRecentlyCreated){
                throw new Exception("No se pudo crear el usuario propietario.");
            }

            if(empty($user->id)) {
                throw new Exception("El usuario se creó pero no tiene ID válido");
            }
    
            $tenant->owner_id = $user->id;
            $tenant->logo = $logoPath;
            $updated = $tenant->save();
            
            // $updated = $tenant->update([
            //     'owner_id' => $user->id,
            //     'logo' => $logoPath            
            // ]);

            if(!$updated){
                throw new Exception("No se pudo actualizar el id del propietario en la tabla tenants");
            }
        }catch(Exception $e){
            Log::error("Error al guardar el propietario de la tienda ". $e->getMessage());
            throw $e;
        }
    }
}
