<?php

namespace App\Models\Api\V1;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
