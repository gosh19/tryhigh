<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inscripto extends Model
{
    protected $fillable = [
        'torneo_id', 'user_id', 'estado', 'llave_id'
    ];

    protected $primaryKey = "user_id";
}
