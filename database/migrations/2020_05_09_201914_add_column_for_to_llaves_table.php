<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnForToLlavesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('llaves', function (Blueprint $table) {
            $table->unsignedBigInteger('torneo_lol_id');
            $table->foreign('torneo_lol_id')->references('id')->on('torneos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::table('llaves', function (Blueprint $table) {
            $table->dropForeign(['torneo_lol_id']);
        });
    }
    
}
