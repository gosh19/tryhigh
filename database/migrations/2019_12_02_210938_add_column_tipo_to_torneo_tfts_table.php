<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnTipoToTorneoTftsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('torneo_tfts', function (Blueprint $table) {
            $table->unsignedBigInteger('tipo')->default(null)->nullable();

            $table->foreign('tipo')->references('id')->on('tipo_torneos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('torneo_tfts', function (Blueprint $table) {
            //
        });
    }
}
