<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TorneoTft extends Model
{
    protected $fillable = [
        'nombre', 'fecha_inicio'
    ];
}
