<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnFinalizadoToTorneoTftsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('torneo_tfts', function (Blueprint $table) {
            $table->dropColumn('fecha_fin');
            $table->boolean('finalizado')->default(false);
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
