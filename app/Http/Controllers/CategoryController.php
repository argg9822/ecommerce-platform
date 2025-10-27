<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Services\TenantFileService;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Categories/Index');
    }

    /**
     * Return a list of categories in JSON format.
     */
    public function list()
    {
        $categories = Category::with([
            'children',
            'products:id,name,price'
        ])->whereNull('parent_id')->get();

        return response()->json([
            'categories' => $categories
        ], Response::HTTP_OK);
    }

    public function salesByCategory($id)
    {
        try {
            $start = Carbon::now()->subMonths(6)->startOfMonth();
            $end = Carbon::now()->endOfMonth();

            $sales = DB::table('categories')
                ->join('category_product', 'categories.id', '=', 'category_product.category_id')
                ->join('products', 'category_product.product_id', '=', 'products.id')
                ->join('order_items', 'products.id', '=', 'order_items.product_id')
                ->join('orders', 'order_items.order_id', '=', 'orders.id')
                ->select(
                    DB::raw("TO_CHAR(DATE_TRUNC('month', orders.created_at), 'YYYY-MM') as month"),
                    DB::raw('SUM(order_items.quantity) as total_sold')
                )
                ->where('categories.id', $id)
                ->whereIn('orders.status', ['delivered', 'paid'])
                ->whereBetween('orders.created_at', [$start, $end])
                ->groupBy(DB::raw("DATE_TRUNC('month', orders.created_at)"))
                ->orderBy('month')
                ->get();

            return response()->json([
                'sales' => $sales
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error("Error fetching sales by category", [
                'category_id' => $id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Error fetching sales data'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Return a list of categories in JSON format.
     */
    public function selectList()
    {
        $categories = Category::select('id', 'name')->get();

        return response()->json([
            'categories' => $categories
        ], Response::HTTP_OK);
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
        try {
            DB::beginTransaction();
            $imagePath = null;

            if ($request->hasFile('image')) {
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
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Error creando la categoria", [
                'message' => $e->getMessage(),
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
    public function update(UpdateCategoryRequest $request, Category $category, TenantFileService $tenantService)
    {
        try {
            Log::info("Actualizando la categoria", [
                'category_id' => $category->id,
                'request_data' => $request->all()
            ]);
            DB::beginTransaction();
            $imagePath = $category->image;

            if ($request->hasFile('image')) {
                $imagePath = $tenantService->storeImages($request->file('image'), 'categories');
            }

            $category->update([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'description' => $request->description,
                'image' => $imagePath,
                'parent_id' => $request->parent_id
            ]);

            DB::commit();

            return redirect()->back()->with('flash.success', [
                'title' => 'Categoría actualizada correctamente',
                'message' => 'Recuerda que organizar bien tus categorías te ayudará a gestionar mejor tus productos y facilitará la navegación de tus clientes'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Error actualizando la categoria", [
                'category_id' => $category->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return redirect()->back()->with('flash.error', [
                'title' => 'No se pudo actualizar la categoría',
                'message' => 'Por verifica los datos ingresados e intenta nuevamente'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
