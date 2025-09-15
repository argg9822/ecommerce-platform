<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    public function products ()
    {
        return $this->belongsToMany(Product::class, 'order_items', 'id', 'product_id');
    }
}
