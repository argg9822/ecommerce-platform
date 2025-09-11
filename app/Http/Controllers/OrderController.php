<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with([
            'items',
            'user:id,name,email'
        ])->select([
            'id',
            'total',
            'status',
            'user_id',
            'notes',
            'shipping_city',
            'delivery_info',
            'payment_type',
            'created_at',
            'updated_at',
        ])->orderBy('created_at', 'desc')->get();

        return Inertia::render('Orders/Index', [
            'orders' => $orders
        ]);
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

    public function updateStatus(Request $request, $orderId)
    {
        $request->validate([
            'status' => 'required|in:pending,paid,shipped,delivered,canceled'
        ]);

        try {
            $order = Order::findOrFail($orderId);
            $order->update([
                'status' => $request->input('status')
            ]);

            return response()->json([
                'message' => 'Estado de la orden actualizado correctamente.'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error('Error al actualizar el estado de la orden: ' . $e->getMessage());

            return response()->json([
                'message' => 'Error al actualizar el estado de la orden.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
