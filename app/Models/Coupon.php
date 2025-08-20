<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $fillable = [
        'code',
        'type',
        'amount',
        'expiration_date',
        'usage_limit',
        'usage_per_user'
    ];

    public function conditions()
    {
        return $this->hasMany(CouponCondition::class);
    }
}
