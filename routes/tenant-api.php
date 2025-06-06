<?php

use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;
use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\ReviewController;
use App\Http\Middleware\IdentifyTenant;
// use Stancl\Tenancy\Middleware\InitializeTenancyByPath;

Route::middleware([
    'api',
    IdentifyTenant::class,
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])->prefix('v1')->group(function () {
    //Productos
    Route::apiResource('products', ProductController::class)
        ->except(['create', 'edit', 'update', 'destroy']);

    Route::post('reviews', ReviewController::class)
        ->except(['create', 'edit', 'update', 'destroy']);

    Route::apiResource('products', ProductController::class)
        ->except(['create', 'edit', 'update', 'destroy']);

    //Categorias
    Route::apiResource('categories', CategoryController::class)
        ->except(['create', 'edit', 'update', 'destroy']);

    Route::middleware('auth:sanctum')->group(function (){
        
    });
});
