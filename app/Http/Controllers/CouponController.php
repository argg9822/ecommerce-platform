<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use Illuminate\Http\Request;
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

    public function store (Request $request)
    {
        Log::info($request->all());

        return redirect()->back()->with('flash.success', [
            'title' => 'Cupón creado correctamente',
            'message' => 'Se hac creado el cupón correctamente'
        ]);
    }
}
