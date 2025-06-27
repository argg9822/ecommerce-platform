<?php

use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\IdentifyTenant;

//API Controllers
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Auth\GoogleAuthController;
use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\ReviewController;
use App\Http\Controllers\Api\V1\OrderPaymentController;
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

    //Google and register Google
    Route::get('auth/google/redirect', [GoogleAuthController::class, 'redirect']);
    Route::post('auth/google/callback', [GoogleAuthController::class, 'callback']);

    //Productos
    Route::apiResource('products', ProductController::class)
        ->only(['index', 'show']);

    //Categorias
    Route::apiResource('categories', CategoryController::class)
        ->only(['index', 'show']);

    Route::middleware('auth:sanctum')->group(function (){
        // Reviews y calificaciones
        Route::apiResource('reviews', ReviewController::class)
            ->except(['create', 'edit']);

        // Órdenes
        Route::apiResource('orders', OrderController::class)
            ->except(['create', 'edit', 'update', 'destroy']);

        // Pagos de órdenes
        Route::apiResource('order-payments', OrderPaymentController::class)
            ->except(['create', 'edit', 'update', 'destroy']);
    });
});
