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
}
