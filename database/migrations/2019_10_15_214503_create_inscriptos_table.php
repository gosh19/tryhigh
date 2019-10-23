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
            $table->unsignedbigInteger('user_id')->primary();
            $table->unsignedbigInteger('torneo_id');
            $table->unsignedbigInteger('llave_id');
            $table->string('estado')->default('pendiente');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('torneo_id')->references('id')->on('torneo_tfts');
            $table->foreign('llave_id')->references('id')->on('llaves');
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
