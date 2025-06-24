<?php

namespace App\Models;

use App\Models\Plan;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Log;
use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;
use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;

class Tenant extends BaseTenant implements TenantWithDatabase
{
    use HasFactory, HasDatabase, HasDomains;
    
    protected $casts = [
        'config' => 'array',
    ];

    protected $fillable = [
        'name',
        'domain',
        'logo',
        'plan_id',
        'is_active',
        'config',
        'data',
        'api_token',
        'phone',
        'owner_id'
    ];

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    public function domain()
    {
        return $this->hasOne(TenantDomain::class);
    }

    public function users() : BelongsToMany
    {
        return $this->belongsToMany(User::class, 'tenant_user', 'tenant_id', 'user_id')->withTimestamps();
    }

    public function getLogoUrl()
    {
        if ($this->logo) {
            return asset('storage/' . $this->logo);
        }
        return null;
    }

    public function getCurrency()
    {
        return $this->config['currency'] ?? 'COP';
    }

    public static function getCustomColumns(): array
    {
        return [
            'id',
            'name',
            'logo',
            'plan_id',
            'is_active',
            'config',
            'api_token',
        ];
    }

    public function getSchemaName(): string
    {
        return "tenant{$this->id}";
    }

    public function apiTokens()
    {
        return $this->hasMany(TenantApiToken::class);
    }
}
