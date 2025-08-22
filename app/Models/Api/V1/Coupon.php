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
        return $this->belongsToMany(User::class, 'coupon_user');
    }

    public function cities()
    {
        return $this->belongsToMany(City::class, 'coupon_city');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'coupon_product');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'coupon_category');
    }
}
