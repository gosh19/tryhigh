<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Llave extends Model
{
    protected $fillable = [
        'torneo_id', 'ronda', 'cant_jugadores',
    ];

    public function team1()
    {
        return $this->belongsTo('App\TeamLol', 'Team1', 'id');
    }
    public function team2()
    {
        return $this->belongsTo('App\TeamLol', 'Team2', 'id');
    }
}
