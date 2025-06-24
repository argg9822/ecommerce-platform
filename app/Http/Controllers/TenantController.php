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
use Exception;

//Models
use App\Models\Tenant;
use App\Models\User;
use App\Models\TenantApiToken;

//Requests
use App\Http\Requests\StoreTenantRequest;
use Illuminate\Support\Facades\Hash;

class TenantController extends Controller
{
    public function index(): Response
    {
        $tenants = Tenant::with(['plan', 'users', 'apiTokens'])->get();
        
        return Inertia::render('Tenant/Index', [
            'tenants' => $tenants,
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
        DB::beginTransaction();
        try {
            $additionalData = [
                'currency' => $request->currency,
                'timezone' => $request->tenant_timezone,
                'language' => $request->tenant_language,
                'email' => $request->tenant_email
            ];

            $tenant = Tenant::create([
                'name' => Str::lower(Str::slug($request->name)),
                'plan_id' => $request->plan,
                'is_active' => true,
                'config' => $additionalData,
            ]);

            $pathLogo = null;
            if ($request->hasFile('tenant_logo')) {
                $pathLogo = $this->saveLogo($request->file('tenant_logo'), $tenant->id);
            }
            $ownerCreated = $this->createOwner($request, $tenant, $pathLogo);

            if(!$ownerCreated["success"]){
                DB::rollBack();
                return redirect()->back()->with('flash.error', [
                    'title' => "Error al crear la tienda",
                    'message' => $ownerResult['error'] ?? "Error desconocido al crear el propietario.",
                ]);
            }

            $plainTextToken = $this->createToken($tenant);
            
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

            return Inertia::render('Tenant/View/Index', [
                'tenant' => $tenant->load(['plan', 'domain', 'users', 'apiTokens']),
                'token' => $plainTextToken,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creando tenant', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            
            return redirect()->back()->with('flash.error', [
                'title' => 'Error al crear la tienda',
                'message' => "Hubo un error al crear la tienda",
            ]);
        }
    }

    private function createToken($tenant)
    {
        $plainTextToken = Str::random(40);

        try {
            TenantApiToken::create([
                'tenant_id' => $tenant->id,
                'name' => 'softgenix',
                'token_hash' => Hash::make($plainTextToken),
            ]);

            return $plainTextToken;
        } catch (\Exception $e) {
            Log::error(["Error" => "Error al crear el token ".$e->getMessage()]);
            throw $e;
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
        try {
            $user = User::create([
                'name' => $request->user_name,
                'email' => $request->user_email,
                'password' => Hash::make($request->user_password),
                'role' => 'owner',
                'phone' => trim($request->phone_indicator . " " . $request->user_phone),
            ]);

            $tenant->users()->attach($user->id);

            if (!$user->wasRecentlyCreated) {
                throw new \Exception("El usuario no se creó correctamente.");
            }

            $tenant->update(['logo' => $logoPath]);

            return ['success' => true];
            
        } catch (\Exception $e) {
            Log::error("Error al crear propietario: " . $e->getMessage());
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
}
