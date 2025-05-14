<?php

namespace App\Listeners;

use Stancl\Tenancy\Events\TenancyInitialized;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;

class SetTenantSchema
{
    /**
     * Handle the event.
     */
    public function handle(TenancyInitialized $event): void
    {
        // $schema = $event->tenancy->tenant->id;
        // if(!empty($schema)){
        //     DB::connection('tenant')->statement("SET search_path TO \"$schema\"");
        // }
    }
}
