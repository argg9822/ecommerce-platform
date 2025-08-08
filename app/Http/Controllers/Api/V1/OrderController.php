<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Api\V1\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
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
    public function store(StoreOrderRequest $request)
    {
        try {
            DB::beginTransaction();
            $total = collect($request->products)->sum(function ($product) {
                return $product['unit_price'] * $product['quantity'];
            });

            $delivery_info = [
                'address' => $request->delivery_info->address,
                'apartment' => $request->delivery_info->apartment,
                'province' => $request->delivery_info->province,
                'phone' => $request->delivery_info->phone,
                'postalCode' => $request->delivery_info->postalCode,
                'deliveryType' => $request->delivery_info->deliveryType,                
            ];

            $order = Order::create([
                'preference_id' => $request->preference_id,
                'total' => $total,
                'status' => $request->status,
                'notes' => $request->delivery_info->deliveryNotes,
                'user_id' => Auth::id(),
                'shipping_city' => $request->delivery_info->city,
                'delivery_info' => json_encode($delivery_info),
            ]);

            //Guardar los items de la orden
            foreach ($request->input('products', []) as $item) {
                $order->items()->create([
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['unit_price'],
                    'variants_product' => $item['variantesProducto'] ?? null,
                ]);
            }

            $order->load(['items', 'user']);

            DB::commit();
            return response()->json(['message' => 'Orden creada correctamente', 'order' => $order], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error al generrar la orden: '. $e->getMessage());

            return response()->json([
                'message' => 'Error creando la orden, intenta nuevamente'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Orden creada correctamente'], Response::HTTP_CREATED);
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
