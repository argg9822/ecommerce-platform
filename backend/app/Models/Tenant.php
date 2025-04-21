<?php

namespace App\Models;

use App\Models\Plan;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Log;
use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;
use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;
use Illuminate\Support\Str;

class Tenant extends BaseTenant implements TenantWithDatabase
{
    use HasFactory, HasDatabase, HasDomains;
    
    protected $casts = [
        'data' => 'array',
    ];

    protected $fillable = [
        'name',
        'domain',
        'logo',
        'plan_id',
        'is_active',
        'data',
        'api_token',
        'phone'
    ];

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    public function getLogoUrl()
    {
        if ($this->logo) {
            return asset('storage/' . $this->logo);
        }
        return null;
    }

    public function byDomain($domain)
    {
        return $this->where('domain', $domain)->first();
    }

    public function getCurrency()
    {
        return $this->data['currency'] ?? 'COP';
    }

    public static function getCustomColumns(): array
    {
        return [
            'id',
            'name',
            'logo',
            'plan_id',
            'is_active',
            'data',
            'api_token',
        ];
    }
}
