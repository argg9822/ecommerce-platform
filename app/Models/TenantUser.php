<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TenantUser extends Model
{
    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}
