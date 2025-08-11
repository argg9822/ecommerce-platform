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
use Illuminate\Support\Str;

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
            
            // Log completo de la solicitud
            Log::info('Solicitud de creación de orden recibida:', $request->all());

            // Calcular el total
            $total = collect($request->products)->sum(function ($product) {
                return $product['unit_price'] * $product['quantity'];
            });

            // Preparar información de entrega
            $delivery_info = [
                'address' => $request->delivery_info['address'] ?? null,
                'department' => $request->delivery_info['department'] ?? null,
                'city' => $request->delivery_info['city'] ?? null,
                'province' => $request->delivery_info['province'] ?? null,
                'postalCode' => $request->delivery_info['postalCode'] ?? null,
                'phone' => $request->delivery_info['phone'] ?? null,
                'deliveryType' => $request->delivery_info['deliveryType'] ?? 'casa',
                'deliveryNotes' => $request->delivery_info['deliveryNotes'] ?? null,
            ];

            // Crear la orden
            $order = Order::create([
                'preference_id' => $request->preference_id,
                'total' => $total,
                'status' => $request->status ?? 'pending',
                'notes' => $request->delivery_info['deliveryNotes'] ?? null,
                'user_id' => Auth::id(),
                'shipping_city' => $request->delivery_info['city'] ?? null,
                'delivery_info' => json_encode($delivery_info),
            ]);

            // Guardar los items de la orden
            foreach ($request->input('products', []) as $item) {
                $order->items()->create([
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'variants_product' => $item['variantesProducto'] ?? null,
                    'variant_id' => $item['variante_id'] ?? null,
                ]);
            }

            DB::commit();
            
            Log::info('Orden creada exitosamente:', $order->toArray());
            
            return response()->json([
                'message' => 'Orden creada correctamente', 
                'order' => $order->load(['items', 'user'])
            ], Response::HTTP_CREATED);
            
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error al generar la orden: '. $e->getMessage());
            Log::error('Trace completo:', ['trace' => $e->getTraceAsString()]);

            return response()->json([
                'message' => 'Error creando la orden',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
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
