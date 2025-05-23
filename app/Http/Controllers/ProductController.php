<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use App\Services\TenantFileService;
use Illuminate\Support\Facades\Log;

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
        return Inertia::render('Products/Index', [
            'products' => Product::all()
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

        return Inertia::render('Products/Create', [
            'categories' => $categories,
            'brands' => $brands,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request, TenantFileService $tenantService)
    {
        try {
            $product = Product::create($request->safe()->only([
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
            ]));

            //Guardar categorías
            if ($request->filled('categories')) {
                $product->categories()->sync($request->input('categories'));
            }
            
            //Guardar imágenes
            $this->storeImages($request, $product);

            //Guardar variantes
            $this->saveVariants($request, $product);

            return redirect()->back()->with('flash.success', [
                'title' => 'Éxito',
                'message' => 'Producto guardado correctamente'
            ]);
        } catch (\Exception $e) {
            Log::error('Error creating product: ' . $e->getMessage());
            return redirect()->back()->with('flash.error', [
                'title' => 'Error',
                'message' => 'No se pudo guardar el producto'
            ]);
        }
    }

    private function storeImages($request, $savedProduct)
    {
        $imagesPaths = [];

        foreach ($request->file('product_images') as $image) {
            $path = $this->tenantFileService->storeImages($image, 'products');
            if ($path) {
                $imagesPaths[] = ['url' => $path];
            }
        }

        if (!empty($imagesPaths)) {
            $savedProduct->images()->createMany($imagesPaths);
        }
    }

    private function saveVariants($request, $savedProduct)
    {
        foreach ($request->input('variants', []) as $variantData) {
            $variant = $savedProduct->variants()->create([
                'price' => $variantData['price'],
                'compare_price' => $variantData['compare_price'],
                'stock' => $variantData['stock'],
                'shipment' => $variantData['cost_shipping'],
                'is_available' => $variantData['is_available'],
            ]);

            foreach (['length', 'width', 'height', 'weight'] as $dimension) {
                $dimensionData = $variantData['dimensions'][$dimension] ?? null;
                if ($dimensionData && isset($dimensionData['value']) && $dimensionData['value'] != 0) {
                    $variant->attributes()->create([
                        'name' => $dimension,
                        'value' => $dimensionData['value']
                    ]);
                }
            }

            if (!empty($variantData['attributes'])) {
                foreach ($variantData['attributes'] as $attribute) {
                    $variant->attributes()->create([
                        'name' => $attribute['name'],
                        'value' => $attribute['value'],
                    ]);
                }
            }

            if (!empty($variantData['colors'])) {
                foreach ($variantData['colors'] as $color) {
                    if ($color['selected'] == 1) {
                        $variant->attributes()->create([
                            'name' => 'color',
                            'value' => $color['value'],
                        ]);
                    }   
                }
            }
        }
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
