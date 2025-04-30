<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TenantSetupController;
use App\Http\Middleware\TenantSessionMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::controller(TenantSetupController::class)->group(function () {
        Route::get('/tenants', 'index')->name('tenantIndex');
        Route::get('/tenants/create', 'create')->name('tenantCreate');
        Route::post('/tenants/store', 'store')->name('tenantStore');
        Route::get('/tenants/{tenant}/edit', 'edit')->name('tenant.edit');
        Route::put('/tenants/{tenant}', 'update')->name('tenant.update');
        Route::delete('/tenants/{tenant}', 'destroy')->name('tenant.destroy');
    });
    
    Route::middleware(TenantSessionMiddleware::class)->group(function () {
        Route::controller(ProductController::class)->group(function () {
            Route::get('/products', 'index')->name('tenantProductsIndex');
            Route::get('/products/create', 'create')->name('tenantProductsCreate');
            Route::post('/products/store', 'store')->name('tenant.products.store');
            Route::get('/products/{product}/edit', 'edit')->name('tenant.products.edit');
            Route::put('/products/{product}', 'update')->name('tenant.products.update');
            Route::delete('/products/{product}', 'destroy')->name('tenant.products.destroy');
        });
    });

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
