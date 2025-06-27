<?php

namespace App\Models\Api\V1;

use Illuminate\Database\Eloquent\Model;

class OrderPayment extends Model
{
    protected $fillable = [
        'amount',
        'payment_method',
        'transaction_id',
        'status',
        'order_id',
        'currency_id',
        'operation_type',
        'approved_at'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
