<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolsLolTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rols_lol', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre');
            $table->string('img')->nullable();
            $table->timestamps();
        });

        \DB::table('rols_lol')->insert(array(
            'nombre' => 'Top',
        ));

        \DB::table('rols_lol')->insert(array(
            'nombre' => 'Jungla',
        ));

        \DB::table('rols_lol')->insert(array(
            'nombre' => 'Mid',
        ));

        \DB::table('rols_lol')->insert(array(
            'nombre' => 'Support',
        ));

        \DB::table('rols_lol')->insert(array(
            'nombre' => 'Ad Carry',
        ));
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rols_lol');
    }
}
