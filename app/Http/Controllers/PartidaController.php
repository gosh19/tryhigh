<?php

namespace App\Http\Controllers;

use App\Partida;
use Illuminate\Http\Request;

class PartidaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Partida  $partida
     * @return \Illuminate\Http\Response
     */
    public function show($partida)
    {
        $partidas = Partida::where('user_id', $partida)->get();
        $i=0;
        $j=0;
        foreach ($partidas as $partida) {
            if (($partida->estado == 'pendiente') || ($partida->estado == 'jugando')) {
                $ordenado['noTerminadas'][$i] = $partida;
                $i++;
            }else {
                $ordenado['Terminadas'][$j] = $partida;
                $j++;
            }
        }

        return $ordenado;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Partida  $partida
     * @return \Illuminate\Http\Response
     */
    public function edit(Partida $partida)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Partida  $partida
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Partida $partida)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Partida  $partida
     * @return \Illuminate\Http\Response
     */
    public function destroy(Partida $partida)
    {
        //
    }
}
