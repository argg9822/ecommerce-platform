<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\TenantSessionMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'web', 'verified'])->group(function () {
    Route::resource('tenants', TenantController::class)->names([
        'index'  => 'tenantIndex',
        'create' => 'tenantCreate',
        'store'  => 'tenantStore',
    ]);

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::middleware(TenantSessionMiddleware::class)->group(function () {
        // Products
        Route::get('productos/index-lite', [ProductController::class, 'IndexLite'])->name('products_index_lite');
        Route::resource('productos', ProductController::class)->names([
            'index'   => 'products_index',
            'edit'    => 'products_edit',
            'create'  => 'products_create',
            'store'   => 'products_store',
            'destroy' => 'products_destroy',
            'show'    => 'products_show',
        ])->except('udpate');

        Route::post('productos/update/{id}', [ProductController::class, 'update'])->name('products_update');

        // Categories
        Route::get('categories/list', [CategoryController::class, 'list'])->name('categories_list');
        Route::resource('categories', CategoryController::class)->names([
            'index'  => 'categories_index',
            'create' => 'categories_create',
            'store'  => 'categories_store',
            'show'   => 'categories_show'
        ]);


        // Brands
        Route::resource('brands', BrandController::class)->names([
            'create' => 'brands_create',
            'store'  => 'brands_store'
        ]);

        // Orders
        Route::post('ordenes/update-status/{order}', [OrderController::class, 'updateStatus'])->name('orders_update_status');
        Route::resource('ordenes', OrderController::class)->names([
            'index' => 'orders_index'
        ]);
        
        // Coupons
        Route::resource('cupones', CouponController::class)->names([
            'index'  => 'coupons_index',
            'create' => 'coupons_create',
            'store'  => 'coupons_store'
        ]);

        // Clientes
         Route::resource('clientes', UserController::class)->names([
            'index'  => 'user_index',
            'create' => 'user_create',
            'store'  => 'user_store'
        ]);

        //Proxy files tenants admin
        Route::get('media/images/{path}/{tenantId}', function($path, $tenantId){
            $filePath = "$tenantId/images/$path";
        
            if (!Storage::disk('tenant')->exists($filePath)) {
                Log::error('Archivo no encontrado:', ['ruta' => $filePath]);
                abort(404);
            }
            
            return response()->file(Storage::disk('tenant')->path($filePath));
        })->where('path', '.*')->name('tenant_media_admin');

        //Proxy files tenants owners
        Route::get('tenants/images/{path}', function ($path) {
            $tenant = tenant();

            if (!$tenant) {
                Log::error('Tenant no inicializado al acceder a:', ['path' => $path]);
                abort(404, 'Tenant no encontrado');
            }

            $filePath = "$tenant->id/images/$path";
        
            if (!Storage::disk('tenant')->exists($filePath)) {
                Log::error('Archivo no encontrado:', ['ruta' => $filePath]);
                abort(404);
            }

            return response()->file(Storage::disk('tenant')->path($filePath));
        })->where('path', '.*')->name('tenant_media_owner');
    });
});

require __DIR__.'/auth.php';
