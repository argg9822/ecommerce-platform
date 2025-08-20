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
}
