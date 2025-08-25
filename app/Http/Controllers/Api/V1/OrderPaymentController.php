<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderPaymentRequest;
use App\Models\Api\V1\Order;
use App\Models\Api\V1\OrderPayment;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

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
    public function store(StoreOrderPaymentRequest $request)
    {
        try {
            $approved_at = $request->status === 'approved' ? now() : null;
    
            OrderPayment::create([
                'transaction_id' => $request->transaction_id,
                'status' => $request->status,
                'order_id' => $request->order_id,
                'amount' => $request->amount,
                'payment_method' => $request->payment_method,
                'approved_at' => $approved_at,
            ]);

            Order::where('id', $request->order_id)->update([
                'status' => $request->status === 'approved' ? 'paid' : $request->status
            ]);

            return response()->json([
                'message' => 'Pago guardado correctamente'
            ], Response::HTTP_CREATED);
            
        } catch (\Exception $e) {
            Log::error('Error al guardar el pago: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error al guardar el pago'
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
