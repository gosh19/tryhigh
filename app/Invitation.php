<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User', 'receiver', 'id');
    }
    public function sender()
    {
        return $this->belongsTo('App\User', 'sender', 'id');
    }
}
