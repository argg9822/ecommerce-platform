<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TenantUser extends Model
{
    protected $table = 'tenant_user';

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}
