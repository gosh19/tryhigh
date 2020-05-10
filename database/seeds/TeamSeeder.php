<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeamSeeder extends Seeder
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

        $i =1;

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
            if (!$exist && ($i <8)) {
                $team_id = DB::table('team_lols')->insertGetId([
                    'nombre' => "Test team ".($i+20),
                    'sigla' => 'TV'.$i,
                ]);
                DB::table('integrantes')->insert([
                    'user_id' => $user->id,
                    'lider' => 1,
                    'team_id' => $team_id,
                ]);
                $i++;

                echo "Team ".$i." crea3";
            }
        }    
        
    }
}
