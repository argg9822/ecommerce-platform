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
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->text('description');
            $table->enum('discount_type', ['%', 'percentage', 'fixed', 'free_shipping', 'bogo']);
            $table->decimal('discount_value', 10, 2);
            $table->integer('usage_limit')->nullable();
            $table->integer('usage_per_user')->nullable();
            $table->decimal('min_order_value')->nullable(); //Valor mínimo de compra para aplicar
            $table->datetime('expires_at')->nullable();
            $table->boolean('only_first_order')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};
