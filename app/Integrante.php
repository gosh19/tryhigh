<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Integrante extends Model
{
    protected $primaryKey = 'user_id';

    protected $fillable = [
        'user_id', 'lider', 'rol'
    ];

    public function TeamLol()
    {
        return $this->belongsTo('App\TeamLol', 'team_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
