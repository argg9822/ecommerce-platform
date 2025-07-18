<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{

    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'price',
        'compare_price',
        'cost',
        'stock',
        'slug',
        'sku',
        'barcode',
        'is_feature',
        'is_available',
        'relevance',
        'brand_id',
        'shipment',
        'meta_title',
        'meta_description',
        'key_words',
        'condition',        
        'show_condition',
        'warranty_policy',
        'disponibility_text',
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function categories()
    {   
        return $this->belongsToMany(Category::class);
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
}
