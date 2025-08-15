<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use Illuminate\Http\Request;
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
}
