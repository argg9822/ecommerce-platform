<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCouponRequest;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CouponController extends Controller
{
    public function index()
    {
        $coupons = Coupon::get();
        return Inertia::render('Coupons/Index', [
            'coupons' => $coupons
        ]);
    }

    public function create ()
    {
        return Inertia::render('Coupons/Create');
    }

    public function store (StoreCouponRequest $request)
    {
        try {
            DB::beginTransaction();

            $coupon = Coupon::create([
                'code' => $request->code,
                'description' => $request->description,
                'discount_type' => $request->discount_type,
                'discount_value' => $request->discount_value,
                'expires_at' => $request->expires_at,
                'usage_limit' => $request->usage_limit,
                'usage_per_user' => $request->usage_per_user,
            ]);

            $coupon->conditions()->createMany($request->input('conditions'));

            DB::commit();
            return redirect()->back()->with('flash.success', [
                'title' => 'Cupón creado correctamente',
                'message' => 'Se ha creado el cupón correctamente'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Error starting transaction: ' . $e->getMessage());
            return redirect()->back()->with('flash.error', [
                'title' => 'Error al crear el cupón',
                'message' => 'Ocurrió un error al generar el cupón.'
            ]);
        }

       
    }
}
