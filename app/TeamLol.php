<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TeamLol extends Model
{
    protected $fillable= [
        'nombre', 'sigla', 'logo_team_id'
    ];

    public function integrantes()
    {
        return $this->hasMany('App\Integrante', 'team_id', 'id');
    }
    public function logo()
    {
        return $this->belongsTo('App\LogoTeam','logo_team_id','id');
    }
    public function inscriptoTorneo()
    {
        return $this->hasOne('App\Inscripto', 'team_lol_id', 'id')->with('llave');
    }
}
