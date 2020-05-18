<?php

namespace App\Http\Controllers;

use App\Torneo;
use App\Llave;
use Illuminate\Http\Request;

class TorneoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $torneos = Torneo::where('abierto',1)->get();
            
            return $torneos;
        } catch (\Throwable $th) {
            //throw $th;
            return ['estado' => 0, 'error' => $th->getMessage()];
        }
    }

    public function getAllTorneos()
    {
        try {
            $torneos = Torneo::where('abierto',0)->orderBy('id','DESC')->take(5)->with('llaves')->get();
            foreach ($torneos as $key => $torneo) {
                foreach ($torneo->llaves as $key => $llave) {
                    if ($llave->Team1 != null) {

                        $llave->team1->logo;
                    }
                    if ($llave->Team2 != null) {

                        $llave->team2->logo;
                    }
                }
            }
            return ['estado' => 1, 'torneos' => $torneos];
        } catch (\Throwable $th) {
            //throw $th;
            return ['estado' => 0, 'error' => $th->getMessage()];
        }
    }

    public function selectWinnerLlave($llave_id, $winner)
    {
        $llave = Llave::find($llave_id);
        $rondaActual = $llave->ronda;
        $llave->en_juego = 0;
        $llave->save();

        $cantMaxLlaves = $llave->torneo->cant_llaves / (pow(2,$rondaActual));
        $rondaFinal = 2+ log($llave->torneo->cant_llaves,2);

        $llavesT = Llave::where('ronda',($rondaActual+1))->get();

        $control = false; //BANDERA PARA VER SI ENTRE EN ALGUNA LLAVE O NO

        foreach ($llavesT as $key => $ll) {
            if ($ll->Team1 == null) {
                $ll->Team1 = $winner;
                $control = true;
                $ll->save();
                break;
            }elseif ($ll->Team2 == null) {
                if ($rondaFinal == ($rondaActual+1)) {
                    return "El ganador ya se ha seleccionado";
                }
                $ll->Team2 = $winner;
                $control = true;
                $ll->save();
                break;
            }
        }

        
        if (!$control) {
            if (count($llavesT) >= $cantMaxLlaves) {
                return "Ya tamos llenos chancho qlio";
            }else {
                $newLlave = new Llave;
                $newLlave->ronda = $rondaActual +1;
                $newLlave->Team1 = $winner;
                $newLlave->torneo_lol_id = $llave->torneo_lol_id;
                $newLlave->save();
                if ($rondaFinal == ($rondaActual+1)) {
                    $newLlave->en_juego = 0;
                    $newLlave->save();
                    $llave->torneo->finalizado = 1;
                    $llave->torneo->en_juego = 0;
                    $llave->torneo->save();
                }
            }
        }
        return redirect()->back();



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
     * @param  \App\Torneo  $torneo
     * @return \Illuminate\Http\Response
     */
    public function show(Torneo $torneo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Torneo  $torneo
     * @return \Illuminate\Http\Response
     */
    public function edit(Torneo $torneo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Torneo  $torneo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Torneo $torneo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Torneo  $torneo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Torneo $torneo)
    {
        //
    }
}
