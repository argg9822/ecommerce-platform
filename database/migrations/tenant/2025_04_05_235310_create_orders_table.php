<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('number')->unique();
            $table->decimal('total', 10, 2);
            $table->enum('status', [
                'pending',       // Orden creada, esperando pago (cuando el pago no es instantáneo)
                'paid',         // Pago confirmado, preparando el pedido
                'processing',    // En proceso de empaque/verificación (puede usarse si hay pasos intermedios)
                'ready_to_ship', // Listo para ser enviado (pero aún no despachado)
                'shipped',      // Orden despachada (en camino)
                'out_for_delivery', // En reparto (opcional, útil para seguimiento en tiempo real)
                'delivered',    // Entregado al cliente
                'cancelled',    // Orden cancelada (antes del envío)
                'refunded',     // Reembolsado (si el cliente devuelve el producto)
                'failed',       // Falló el pago o no se pudo completar
            ])->default('pending');
            $table->text('notes')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('shipping_address')->nullable();
            $table->string('payment_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
