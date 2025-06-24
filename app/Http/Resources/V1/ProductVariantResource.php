<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductVariantResource extends JsonResource
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
            'price' => $this->price,
            'stock' => $this->stock,
            'is_available' => $this->is_available,
            'compare_price' => $this->compare_price, 
            'shipment' => $this->shipment,
            'attributes' => $this->whenLoaded('variantAttributes', function () {
                return $this->variantAttributes->map(function ($attribute) {
                    return [
                        'id' => $attribute->id,
                        'name' => $attribute->name,
                        'value' => $attribute->value
                    ];
                });
            }),  
        ];
    }
}
