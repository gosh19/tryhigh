<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class IntegrantesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = \App\User::all();
        $teams = \App\TeamLol::all();

        foreach ($users as  $user ) {
            $exist = false;
            foreach ($teams as $team) {
                foreach ($team->integrantes as $int) {
                    if ($int->user_id == $user->id) {
                        $exist = true;
                        break 2;
                    }
                }
            }
            if (!$exist) {

                foreach ($teams as $team) {
                    if (count($team->integrantes) <5) {
                        DB::table('integrantes')->insert([
                            'user_id' => $user->id,
                            'lider' => 0,
                            'team_id' => $team->id,
                        ]);
                        $teams = \App\TeamLol::all();
                        echo "Insertado en team ".$team->nombre." ya son: ".(count($team->integrantes)+1)."\n";
                        break;
                    }
                }
            }
        } 
    }
}
