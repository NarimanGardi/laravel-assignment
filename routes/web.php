<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::resource('products', ProductController::class)->except(['create', 'destroy']);
Route::redirect('/', route('products.index'));
