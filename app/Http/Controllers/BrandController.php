<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Http\Requests\StoreBrandsRequest;
use App\Http\Requests\UpdateBrandsRequest;
use Illuminate\Support\Str;

use App\Services\TenantFileService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandsRequest $request, TenantFileService $tenantService)
    {
        try {
            DB::beginTransaction();
            $imagePath = null;

            if ($request->hasFile('logo')) {
                $imagePath = $tenantService->storeImages($request->file('logo'), 'brands');
            }

            Brand::create([
                'name' => $request->name,
                'logo' => $imagePath,
                'slug' => Str::slug($request->name),
                'is_active' => true
            ]);
            DB::commit();

            return redirect()->back()->with([
                'flash.success' => ['
                    title' => 'Marca guardada correctamente',
                    'message' => 'Recuerda que el producto puede generar más interes dependiendo de la marca.'
                ],
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("No se pudo guardar la marca en la base de datos", [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return redirect()->back()->with([
                'flash.error' => [
                    'title' => 'Ocurrió un error',
                    'message' => 'Hubo un error al intentar guardar el dato de la marca'
                ]
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brands)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brands)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandsRequest $request, Brand $brands)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brands)
    {
        //
    }
}
