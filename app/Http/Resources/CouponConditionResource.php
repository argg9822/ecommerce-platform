<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CouponConditionResource extends JsonResource
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
            'condition_type' => $this->condition_type,
            'condition_value' => $this->condition_value,
            'items' => [
                'products' => ProductConditionResource::collection($this->whenLoaded('products')),
                'clients' => UserConditionResource::collection($this->whenLoaded('users')),
                'categories' => CategoryConditionResource::collection($this->whenLoaded('categories')),
            ]
        ];
    }
}
