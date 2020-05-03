<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InvokerData extends Model
{
    protected $primaryKey = 'user_id';

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
