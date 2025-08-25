<?php

namespace App\Models\Api\V1;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    public function getRouteKeyName()
    {
        return 'code';
    }

    protected $casts = [
        'expires_at' => 'datetime',
    ];

    public function conditions()
    {
        return $this->hasMany(CouponCondition::class);
    }

    public function redemptions()
    {
        return $this->hasMany(CouponRedemption::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function cities()
    {
        return $this->belongsToMany(City::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
}
