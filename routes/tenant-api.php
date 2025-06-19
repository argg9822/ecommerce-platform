<?php

use App\Http\Controllers\Api\V1\AuthController;
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
    //Login and register
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);

    //Productos
    Route::apiResource('products', ProductController::class)
        ->only(['show', 'index']);

    //Comentarios
    Route::apiResource('reviews', ReviewController::class)
            ->except(['create', 'edit', 'update', 'destroy']);

    //Categorias
    Route::apiResource('categories', CategoryController::class)
        ->except(['create', 'edit', 'update', 'destroy']);

    Route::middleware('auth:sanctum')->group(function (){
        Route::apiResource('reviews', ReviewController::class)
            ->except(['show', 'index']);
    });
});
