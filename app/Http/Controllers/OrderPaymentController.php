<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderPaymentWebRequest;
use App\Models\Order;
use App\Models\OrderPayment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class OrderPaymentController extends Controller
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
    public function store(StoreOrderPaymentWebRequest $request)
    {
        try {
            $approved_at = $request->status === 'approved' ? now() : null;

            $orderToupdate = Order::where('id', $request->order_id);

            $updatedOrder = $orderToupdate->update([
                'status' => $request->status === 'approved' ? 'paid' : $request->status
            ]);

            if (!$updatedOrder) {
                return response()->json([
                    'message' => 'Orden no encontrada o no se pudo actualizar'
                ], Response::HTTP_NOT_FOUND);
            }

            $transaction_id = uniqid('txn_');

            OrderPayment::create([
                'transaction_id' => $transaction_id,
                'status' => $request->status,
                'order_id' => $request->order_id,
                'amount' => $request->amount,
                'payment_method' => $request->payment_method,
                'approved_at' => $approved_at,
                'operation_type' => $request->operation_type,
            ]);

            return redirect()->back()->with('flash.success', [
                'title' => 'Pago guardado correctamente',
                'message' => 'El pago ha sido registrado exitosamente.'
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error al guardar el pago: ' . $e->getMessage());
            return redirect()->back()->with('flash.error', [
                'title' => 'Error',
                'message' => 'Hubo un error al registrar el pago. Por favor, inténtalo de nuevo.'
            ]);
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
