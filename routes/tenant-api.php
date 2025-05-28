<?php

use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;
use App\Http\Controllers\Api\V1\ProductController;
use Stancl\Tenancy\Middleware\InitializeTenancyByPath;

// Route::middleware([
//     'api',
//     InitializeTenancyByDomain::class,
//     PreventAccessFromCentralDomains::class,
// ])->prefix('v1')->group(function () {
//     Route::apiResource('products', ProductController::class);
// });

Route::middleware([
    'api',
    InitializeTenancyByPath::class,
])->prefix('tenants/{tenant}/v1')->group(function () {
    //Productos
    Route::get('product/search', [ProductController::class, 'search'])->name('products.search');
    Route::apiResource('products', ProductController::class)->except(['create', 'edit', 'update', 'destroy']);

    //Categorias
    Route::apiResource('categories', \App\Http\Controllers\Api\V1\CategoryController::class)
        ->except(['create', 'edit', 'update', 'destroy']);
});