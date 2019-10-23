<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTorneoTftsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('torneo_tfts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre')->unique();
            $table->date('fecha_inicio');
            $table->date('fecha_fin')->nullable();
            $table->unsignedBigInteger('primero')->nullable();
            $table->unsignedBigInteger('segundo')->nullable();
            $table->unsignedBigInteger('tercero')->nullable();
            $table->timestamps();

            $table->foreign('primero')->references('id')->on('users');
            $table->foreign('segundo')->references('id')->on('users');
            $table->foreign('tercero')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('torneo_tfts');
    }
}
