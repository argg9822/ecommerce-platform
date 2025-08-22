<?php

namespace App\Models\Api\V1;

use Illuminate\Database\Eloquent\Model;

class CouponCondition extends Model
{
    public function coupon()
    {
        return $this->belongsTo(Coupon::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'coupon_condition_product')
            ->withTimestamps();
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'coupon_condition_category')
            ->withTimestamps();
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'coupon_condition_user')
            ->withTimestamps();
    }

    public function conditions()
    {
        return $this->hasMany(CouponCondition::class, 'coupon_id');
    }
}
