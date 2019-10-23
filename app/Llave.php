<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Llave extends Model
{
    protected $fillable = [
        'torneo_id', 'ronda', 'cant_jugadores',
    ];
}
