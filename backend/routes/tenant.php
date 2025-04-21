<?php

declare(strict_types=1);

use App\Http\Controllers\Tenant\ProductController;
use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;
use App\Http\Controllers\TenantSetupController;

//Controllers


/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the TenantRouteServiceProvider.
|
| Feel free to customize them however you want. Good luck!
|
*/

Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])->group(function () {
    
});


Route::controller(ProductController::class)->group(function () {
    Route::get('/products', 'index')->name('tenant.products.index');
    Route::get('/products/create', 'create')->name('tenant.products.create');
    Route::post('/products/store', 'store')->name('tenant.products.store');
    Route::get('/products/{product}/edit', 'edit')->name('tenant.products.edit');
    Route::put('/products/{product}', 'update')->name('tenant.products.update');
    Route::delete('/products/{product}', 'destroy')->name('tenant.products.destroy');
});

Route::middleware(['auth'])->group(function (){
    Route::post('/tenant-setup/create/{tenantDomain}', [TenantSetupController::class, 'create'])->name('tenant.create');
});
