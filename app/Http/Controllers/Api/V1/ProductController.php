<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ProductResource;
use App\Models\Api\V1\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Log::info('Fetching products');
        $products = Product::with([
            'brand' => function($query) {
                $query->select('id', 'name');
            },
            'variants' => function($query){
                $query->select('id', 'product_id', 'price', 'compare_price', 'stock', 'shipment','is_available')
                    ->where('is_available', true)
                    ->orderBy('price', 'asc')
                    ->with(['variantAttributes' => function($query) {
                        $query->select('id', 'product_variant_id', 'name', 'value');
                    }]);
            }]
        )->latest()->paginate(10);
        
        return ProductResource::collection($products);
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product, Request $request)
    {
        Log::info($request->all());
        $productQuery = $product->load([
            'brand' => function($query) {
                $query->select('id', 'name');
            },
            'variants' => function($query){
                $query->select('id', 'product_id', 'price', 'compare_price', 'stock', 'shipment','is_available')
                    ->where('is_available', true)
                    ->orderBy('price', 'asc')
                    ->with(['variantAttributes' => function($query) {
                        $query->select('id', 'product_variant_id', 'name', 'value');
                    }]);
            }]
            );
        
        if (!empty($request->product_name)) {
            $productQuery->where('name', 'like', '%' . $request->product_name . '%');
        }

        if (!empty($request->relevance)) {
            $productQuery->where('relevance', $request->relevance);
        }

        $productQuery->get();

        return new ProductResource($product);
    }

     /**
     * Display the specified resource.
     */
    public function search(Request $request)
    {
        $productQuery = Product::with([
            'brand:id,name',
            'variants' => function($query){
                $query->select('id', 'product_id', 'price', 'compare_price', 'stock', 'shipment', 'is_available')
                    ->where('is_available', true)
                    ->orderBy('price', 'asc')
                    ->with(['variantAttributes:id,product_variant_id,name,value']);
            }
        ])->select('id', 'name', 'description', 'price', 'compare_price', 'brand_id', 'relevance');

        if (!empty($request->product_name)) {
            $productQuery->where('name', 'like', '%' . $request->product_name . '%');
        }

        if (!empty($request->relevance)) {
            $productQuery->where('relevance', $request->relevance);
        }

        $products = $productQuery->get();

        if ($products->isEmpty()) {
            return response()->json(['message' => 'No se encontraron productos'], 404);
        }

        return ProductResource::collection($products);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
