<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnEstadoToTonreoTftsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('torneo_tfts', function (Blueprint $table) {
            $table->boolean('abierto')->nullable()->default(true);
            $table->boolean('en_juego')->nullable()->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tonreo_tfts', function (Blueprint $table) {
            //
        });
    }
}
