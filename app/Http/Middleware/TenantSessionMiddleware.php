<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Stancl\Tenancy\Tenancy;
use Symfony\Component\HttpFoundation\Response;
use App\Models\TenantUser;

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
        
        $tenantAuthId = TenantUser::with('tenant')->where('user_id', Auth::id())->first()?->tenant?->id;
        // Log::info($tenantAuthId);
        if ($tenantId = $tenantAuthId) {            
            if (!$this->tenancy->initialized || $this->tenancy->tenant->id !== $tenantId) {
                $tenant = \App\Models\Tenant::find($tenantId);
                if ($tenant) {
                    $this->tenancy->initialize($tenant);
                    
                    config(['database.connections.tenant.schema' => "tenant{$tenant->id}"]);
                    app('db')->purge('tenant');

                    Inertia::share([
                        'tenant' => [
                            'id' => $tenant->id,
                            'logo' => $tenant->logo,
                            'name' => $tenant->name
                        ]
                    ]);
                }
            }
        }
        return $next($request);
    }
}
