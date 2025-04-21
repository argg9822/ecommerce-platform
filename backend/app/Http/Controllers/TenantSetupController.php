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

class TenantSetupController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Tenant/Setup', [
            'tenants' => Tenant::all(),
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

        Log::info($request->all());
        $tenantExists = Tenant::where('name', "$tenantName")->first();
        if ($tenantExists) {
            return response()->json(['error' => 'La tienda ya existe'], 400);
        }

        $logoPath = '';

        if($request->hasFile('tenant_logo')){
            $tenantLogo = $request->file('tenant_logo');
            $logoName = uniqid() . '.' . $tenantLogo->getClientOriginalExtension();
            $logoPath = "tenants/$tenantName/logos/$logoName";
            Storage::disk('public')->putFileAs("tenants/$tenantName/logos", $tenantLogo, $logoName);
        }

        $tenantDomain = Str::lower($request->domain);
        $tenantDomainExtension = Str::lower(Str::slug($request->domain_extension));

        $additionalData = [
            'currency' => $request->currency,
            'timezone' => $request->tenant_timezone,
            'language' => $request->tenant_language,
            'email' => $request->tenant_email
        ];

        try {
            $tenant = Tenant::create([
                'name' => $tenantName,
                'plan_id' => $request->plan,
                'is_active' => true,
                'api_token' => hash('sha256', Str::uuid()->toString() . now()),
                'logo' => $logoPath,
                'data' => json_encode($additionalData),
            ]);

            $tenant->domains()->create(['domain' => "$tenantDomain.$tenantDomainExtension"]);
            $this->createUser($request, $tenant);
            tenancy()->initialize($tenant);
            DB::connection('tenant')->statement("SET search_path TO \"$tenantName\"");

            Artisan::call('tenants:migrate', [
                '--path' => 'database/migrations/tenant',
                '--database' => 'tenant',
                '--force' => true,
            ]);
        
            tenancy()->end();

            return response()->json(['success' => "Tienda {$tenantName} creada con éxito."]);
        
        } catch (\Exception $e) {
            Log::error('Error creando tenant', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['error' => 'Error al crear la tienda'], 500);
        }
    }

    private function createUser($request, $tenant)
    {
        $tenant_id = $tenant->id;

        $user = User::create([
            'name' => $request->user_name,
            'email' => $request->user_email,
            'password' => bcrypt($request->user_password),
            'tenant_id' => $tenant_id,
            'phone' => $request->user_phone,
        ]);

        if(!$user->wasRecentlyCreated){
            return false;
        }

        return true;
    }
}
