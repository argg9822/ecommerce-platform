<?php

namespace App\Models\Api\V1;

use Illuminate\Database\Eloquent\Model;

class DeliveryAddresses extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
