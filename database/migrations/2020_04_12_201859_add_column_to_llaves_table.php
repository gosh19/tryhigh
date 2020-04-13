<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnToLlavesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('llaves', function (Blueprint $table) {
            $table->unsignedBigInteger('Team1')->nullable();
            $table->unsignedBigInteger('Team2')->nullable();

            $table->foreign('Team1')->references('id')->on('team_lols')->onDelete('cascade');
            $table->foreign('Team2')->references('id')->on('team_lols')->onDelete('cascade');
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
            $table->dropColumn('Team1');
            $table->dropColumn('Team2');
        });
    }
}
