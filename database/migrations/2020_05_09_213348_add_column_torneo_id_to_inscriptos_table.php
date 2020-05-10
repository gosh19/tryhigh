<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnTorneoIdToInscriptosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('inscriptos', function (Blueprint $table) {
            $table->unsignedBigInteger('torneo_id');

            $table->foreign('torneo_id')->references('id')->on('torneos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('inscriptos', function (Blueprint $table) {
            //
        });
    }
}
