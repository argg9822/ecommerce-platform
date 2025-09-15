<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class Order extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    
    protected $casts = [
        'delivery_info' => 'array',
    ];
    
    protected $fillable = [
        'id',
        'preference_id',
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

    public function statusHistory()
    {
        return $this->hasMany(OrderStatusHistory::class);
    }

    public function payments()
    {
        return $this->hasMany(OrderPayment::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });

        static::updating(function ($order) {
            if ($order->isDirty('status')) {
                $changeBy = Auth::user() ? [
                    'name'  => Auth::user()->name,
                    'email' => Auth::user()->email,
                    'role' => Auth::user()->role ?? 'customer',
                ] : null;
                
                OrderStatusHistory::create([
                    'order_id'   => $order->id,
                    'old_status' => $order->getOriginal('status'),
                    'new_status' => $order->status,
                    'changed_by' => $changeBy,
                ]);
            }
        });
    }
}
