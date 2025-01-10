<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;
    
    protected $fillable = ['name', 'quantity_in_stock', 'price_per_item', 'submitted_at'];

    protected $casts = [
        'price_per_item' => 'float',
    ];
}
