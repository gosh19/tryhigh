<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnLlaveidToPartidasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('partidas', function (Blueprint $table) {
            $table->unsignedbigInteger('llave_id');
            
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
        Schema::table('partidas', function (Blueprint $table) {
            //
        });
    }
}
