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
        Schema::table('order_status_histories', function (Blueprint $table) {
            $table->dropForeign(['changed_by']);
            $table->dropColumn('changed_by');
        });

        Schema::table('order_status_histories', function (Blueprint $table) {
            $table->json('changed_by')->nullable()->after('new_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('order_status_histories', function (Blueprint $table) {
            $table->dropColumn('changed_by');
        });

        Schema::table('order_status_histories', function (Blueprint $table) {
            $table->unsignedBigInteger('changed_by')->after('new_status');
            $table->foreign('changed_by')->references('id')->on('users')->onDelete('cascade');
        });
    }
};
