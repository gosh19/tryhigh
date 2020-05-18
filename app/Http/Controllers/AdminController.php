<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        $torneos = \App\Torneo::all();
        foreach ($torneos as $key => $torneo) {
            $rondaFinal = 2+ log($torneo->cant_llaves,2);
            $torneo->rondaFinal = $rondaFinal;
        }
        return view('Admin.index',['torneos' =>$torneos]);
    }
}
