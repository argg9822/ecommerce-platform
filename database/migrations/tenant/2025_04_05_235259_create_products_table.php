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
            $table->longText('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('compare_price', 10, 2)->nullable();
            $table->decimal('cost', 10, 2)->default(0);
            $table->integer('stock')->default(0);
            $table->string('sku')->unique()->nullable();
            $table->string('barcode')->nullable();
            $table->boolean('is_feature')->default(false); //Destacado en homepage
            $table->boolean('is_available')->default(true);
            $table->integer('relevance')->default(0);
            $table->foreignId('brand_id')->nullable()->constrained()->onDelete('cascade');
            $table->decimal('shipment', 10, 2)->default(0);
            $table->string("meta_title")->nullable();
            $table->text("meta_description")->nullable();
            $table->string("key_words")->nullable();
            $table->enum("condition", ["new", "used", "refurbished"])->default("new");
            $table->boolean("show_condition")->default(true);
            $table->string("warranty_policy")->nullable();
            $table->string("disponibility_text")->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
