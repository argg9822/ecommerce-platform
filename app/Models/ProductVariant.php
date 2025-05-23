<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    public function attributes()
    {
        return $this->hasMany(VariantAttribute::class);
    }
}
