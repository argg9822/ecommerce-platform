<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderPayment extends Model
{
    protected $fillable = [
        'transaction_id',
        'status',
        'order_id',
        'amount',
        'payment_method',
        'approved_at',
        'operation_type',        
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
