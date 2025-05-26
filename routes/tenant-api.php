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
    // Route::apiResource('products', ProductController::class)->except(['show']);
    Route::get('products/{product}', [ProductController::class, 'show'])->name('products.show');
    Route::get('product/search', [ProductController::class, 'search'])->name('products.search');
    Route::get('products', [ProductController::class, 'index'])->name('products.index');
});
