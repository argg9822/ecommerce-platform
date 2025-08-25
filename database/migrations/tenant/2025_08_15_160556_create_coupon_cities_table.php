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
        Schema::create('coupon_condition_city', function (Blueprint $table) {
            $table->foreignId('city_id')->constrained()->onDelete('cascade');
            $table->foreignId('coupon_condition_id')->constrained()->cascadeOnDelete();
            $table->primary(['coupon_condition_id', 'city_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupon_condition_city');
    }
};
