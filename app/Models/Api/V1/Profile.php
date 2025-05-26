<?php

namespace App\Models\Api\V1;

use App\Models\Api\V1\User;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'user_id',
        'birth_date',
        'gender',
        'phone_number',
        'shipping_address',
        'document_number',
        'country',
        'postal_code',
        'city',
        'state',
        'language_preference',
        'timezone',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
