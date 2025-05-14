<?php 

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use Stancl\Tenancy\Tenancy;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class InitializeTenantAfterLogin
{
    protected Tenancy $tenancy;

    public function __construct(Tenancy $tenancy)
    {
        $this->tenancy = $tenancy;
    }

    public function handle(Login $event): void
    {
        $user = $event->user;

        if ($user->tenant_id) {
            $tenant = \App\Models\Tenant::find($user->tenant_id);

            if(!$tenant){
                Log::error("Tenant no encontrado");
                return;
            }

            $this->tenancy->initialize($tenant);
            DB::connection('tenant')->statement("SET search_path TO \"tenant$tenant->id\"");
        }
    }
}
