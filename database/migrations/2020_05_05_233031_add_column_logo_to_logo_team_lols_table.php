<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnLogoToLogoTeamLolsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('team_lols', function (Blueprint $table) {
            $table->unsignedBigInteger('logo_team_id')->nullable()->after('sigla');
            //$table->dropColumn('logo');
            $table->foreign('logo_team_id')->references('id')->on('logo_teams')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('logo_team_lols', function (Blueprint $table) {
            $table->string('logo', 100)->nullable()->default('text');
            $table->dropColumn('logo_team_id');
        });
    }
}
