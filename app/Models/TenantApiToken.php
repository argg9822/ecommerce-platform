<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TenantApiToken extends Model
{
    protected $table = 'public.tenant_api_tokens';
    
    protected $fillable = [
        'tenant_id',
        'name',
        'token_hash',
        'last_used_at',
        'expired_at',
        'last_used_ip',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}
