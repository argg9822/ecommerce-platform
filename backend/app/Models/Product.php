<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Brand;

class Product extends Model
{

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock'
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
}
