<?php

namespace App\Models\Api\V1;

use Illuminate\Database\Eloquent\Model;

class DeliveryAddresses extends Model
{
    protected $table = 'delivery_addresses';

    protected $fillable = [
        'user_id',
        'recipient_name',
        'phone',
        'address_line_1',
        'city',
        'state',
        'country',
        'is_default',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeDefault($query)
    {
        return $query->where('is_default', true);
    }

    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeWithDefault($query, $userId)
    {
        return $query->where('user_id', $userId)->orWhere('is_default', true);
    }

    public function scopeWithUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeWithId($query, $id)
    {
        return $query->where('id', $id);
    }

    public function scopeWithRecipientName($query, $recipientName)
    {
        return $query->where('recipient_name', 'like', '%' . $recipientName . '%');
    }

    public function scopeWithPhone($query, $phone)
    {
        return $query->where('phone', 'like', '%' . $phone . '%');
    }
    public function scopeWithAddressLine1($query, $addressLine1)
    {
        return $query->where('address_line_1', 'like', '%' . $addressLine1 . '%');
    }

    public function scopeWithCity($query, $city)
    {
        return $query->where('city', 'like', '%' . $city . '%');
    }
    
    public function scopeWithState($query, $state)
    {
        return $query->where('state', 'like', '%' . $state . '%');
    }
    public function scopeWithCountry($query, $country)
    {
        return $query->where('country', 'like', '%' . $country . '%');
    }
    public function scopeWithCreatedAt($query, $createdAt)
    {
        return $query->whereDate('created_at', $createdAt);
    }
    public function scopeWithUpdatedAt($query, $updatedAt)
    {
        return $query->whereDate('updated_at', $updatedAt);
    }
    public function scopeWithDeletedAt($query, $deletedAt)
    {
        return $query->whereDate('deleted_at', $deletedAt);
    }
    public function scopeWithTimestamps($query)
    {
        return $query->select('id', 'user_id', 'recipient_name', 'phone', 'address_line_1', 'city', 'state', 'country', 'is_default', 'created_at', 'updated_at');
    }
    public function scopeWithSoftDeletes($query)
    {
        return $query->withTrashed();
    }
    public function scopeWithSoftDeleted($query)
    {
        return $query->onlyTrashed();
    }
    public function scopeWithSoftRestored($query)
    {
        return $query->withTrashed()->whereNotNull('deleted_at');
    }
    public function scopeWithSoftForceDeleted($query)
    {
        return $query->onlyTrashed()->whereNotNull('deleted_at');
    }
    public function scopeWithSoftRestore($query)
    {
        return $query->withTrashed()->whereNotNull('deleted_at');
    }
}
