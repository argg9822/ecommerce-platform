<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Brand;

class Product extends Model
{

    protected $fillable = [
        'name',
        'brand_id',
        'description',
        'category_id',
        'is_available',
        'price',
        'compare_price',
        'cost',
        'stock',
        'sku',
        'barcode',
        'is_feature',
        'shipment',
        'show_condition',
        'warranty_policy',
        'relevance',
        'key_words',
        'condition',
        'disponibility_text',
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
}
