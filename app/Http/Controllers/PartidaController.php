<?php

namespace App\Http\Controllers;

use App\Partida;
use App\Llave;
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
     * RECIBE ID DEL USER MULTIPLICADO POR 64 Y CONFIRMA LA PARTIDA SI EL USER EXISTE
     * EL 64 ES PARA LA ENCRIPTACION BASICA XD
     */
    public function confirmarPartida($id)
    {
        try {
            $idReal = $id/64;
    
            $partida = Partida::where([ ['user_id',$idReal] , ['estado' , 'pendiente'] ])->orderBy('id','desc')->take(1)->get();
            $partida = $partida[0];

            $partida->confirmed = true;
    
            $partida->save();

            $user = \App\User::find($idReal);

            //return view('email-response.confirmacion-tft',['user' => $user]);

            return ['confirmado' => 1];
        } catch (\Throwable $th) {
            //throw $th;
           // return view('error.id-incorrecto', ['error' => $th]);
           return ['confirmado' => 0, 'error' => $th];
        }
    }

    public function infoConfirmacion($id)
    {
        $partida = Partida::where([ ['user_id',$id] , ['estado' , 'pendiente'] ])->orderBy('id','desc')->take(1)->get();

        if ($partida != []) {
            $partida = $partida[0];
    
            return ['estado' => $partida->confirmed];
        }else {
            return ['estado' => false];
        }
    

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

    public function pasaDeRonda($id)
    {
        //CAMBIO EL ESTADO DE LA APRTIDA A PASO
        $partida = Partida::find($id);
        $partida->estado = "paso";
        $partida->save();

        //BUSCO LA LLAVE PARA VER DE Q RONDA ES
        $llave = Llave::find($partida->llave_id);

        //BUSCO PARA VER SI EXISTE UNA LLAVE DISPONIBLE PARA ESA RONDA
        $llaves = Llave::where([['torneo_id', $llave->torneo_id], ['ronda', $llave->ronda+1], ['cant_jugadores','<',8]])->get();

        $llaves = last($llaves);
        //SI NO HAY LA CREO
        if ($llaves == []) {
            $llaveNueva = new Llave;
            $llaveNueva->torneo_id = $llave->torneo_id;
            $llaveNueva->ronda = $llave->ronda+1;
            $llaveNueva->cant_jugadores = 0;

            $llaveNueva->save();
        }
        else {
            $llaveNueva = Llave::find($llaves[0]->id);
        }

        //AGREGO EL JUGADOR A LA LLAVE 
        $llaveNueva->cant_jugadores++;
        $llaveNueva->save();

        //CAMBIO EL LLAVE_ID DE INSCRIPTO

        $inscripto = \App\Inscripto::find($partida->user_id);
        $inscripto->llave_id = $llaveNueva->id;

        $inscripto->save();

        $partidaNueva = new Partida;
        $partidaNueva->user_id = $partida->user_id;
        $partidaNueva->llave_id = $llaveNueva->id;
        $partidaNueva->estado = 'pendiente';
        $partidaNueva->fecha = '2020/01/01';

        $partidaNueva->save();



        return $partidaNueva;
    }
}
