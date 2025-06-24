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
        Schema::create('delivery_addresses', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->string('recipient_name');
            $table->string('phone', 20);
            $table->string('address_line_1');
            $table->string('city');
            $table->string('state')->nullable();
            $table->string('country');

            $table->boolean('is_default')->default(false);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delivery_addresses');
    }
};
