<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inscripto extends Model
{
    protected $fillable = [
        'torneo_id', 'user_id', 'estado', 'llave_id'
    ];

    protected $primaryKey = "user_id";

    public function user()
    {
        return $this->belongsTo('App\User');
    }
    public function llave()
    {
        return $this->hasOne('App\Llave','id','llave_id');
    }
    public function partidas()
    {
        return $this->hasMany('App\Partida', 'user_id', 'user_id');
    }

}
