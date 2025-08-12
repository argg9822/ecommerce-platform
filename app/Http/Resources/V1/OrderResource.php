<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'total' => $this->total,
            'status' => $this->status,
            'notes' => $this->notes,
            'shipping_city' => $this->shipping_city,
            'delivery_info' => $this->delivery_info,
            'items' => OrderItemResource::collection($this->whenLoaded('items')),
        ];
    }
}
