<?php

namespace App\Http\Middleware;

use App\Models\Tenant;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Stancl\Tenancy\Tenancy;
use Symfony\Component\HttpFoundation\Response;
use App\Models\TenantUser;
use Illuminate\Support\Facades\Log;

class TenantSessionMiddleware
{
    protected $tenancy;

    public function __construct(Tenancy $tenancy)
    {
        $this->tenancy = $tenancy;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $tenantUser = \App\Models\TenantUser::where('user_id', Auth::id())->first();

        if ($tenantUser) {
            $tenantId = $tenantUser->tenant_id;

            if (!tenancy()->initialized || tenancy()->tenant->id !== $tenantId) {
                $tenant = \App\Models\Tenant::find($tenantId);

                if ($tenant) {
                    tenancy()->initialize($tenant);

                    config(['database.connections.tenant.schema' => "tenant{$tenant->id}"]);
                    app('db')->purge('tenant');

                    Inertia::share([
                        'tenant' => [
                            'id' => $tenant->id,
                            'logo' => $tenant->logo,
                            'name' => $tenant->name
                        ]
                    ]);
                } else {
                    Log::warning("Tenant no encontrado con ID: $tenantId");
                }
            }
        } else {
            Log::warning("No se encontró relación tenant_user para el usuario ID: " . Auth::id());
        }

        return $next($request);
    }
}
