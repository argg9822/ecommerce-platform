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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description');
            $table->decimal('price', 10, 2);
            $table->decimal('compare_price', 10, 2)->nullable();
            $table->integer('stock')->default(0);
            $table->integer('sku')->unique()->nullable();
            $table->string('barcode')->nullable();
            $table->boolean('is_feature')->default(false); //Destacado en homepage
            $table->boolean('is_available')->default(true);
            $table->foreignId('brand_id')->nullable()->constrained()->onDelete('cascade');
            $table->decimal('shipment', 10, 2)->default(0)->nullable();
            $table->string("meta_title")->nullable();
            $table->string("keywords")->nullable();
            $table->text("meta_description")->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // Schema::create('products', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('name');
        //     $table->decimal('price', 10, 2);
        //     $table->decimal('compare_price', 10, 2);
        //     $table->string('slug')->unique();
        //     $table->text('description')->nullable();
        //     $table->boolean('is_available')->default(true);
        //     $table->boolean('is_feature')->default(false);
        //     $table->decimal('shipment', 10, 2)->default(0);
        //     $table->foreignId('brand_id')->constrained()->cascadeOnDelete();
        //     $table->timestamps();
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
