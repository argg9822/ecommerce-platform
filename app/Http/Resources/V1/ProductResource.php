<?php

namespace App\Http\Resources\V1;

use App\Http\Resources\V1\BrandResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => $this->price,
            'compare_price' => $this->compare_price,
            'stock' => $this->stock,
            'is_available' => $this->is_available,
            'is_feature' => $this->is_feature,
            'relevance' => $this->relevance,
            'qualification' => $this->average_rating ?? 0,
            'brand' => new BrandResource($this->whenLoaded('brand')),
            'variants' => ProductVariantResource::collection($this->whenLoaded('variants')),
            'images' => ProductImageResourse::collection($this->whenLoaded('images')),
            'categories' => CategoryResource::collection($this->whenLoaded('categories')),
            'reviews' => ReviewResource::collection($this->whenLoaded('reviews')),
            'reviews_count' => $this->count_reviews ?? 0,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'seo' => [
                'title' => $this->meta_title,
                'description' => $this->meta_description,
                'keywords' => $this->key_words,
            ],
        ];
    }
}
