<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLlavesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('llaves', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('torneo_id');
            $table->string('ronda');
            $table->integer('cant_jugadores');
            $table->timestamps();

            $table->foreign('torneo_id')->references('id')->on('torneo_tfts');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('llaves');
    }
}
