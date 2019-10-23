<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Novedad extends Model
{
    protected $fillable = [
        'titulo', 'texto', 'categoria_id'
    ];

    public function categoria()
    {
        return $this->hasOne('App\CategoriaNovedad','id','categoria_id');
    }
}
