<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{

    protected $casts = [
        'expires_at' => 'datetime',
        'only_first_order' => 'boolean',
    ];

    protected $fillable = [
        'code',
        'description',
        'discount_type',
        'discount_value',
        'expires_at',
        'usage_limit',
        'usage_per_user',
        'only_first_order'
    ];

    public function conditions()
    {
        return $this->hasMany(CouponCondition::class);
    }

    public function redemptions()
    {
        return $this->hasMany(CouponRedemption::class);
    }
}
