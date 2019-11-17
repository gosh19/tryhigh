<?php

namespace App\Http\Controllers;

use App\Llave;
use Illuminate\Http\Request;

class LlaveController extends Controller
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
     * DEVUELVE LOS INSCRIPTOS DE UN TORNEO 
     *
     * @param  \App\Llave  $llave
     * @return \Illuminate\Http\Response
     */
    public function show($torneo_id)
    {
        $llaves = Llave::where([['torneo_id',$torneo_id], ['en_juego',1]])->get();

            
        $inscriptos_llave['estado'] = 0;

        $i = 0;
        foreach ($llaves as $llave) {
            $inscriptos_llave['estado'] = 1;
            $inscriptos_llave['llaves'][$i] = $llave;
            $inscriptos_llave['datos'][$i] = \App\Inscripto::where('llave_id', $llave->id)->with('user')->with('partidas')->get();
            $i++;
        }

        return $inscriptos_llave;

    }

    public function finalizarLlave($llave_id)
    {
        try {
            $llave = Llave::find($llave_id);
    
            $llave->en_juego = false;
            $llave->save();
            return ['estado' => 1];
        } catch (\Throwable $th) {
            return ['estado' => 0, 'error' => $th];
        }


    }

    public function pasaDeRonda(Request $request)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Llave  $llave
     * @return \Illuminate\Http\Response
     */
    public function edit(Llave $llave)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Llave  $llave
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Llave $llave)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Llave  $llave
     * @return \Illuminate\Http\Response
     */
    public function destroy(Llave $llave)
    {
        //
    }
}
