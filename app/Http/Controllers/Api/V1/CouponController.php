<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Api\V1\Coupon;
use App\Models\Api\V1\Product as ProductModel;
use App\Models\Api\V1\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CouponController extends Controller
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Coupon $coupon)
    {
        $products = collect($request->input('products', []));
        $user     = Auth::user();

        $isValid = true;

        // Validar expiración
        if ($coupon->expires_at && $coupon->expires_at->isPast()) {
            $isValid = false;
        }

        // Revisar condiciones
        foreach ($coupon->conditions as $condition) {
            switch ($condition->condition_type) {

                case Product::class:
                    $allowedProducts = $condition->products()->pluck('products.id')->toArray();
                    $productIds = $products->pluck('id')->toArray();

                    if (!collect($productIds)->intersect($allowedProducts)->count()) {
                        $isValid = false;
                    }
                    break;

                case Category::class:
                    $allowedCategories = $condition->categories()->pluck('categories.id')->toArray();
                    $categoryIds = $products->pluck('category')->toArray();

                    if (!collect($categoryIds)->intersect($allowedCategories)->count()) {
                        $isValid = false;
                    }
                    break;

                case User::class:
                    if (!$user || !in_array($user->id, $condition->users()->pluck('users.id')->toArray())) {
                        $isValid = false;
                    }
                    break;

                case 'min_amount':
                    $cartTotal = $products->sum(fn($p) => $p['cantidad'] * ProductModel::find($p['id'])->price);
                    if ($cartTotal < $condition->value) {
                        $isValid = false;
                    }
                    break;
            }
        }

        return response()->json([
            'is_valid' => $isValid,
            'coupon_expiration' => $coupon->expires_at
        ]);
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
