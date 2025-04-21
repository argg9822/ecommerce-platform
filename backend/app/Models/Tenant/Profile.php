<?php

namespace App\Models\Tenant;

use App\Models\Tenant\User;
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
