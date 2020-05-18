<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Torneo extends Model
{
    public function llaves()
    {
        return $this->hasMany('App\Llave','torneo_lol_id','id');
    }
    public function llavesEnJuego()
    {
        return $this->hasMany('App\Llave','torneo_lol_id','id')->where('en_juego',1);
    }
    public function getWinner($ronda)
    {
        $llave = \App\Llave::where([['torneo_lol_id', $this->id],['ronda',$ronda]])->get();

        if ($llave == null) {
            return "Aun no hay ganador";
        }else{
            $llave = $llave->first();
            return $llave->team1;
        }

    }
}
