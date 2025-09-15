<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with([
            'items' => function ($query) {
                $query->with('products:id,name');
            },
            'user:id,name,email',
            'payments' => function ($query) {
                $query->select('id', 'order_id', 'transaction_id', 'status', 'amount', 'payment_method', 'approved_at', 'created_at');
            },
            'statusHistory:id,order_id,old_status,new_status,changed_by,created_at',
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
            'status' => 'required|in:pending,paid,shipped,delivered,cancelled'
        ]);

        try {
            $order = Order::findOrFail($orderId);
            $order->update([
                'status' => $request->input('status')
            ]);

            return redirect()->back()->with('flash.success', [
                'title' => 'Estado de la orden actualizado correctamente',
                'message' => 'El estado de la orden ha sido actualizado exitosamente.'
            ]);
        } catch (\Exception $e) {
            Log::error('Error al actualizar el estado de la orden: ' . $e->getMessage());

            return redirect()->back()->with('flash.error', [
                'title' => 'Error',
                'message' => 'Hubo un error al actualizar el estado de la orden. Por favor, inténtalo de nuevo.'
            ]);
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
