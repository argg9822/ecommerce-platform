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
        Schema::create('order_payments', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount', 10, 2);
            $table->string('payment_method');
            $table->string('transaction_id')->nullable();
            $table->enum('status', ['pending', 'approved', 'failed', 'refunded'])->default('pending');
            $table->uuid('order_id');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->string('currency_id')->nullable(); // Moneda en la que se hizo la transacción
            $table->string('operation_type')->nullable(); // Tipo de operación (p. ej., "payment", "refund")
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
