<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInscriptosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('inscriptos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('team_lol_id');
            $table->unsignedBigInteger('llave_id');
            $table->timestamps();

            $table->foreign('team_lol_id')->references('id')->on('team_lols')->onDelete('cascade');
            $table->foreign('llave_id')->references('id')->on('llaves')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('inscriptos');
    }
}
