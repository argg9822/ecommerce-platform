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
        Schema::table('order_items', function (Blueprint $table) {
            if(Schema::hasColumn('order_items', 'product_variant_id')){
                $table->dropColumn('product_variant_id');
            };

            if (!Schema::hasColumn('order_items', 'variants_product')) {
                $table->json('variants_product')->nullable()->after('id');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            if (!Schema::hasColumn('order_items', 'product_variant_id')) {
                $table->unsignedBigInteger('product_variant_id')->nullable()->after('id');
            }

            if (Schema::hasColumn('order_items', 'variants_product')) {
                $table->dropColumn('variants_product');
            }
        });
    }
};
