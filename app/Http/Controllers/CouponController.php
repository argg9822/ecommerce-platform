<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCouponRequest;
use App\Http\Resources\CouponResource;
use App\Models\Category;
use App\Models\Coupon;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CouponController extends Controller
{
    public function index()
    {
        $coupons = Coupon::with([
            'conditions' => fn($query) => $query->with([
                'products:id,name', 
                'users:id,name',
                'categories:id,name'])
        ])->get();

        $couponsResource = json_encode(CouponResource::collection($coupons));

        return Inertia::render('Coupons/Index', [
            'coupons' => $couponsResource
        ]);
    }

    public function create()
    {
        return Inertia::render('Coupons/Create');
    }

    public function store(StoreCouponRequest $request)
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

            $this->createConditions($request->input('conditions'), $coupon);

            DB::commit();
            return redirect()->back()->with('flash.success', [
                'title' => 'Cupón creado correctamente',
                'message' => 'Se ha creado el cupón correctamente'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('Error al crear el cupón: ' . $e->getMessage());
            return redirect()->back()->with('flash.error', [
                'title' => 'Error al crear el cupón',
                'message' => 'Ocurrió un error al generar el cupón.'
            ]);
        }
    }

    private function createConditions($conditions, Coupon $coupon)
    {
        try {
            DB::transaction(function () use ($coupon, $conditions) {
                foreach ($conditions as $condition) {
                    switch ($condition['name']) {
                        case 'product':
                            $conditionsModel = $coupon->conditions()->create([
                                'condition_type' => Product::class,
                                'condition_value' => null,
                            ]);

                            $conditionsModel->products()->syncWithoutDetaching($condition['value']);
                            break;

                        case 'client':
                            $conditionsModel = $coupon->conditions()->create([
                                'condition_type' => User::class,
                                'condition_value' => null,
                            ]);

                            $conditionsModel->users()->syncWithoutDetaching($condition['value']);
                            break;

                        case 'category':
                            $conditionsModel = $coupon->conditions()->create([
                                'condition_type' => Category::class,
                                'condition_value' => null,
                            ]);

                            $conditionsModel->categories()->syncWithoutDetaching($condition['value']);
                            break;

                        case 'min_amount':
                            $coupon->conditions()->create([
                                'condition_type' => 'min_amount',
                                'condition_value' => $condition['value'],
                            ]);
                            break;
                    }
                }
            });
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creando condiciones: ' . $e->getMessage());
        }
    }
}
