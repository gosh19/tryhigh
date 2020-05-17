<?php

namespace App\Http\Controllers;

use App\Inscripto;
use App\Llave;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InscriptoController extends Controller
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
     * INSCRIPCION AL TORNEO CORRESPONDIENTE
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $integrante = \App\Integrante::find(Auth::user()->id);
            if (!$integrante->lider) {                                  //controlo q sea el lider
                return ['estado' => 0, 'error' => 'Solo el lider del Team puede realizar la inscripcion'];
            }
            $inscripto = Inscripto::where([['team_lol_id',$integrante->team_id],['torneo_id', $request->torneo_id]])->get();
            if (count($inscripto) != 0) {                               //controlo q no este inscripto
                return ['estado' => 0, 'error' => 'El Team ya se encuentra inscripto a este torneo'];
            }

            $torneo = \App\Torneo::find($request->torneo_id);
            
            $control = false;
            foreach ($torneo->llaves as $key => $llave) {   //reviso si alguna llave tiene lugar
                $control = false;
                if ($llave->Team1 == null) {
                    $llave->Team1 = $integrante->team_id;
                    $control = true;
                }elseif ($llave->Team2 == null) {
                    $llave->Team2 = $integrante->team_id;
                    $llave->save();
                    $control = true;
                }
                if ($control) {

                    $llave->save();
                    $dataLlave = $llave;
                    break;
                }
            }
            if (!$control) {
                if (count($torneo->llaves) <4) {        //si hay menos de 4 llaves creo una
                    # code...
                    $newLlave = new \App\Llave;
                    $newLlave->ronda = 1;
                    $newLlave->Team1 = $integrante->team_id;
                    $newLlave->torneo_lol_id = $request->torneo_id;
                    
                    $newLlave->save();

                    $dataLlave = $newLlave;
                }else{                          //si no tiro error
                    return ['estado' => 0, 'error' => 'Torneo Completo'];
                }
            }
            
            $inscripto = new Inscripto;         //creo el inscripto
            $inscripto->team_lol_id = $integrante->team_id;
            $inscripto->llave_id = $dataLlave->id;
            $inscripto->torneo_id = $request->torneo_id;
            $inscripto->save();

            return ['estado' => 1];         //devuelvo cargado positivo

        } catch (\Throwable $th) {
            //throw $th;
            return ['estado' => 0, 'error' => 'System Error: '.$th->getMessage()];
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
        
    }
    /**
     * DEVUELVE LAS LLAVES DEL TORENO CON LOS USER SI ESTA ACTIVO
     */
    public function llave($llave_id)
    {
        
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

    /**
     * recibe la cantidad de llaves y la ronda 
     * devuelve 
     *  true si es la final
     *  false si no lo es
     *  -1 si esta pasado (por las dudas)
     */
    private function isFinal(int $cant_llaves, int $ronda)
    {
        $ronda_final = (log($cant_llaves)) +2;
        
        if ($ronda_final == $ronda) {
            return true;
        }
        else if($ronda_final <$ronda){
            return -1;
        }

        return false;
    }

}
