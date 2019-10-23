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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $llave = Llave::where('torneo_id', $request->torneo_id)->get();

            $llave = last($llave);
            if($llave != []){

                $llave = $llave[0];
            }
            //SI NO HAY NINGUNA LLAVE LA CREO
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

                $llave->cant_jugadores++;
                $llave->save();
            
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
            return ['estado' => 1];
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
