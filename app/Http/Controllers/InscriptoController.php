<?php

namespace App\Http\Controllers;

use App\Inscripto;
use App\Llave;
use Illuminate\Http\Request;

class InscriptoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $inscriptos = Inscripto::all();

        return $inscriptos;
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
     * INSCRIPCION AL TORNEO CORRESPONDIENTE
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $llave = Llave::where([['torneo_id', $request->torneo_id], ['ronda', 1]])->get();

            $llave = last($llave);
            if($llave != []){

                $llave = $llave[0];
            }
            //SI NO HAY NINGUNA LLAVE LA CREO O ESTA LLENA 
            if (($llave == [] ) || ($llave->cant_jugadores == 8)) {
                $llave = new Llave;
                $llave->torneo_id = $request->torneo_id;
                $llave->ronda = 1;
                $llave->cant_jugadores =0;
                $llave->save();
            }
                $inscripto = new Inscripto;
                $inscripto->user_id = $request->user_id;
                $inscripto->torneo_id = $request->torneo_id;
                $inscripto->llave_id = $llave->id;
                $inscripto->save();

                //CARGO EL ++ EN CANTIDAD DE JUGADORES DE LA LLAVE
                $llave->cant_jugadores++;
                $llave->save();

                //CREO PARTIDA EN ESTADO PENDIENTE
                $partida = new \App\Partida;
                $partida->user_id = $request->user_id;
                $partida->llave_id = $llave->id;
                $partida->estado = 'pendiente';

                //BUSCO LA FECHA DE INICIO DEL TORNEO PARA PONER LA FECHA DE LA PRIMER PARTIDA
                $torneo = \App\TorneoTft::find($request->torneo_id);

                $partida->fecha = $torneo->fecha_inicio;

                $partida->save();
            
            return ['estado' => 1];
        } catch (\Throwable $th) {
            return $th;
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  $inscripto es el userid
     * @return \Illuminate\Http\Response
     */
    public function show($inscripto)
    {
        $ins = Inscripto::find($inscripto);

        if ($ins == []) {
            return ['estado' => 0];
        }
        else{
            return ['estado' => 1, 'datos' => $ins];
        }
    }
    /**
     * DEVUELVE LAS LLAVES DEL TORENO CON LOS USER SI ESTA ACTIVO
     */
    public function llave($llave_id)
    {
        $llave = Inscripto::where('llave_id', $llave_id)->with('user')->with('llave')->get();

        $torneo = \App\TorneoTft::find($llave[0]->torneo_id);

        if ($torneo->en_juego == 1) {
            return ['estado' => 1, 'llave' => $llave];
        }else{
            return ['estado' => 0];
        }
       
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Inscripto  $inscripto
     * @return \Illuminate\Http\Response
     */
    public function edit(Inscripto $inscripto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Inscripto  $inscripto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Inscripto $inscripto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Inscripto  $inscripto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Inscripto $inscripto)
    {
        //
    }
}
