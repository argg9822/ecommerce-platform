<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CouponCondition extends Model
{
    protected $fillable = [
        'condition_type',
        'condition_value',
        'coupon_id'
    ];

    public function coupon()
    {
        return $this->belongsTo(Coupon::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'coupon_condition_product');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'coupon_condition_category');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'coupon_condition_user');
    }
}
