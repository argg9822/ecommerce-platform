<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTenantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
         /**
         * EXAMPLE JSON CONFIG
         * "currency": "USD",
         * "language": "en",
         * "timezone": "America/New_York",
         * "store_email": "support@mitienda.com"
         */
        Schema::create('tenants', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->unique();
            $table->string('logo')->nullable();
            $table->foreignId('plan_id')->constrained()->restrictOnDelete();
            $table->boolean('is_active')->default(true);
            $table->string('api_token')->nullable()->unique();
            $table->timestamps();
            $table->json('data')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('tenants');
    }
}
