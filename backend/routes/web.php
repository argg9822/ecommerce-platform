<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TenantSetupController;
use App\Http\Middleware\TenantSessionMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
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
    Route::resource('tenants', TenantSetupController::class)->names([
        'index' => 'tenantIndex',
        'create' => 'tenantCreate',
        'store' => 'tenantStore',
    ]);

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::middleware(TenantSessionMiddleware::class)->group(function () {
        Route::resource('products', ProductController::class)->names([
            'index' => 'tenantProductsIndex',
            'create' => 'tenantProductsCreate'
        ]);

        Route::resource('categories', CategoryController::class)->names([
            'create' => 'categories_create',
            'store' => 'categories_store'
        ]);

        Route::resource('brands', BrandController::class)->names([
            'create' => 'brands_create',
            'store' => 'brands_store'
        ]);

        //Proxy files tenants
        Route::get('/media/{path}/{tenantId}', function($path, $tenantId){
            $tenantId = $tenantId ?? null;
            
            $filePath = "$tenantId/images/$path";

            if(!Storage::disk('public')->exists($filePath)){
                abort(404);
            }

            return response()->file(Storage::disk('tenant')->path($filePath));
        })->where('path', '.*')->name('tenant_media_admin');

        Route::get('/images/{path}', function ($path) {
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
        })->where('path', '.*')->name('tenant_media');
    });
});

require __DIR__.'/auth.php';
