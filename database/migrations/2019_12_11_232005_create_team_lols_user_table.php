<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeamLolsUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('team_lols_user', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id')->unique();
            $table->unsignedBigInteger('team_lols_id');
            $table->unsignedBigInteger('rols_lol_id');
            $table->string('rango');

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('team_lols_id')->references('id')->on('team_lols');
            $table->foreign('rols_lol_id')->references('id')->on('rols_lol');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('team_lols_user');
    }
}
