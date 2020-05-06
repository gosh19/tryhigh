<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TeamLol extends Model
{
    protected $fillable= [
        'nombre', 'sigla', 'logo'
    ];

    public function integrantes()
    {
        return $this->hasMany('App\Integrante', 'team_id', 'id');
    }
    public function logo()
    {
        return $this->hasOne('App\LogoTeam', 'id','logo_team_id');
    }
}
