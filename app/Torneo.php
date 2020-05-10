<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Torneo extends Model
{
    public function llaves()
    {
        return $this->hasMany('App\Llave','torneo_lol_id','id');
    }
}
