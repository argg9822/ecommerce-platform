<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Services\TenantFileService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
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
    public function store(StoreCategoryRequest $request, TenantFileService $tenantService)
    {
        try{
            DB::beginTransaction();
            $imagePath = null;

            if($request->hasFile('image')){
                $imagePath = $tenantService->storeImages($request->file('image'), 'categories');
            }
    
            Category::create([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'description' => $request->description,
                'image' => $imagePath,
                'parent_id' => $request->parent_id
            ]);
            
            DB::commit();

            return redirect()->back()->with('flash.success', [
                'title' => 'Categoría creada correctamente',
                'message' => 'Recuerda que organizar bien tus categorías te ayudará a gestionar mejor tus productos y facilitará la navegación de tus clientes'
            ]);
                
        }catch(\Exception $e){
            DB::rollBack();
            Log::error("Error creando la categoria", [
                'message' =>$e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return redirect()->back()->with('flash.error', [
                'title' => 'No se pudo crear la categoría',
                'message' => 'Por verifica los datos ingresados e intenta nuevamente'
            ]);
        }        
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
