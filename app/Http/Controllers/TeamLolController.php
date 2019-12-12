<?php

namespace App\Http\Controllers;

use App\TeamLol;
use Illuminate\Http\Request;

class TeamLolController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
            $teamLol = new TeamLol;
    
            $teamLol->nombre = $request->nombre;
            $teamLol->sigla = $request->sigla;
    
            $teamLol->save();
            
            return ['estado' => 1 , 'error' => 0];
        } catch (\Throwable $th) {
            
            return ['estado' => 0 , 'error' => $th];
        }


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\TeamLol  $teamLol
     * @return \Illuminate\Http\Response
     */
    public function show(TeamLol $teamLol)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\TeamLol  $teamLol
     * @return \Illuminate\Http\Response
     */
    public function edit(TeamLol $teamLol)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\TeamLol  $teamLol
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TeamLol $teamLol)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\TeamLol  $teamLol
     * @return \Illuminate\Http\Response
     */
    public function destroy(TeamLol $teamLol)
    {
        //
    }
}
