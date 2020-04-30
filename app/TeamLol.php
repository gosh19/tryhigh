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
}
