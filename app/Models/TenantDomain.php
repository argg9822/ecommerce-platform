<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TenantDomain extends Model
{
    protected $table = 'domains';
    
    protected $fillable = [
        'tenant_id',
        'domain',
        //'is_primary',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}
