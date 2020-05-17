<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        $torneos = \App\Torneo::all();

        return view('Admin.index',['torneos' =>$torneos]);
    }
}
