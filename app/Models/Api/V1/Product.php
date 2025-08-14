<?php

namespace App\Models\Api\V1;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $appends = ['average_rating', 'count_reviews'];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function getAverageRatingAttribute(): float
    {
        return round($this->reviews()->avg('rating') ?? 0, 1);
    }

    public function getCountReviewsAttribute(): int
    {
        return $this->reviews()->count();
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class, 'product_id', 'id');
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id', 'id');
    }

    public function categories()
    {   
        return $this->belongsToMany(Category::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'product_id', 'id')
            ->where('is_visible', true)
            ->where('is_approved', true);
    }
}
