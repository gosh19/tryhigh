<?php

namespace App\Http\Controllers;

use App\Invitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InvitationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $invitations = Invitation::where('sender',Auth::user()->id)->with('user')->get();

            return $invitations;
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
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
            $invitation = new Invitation;
            $invitation->sender = Auth::user()->id;
            $invitation->receiver = $request->user_id;

            $invitation->save();
            return ['estado' => 1];
        } catch (\Throwable $th) {
            return ['estado' => 0, 'error' => $th->getMessage()];
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Invitation  $invitation
     * @return \Illuminate\Http\Response
     */
    public function getInvitationUser()
    {
        try {
            $invitations = Invitation::where('receiver',Auth::user()->id)->with('sender')->get();

            return ['estado' => 1, 'invitations' => $invitations];
        } catch (\Throwable $th) {
            return ['estado' => 0, 'invitations' => $th->getMessage()];
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Invitation  $invitation
     * @return \Illuminate\Http\Response
     */
    public function accept($id)
    {
        try {
            $invitation = Invitation::find($id);    //BUSCO LA INVITACION
            $liderTeam = \App\Integrante::find($invitation->sender);    //TRAIGO LOS DATOS DELS ENDER PARA AGARRAR EL TEAM_ID
            $team = \App\TeamLol::find($liderTeam->team_id);

            if (count($team->integrantes) < 5) {    //CONTROLO QUE HAYA MENOS DE 5

                $newInt = new \App\Integrante;      //CREO EL NUEVO INTEGRANTE
                $newInt->user_id = Auth::user()->id;
                $newInt->team_id = $liderTeam->team_id;
                $newInt->save();

                $invitation->delete();  //BORRO LA INVITACION
    
                return['estado' => 1];
            }
            return ['estado' => 0, 'error' => 'Team Completo - maximo 5 integrantes'];

        } catch (\Throwable $th) {
            return ['estado' => 0, 'error' => $th->getMessage()];
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Invitation  $invitation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        
        try{
            $invitation = Invitation::where([['sender',Auth::user()->id],['receiver',$request->receiver]])->get();
            foreach ($invitation as $inv ) {
                $inv->delete();
            }
            return ['estado'=>1];
        }
        catch (\Throwable $th) {
            return ['estado' => 0, 'error' => $th->getMessage()];
        }
    }
}
