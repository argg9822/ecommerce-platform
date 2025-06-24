<?php

namespace App\Models\Api\V1;

use App\Policies\ReviewPolicy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class Review extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'product_id',
        'user_id',
        'rating',
        'title',
        'comment',
    ];

    protected $policies = [
        Review::class => ReviewPolicy::class,
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
