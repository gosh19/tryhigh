<?php

namespace App\Http\Controllers;

use App\TeamLol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Integrante;

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
    
            $teamLol->nombre = $request->name;
            $teamLol->sigla = $request->sigla;
    
            $teamLol->save();

            $integrante = new Integrante;
            $integrante->user_id = Auth::user()->id;
            $integrante->lider = 1;
            $integrante->team_id = $teamLol->id;

            $integrante->save();
            
            return ['estado' => 1 , 'error' => 0];
        } catch (\Throwable $th) {
            
            return ['estado' => 0 , 'error' => $th->getMessage()];
        }
    }

    public function getInfoTeam()
    {
        try {
            $integrante = Integrante::find(Auth::user()->id)->with('TeamLol')->get();

            if (count($integrante)!= 0) {
                return ['exist' => 1, 'integrante' => $integrante];
            }
            return ['exist' => 0];
        } catch (\Throwable $th) {
            return ['exist' => 0, 'error' => $th->getMessage()];
        }
    }

    public function getIntegrantes($team_id)
    {
        try {
            $integrantes = Integrante::where('team_id', $team_id)->with('user')->get();

            return $integrantes;
        } catch (\Throwable $th) {
            //throw $th;
            return $th->getMessage();
        }
    }

    public function changeTeamName(Request $request)
    {
        try {
            $team = TeamLol::find($request->id);

            $team->nombre = $request->name;

            $team->save();

            return ['estado' => 1];
        } catch (\Throwable $th) {
            return ['estado' => 0, 'error' => $th->getMessage()];
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
    public function destroy($id)
    {
        try {
            $team = TeamLol::find($id);
            $team->delete();
            return ['estado' => 1];
        } catch (\Throwable $th) {
            return ['estado' => 0, 'error' => $th->getMessage()];

        }
    }
}
