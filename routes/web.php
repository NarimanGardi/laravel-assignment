<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::get('/products/fetch', [ProductController::class, 'fetchProducts'])->name('products.fetch');
Route::resource('products', ProductController::class)->except(['create', 'destroy']);
Route::redirect('/', route('products.index'));
