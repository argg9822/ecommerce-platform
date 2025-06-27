<?php

namespace App\Models\Api\V1;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'number',
        'status',
        'total',
        'notes',
        'shipping_address',
        'payment_id',
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
