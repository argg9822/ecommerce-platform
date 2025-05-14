<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TenantAware extends Model
{
    protected static function booted()
    {
        static::addGlobalScope('tenant', function ($builder) {
            if($tenant = app('currentTenant')) {
                $builder->where('tenant_id', $tenant->id);
            }
        });
    }
}
