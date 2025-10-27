<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderPayment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(){
        return Inertia::render('Dashboard/Index');
    }

    public function sales(Request $request)
    {
        $sales = Order::select(DB::raw('SUM(orders.total) as ventas, SUM(orders.profit) as ganancias, EXTRACT(MONTH FROM orders.created_at) as month'))
            ->whereYear('created_at', $request->year)
            ->where('status', 'paid')
            ->orWhere('status', 'delivered')
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();
        
        return response()->json([
            'sales' => $sales
        ]);
    }

    public function payments()
    {
        $lastPayments = OrderPayment::with('order:id,total,status')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        return response()->json([
            'payments' => $lastPayments
        ]);
    }
}
