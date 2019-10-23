<?php

namespace App\Http\Controllers;

use App\TorneoTft;
use Illuminate\Http\Request;

class TorneoTftController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $torneos = TorneoTft::where('abierto', 1)->get();
        return $torneos;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
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
            TorneoTft::create([
                'nombre' => $request->nombre,
                'fecha_inicio' => $request->fechaInicio
            ]);
            
            return ['estado' => 1];
        } catch (\Throwable $th) {
            return $th;
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\TorneoTft  $torneoTft
     * @return \Illuminate\Http\Response
     */
    public function show(TorneoTft $torneoTft)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\TorneoTft  $torneoTft
     * @return \Illuminate\Http\Response
     */
    public function edit(TorneoTft $torneoTft)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\TorneoTft  $torneoTft
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TorneoTft $torneoTft)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\TorneoTft  $torneoTft
     * @return \Illuminate\Http\Response
     */
    public function destroy(TorneoTft $torneoTft)
    {
        //
    }
}
