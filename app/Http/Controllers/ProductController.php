<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use App\Services\TenantFileService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * @var TenantFileService
     */
    protected $tenantFileService;

    public function __construct(TenantFileService $tenantService)
    {
        $this->tenantFileService = $tenantService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with([
            'brand:id,name',
            'variants' => function($query){
                $query->select('id', 'product_id', 'price', 'compare_price', 'stock', 'shipment','is_available')
                    ->orderBy('price', 'asc')
                    ->with(['variantAttributes:id,product_variant_id,name,value']);
                },
            'images:id,product_id,url'
        ])->select(
            'id',
            'name',
            'description',
            'price',
            'compare_price',
            'stock',
            'is_feature',
            'is_available',
            'relevance'
        )->get();

        return Inertia::render('Products/Index', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::with(['parent' => function ($query) {
            $query->select('id', 'name');
        }])->select('id', 'name', 'description', 'image', 'parent_id')->get();

        $brands = Brand::select('id', 'name')->get();
        $unavailableRelevances = Product::select('relevance')
            ->whereNotNull('relevance')
            ->whereBetween('relevance', [1, 5])
            ->distinct()
            ->pluck('relevance')
            ->toArray();

        return Inertia::render('Products/ProductEditor', [
            'categories' => $categories,
            'brands' => $brands,
            'mode' => 'create',
            'unavailableRelevances' => $unavailableRelevances
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)    
    {
        try {
            DB::beginTransaction();
            $product = Product::create($request->safe()
                ->merge(
                    ['slug' => Str::slug($request->name)]
                )->only([
                    'name',
                    'description',
                    'price',
                    'compare_price',
                    'cost',
                    'stock',
                    'sku',
                    'barcode',
                    'is_feature',
                    'is_available',
                    'relevance',
                    'brand_id',
                    'shipment',
                    'meta_title',
                    'meta_description',
                    'key_words',
                    'condition',        
                    'show_condition',
                    'warranty_policy',
                    'disponibility_text'
                ])
            );

            //Guardar categorías
            if ($request->filled('categories')) {
                $product->categories()->sync($request->input('categories'));
            }

            //Guardar imágenes
            $newImages = $request->file('new_images');
            
            if(is_array($newImages) && count(array_filter($newImages))){
                $this->storeImages($newImages, $product);
            }

            //Guardar variantes
            $variants = $request->input('variants');

            if (is_array($variants) && count(array_filter($variants))) {
                $this->saveVariants($variants, $product);
            }

            DB::commit();
            return redirect()->back()->with('flash.success', [
                'title' => 'Éxito',
                'message' => 'Producto guardado correctamente'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creating product: ' . $e->getMessage());
            return redirect()->back()->with('flash.error', [
                'title' => 'Error',
                'message' => 'No se pudo guardar el producto'
            ]);
        }
    }

    private function storeImages($newImages, $savedProduct)
    {
        if (!is_array($newImages)) {
            return false;
        }

        $imagesPaths = [];
        
        foreach ($newImages as $image) {
            $path = $this->tenantFileService->storeImages($image, 'products');
            if ($path) {
                $imagesPaths[] = ['url' => $path];
            }
        }

        if (!empty($imagesPaths)) {
            $savedProduct->images()->createMany($imagesPaths);
        }
    }

    private function saveVariants(array $variants, Product $product)
    {
        $idsReceived = [];

        foreach ($variants as $variantData) {
            if (!empty($variantData['id'])) {
                $variant = $product->variants()->find($variantData['id']);
                if (!$variant) {
                    continue;
                }

                $variant->update([
                    'price' => $variantData['price'],
                    'compare_price' => $variantData['compare_price'],
                    'stock' => $variantData['stock'],
                    'shipment' => $variantData['shipment'],
                    'is_available' => $variantData['is_available'],
                ]);

                $variant->variantAttributes()->delete();

                $idsReceived[] = $variant->id;
            } else {
                $variant = $product->variants()->create([
                    'price' => $variantData['price'],
                    'compare_price' => $variantData['compare_price'],
                    'stock' => $variantData['stock'],
                    'shipment' => $variantData['shipment'],
                    'is_available' => $variantData['is_available'],
                ]);

                $idsReceived[] = $variant->id;
            }

            // Dimensiones
            if (!empty($variantData['variant_attributes']['dimensions'])) {
                foreach ($variantData['variant_attributes']['dimensions'] as $key => $dimension) {
                    if (!empty($dimension['value']) && $dimension['value'] > 0) {
                        $variant->variantAttributes()->create([
                            'name' => $key,
                            'value' => $dimension['value'] . ' ' . $dimension['unit'],
                        ]);
                    }
                }
            }

            // Variant attributes
            if (!empty($variantData['variant_attributes']['custom'])) {
                foreach ($variantData['variant_attributes']['custom'] as $attribute) {
                    $variant->variantAttributes()->create([
                        'name' => $attribute['name'],
                        'value' => $attribute['value'],
                    ]);
                }
            }

            // Colores
            if (!empty($variantData['variant_attributes']['colors'])) {
                foreach ($variantData['variant_attributes']['colors'] as $color) {
                    if (!empty($color['selected']) && $color['selected'] == 1) {
                        $variant->variantAttributes()->create([
                            'name' => 'color',
                            'value' => $color['value'],
                        ]);
                    }
                }
            }
        }

        // Eliminar variantes que ya no están
        $product->variants()
            ->whereNotIn('id', $idsReceived)
            ->each(function ($variant) {
                $variant->variantAttributes()->delete();
                $variant->delete();
            });
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($productId)
    {
        $product = Product::with([
            'brand:id,name',
            'variants' => function($query){
                $query->select('id', 'product_id', 'price', 'compare_price', 'stock', 'shipment','is_available')
                    ->orderBy('id', 'asc')
                    ->with(['variantAttributes:id,product_variant_id,name,value']);
                },
            'images:id,product_id,url',
        ])->findOrFail($productId);

        $product->categories = $product->categories()->pluck('categories.id');

        $unavailableRelevances = Product::select('relevance')
            ->whereNotNull('relevance')
            ->whereBetween('relevance', [1, 5])
            ->distinct()
            ->pluck('relevance')
            ->toArray();

        $categories = Category::with(['parent' => function ($query) {
            $query->select('id', 'name');
        }])->select('id', 'name', 'description', 'image', 'parent_id')->get();

        $brands = Brand::select('id', 'name')->get();

        return Inertia::render('Products/ProductEditor', [
            'product' => $product,
            'categories' => $categories,
            'brands' => $brands,
            'mode' => 'edit',
            'unavailableRelevances' => $unavailableRelevances
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, $productId)
    {
        try {
            DB::beginTransaction();

            $product = Product::findOrFail($productId);
            $product->update($request->safe()
                ->merge(
                    ['slug' => Str::slug($request->name)]
                )->only([
                    'name',
                    'description',
                    'price',
                    'compare_price',
                    'cost',
                    'stock',
                    'sku',
                    'barcode',
                    'is_feature',
                    'is_available',
                    'relevance',
                    'brand_id',
                    'shipment',
                    'meta_title',
                    'meta_description',
                    'key_words',
                    'condition',
                    'show_condition',
                    'warranty_policy',
                    'disponibility_text'
                ])
            );

            //Guardar categorías
            if ($request->filled('categories')) {
                $product->categories()->sync($request->input('categories'));
            } else {
                $product->categories()->detach();
            }

            //Guardar imágenes
            $newImages = $request->file('new_images');
            if (is_array($newImages) && count(array_filter($newImages))) {
                $this->storeImages($newImages, $product);
            }

            //Eliminar imágenes
            $dropImages = $request->input('drop_images', []);
            if (is_array($dropImages) && count(array_filter($dropImages))) {
                $this->deleteImages($dropImages, $product);
            }

            //Actualizar variantes
            $this->saveVariants($request->input('variants'), $product);

            DB::commit();
            return redirect()->back()->with('flash.success', [
                'title' => 'Éxito',
                'message' => 'Producto actualizado correctamente'
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error('Error al iniciar la transacción: ' . $th->getMessage());
            return redirect()->back()->with('flash.error', [
                'title' => 'Error', 
                'message' => 'No se pudo iniciar la transacción para actualizar el producto.'
            ]);
        }     
    }

    private function deleteImages($images, $product)
    {
        $imagesToDelete = $product->images()->whereIn('id', $images)->get();
        foreach ($imagesToDelete as $image) {
            $this->tenantFileService->deleteImage($image->url);
        }

        $product->images()->whereIn('id', $images)->delete();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($productId)
    {
        try {
            DB::beginTransaction();
            $product = Product::findOrFail($productId);
            $product->delete();

            DB::commit();
            return redirect()->back()->with('flash.success', [
                'title' => 'Producto eliminado',
                'message' => 'Recuerda que tienes 30 días a partir de la fecha para deshacer esta acción'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error(['error' => 'No se pudo eliminar el producto: '. $e->getMessage()]);
            return redirect()->back()->with('flash.error', [
                'title' => 'Se produjo un error',
                'message' => 'No se pudo eliminar el producto, intenta nuevamente'
            ]);
        }
    }
}
