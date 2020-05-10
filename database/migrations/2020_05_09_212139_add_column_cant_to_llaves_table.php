<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnCantToLlavesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('llaves', function (Blueprint $table) {
            $table->dropColumn('cant_jugadores');
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
            $table->integer('cant_jugadores')->unsigned()->nullable()->default(2);
        });
    }
}
