<?php

namespace App\Models\Api\V1;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'number',
        'status',
        'total',
        'notes'
    ];
}
