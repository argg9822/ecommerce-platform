<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CouponResource extends JsonResource
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
            'code' => $this->code,
            'description' => $this->description,
            'discount_type' => $this->discount_type,
            'discount_value' => $this->discount_value,
            'expires_at' => $this->expires_at ? $this->expires_at->toDateString() : null,
            'usage_limit' => $this->usage_limit,
            'usage_per_user' => $this->usage_per_user,
            'only_first_order' => $this->only_first_order,
            'conditions' => CouponConditionResource::collection($this->whenLoaded('conditions')),
            'redemptions_count' => $this->redemptions()->count(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
