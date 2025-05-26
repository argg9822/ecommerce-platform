<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    protected $fillable = [
        'product_id',
        'price',
        'compare_price',
        'stock',
        'shipment',
        'is_available'
    ];

    public function attributes()
    {
        return $this->hasMany(VariantAttribute::class);
    }
}
