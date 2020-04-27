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
    public function show(Invitation $invitation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Invitation  $invitation
     * @return \Illuminate\Http\Response
     */
    public function edit(Invitation $invitation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Invitation  $invitation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Invitation $invitation)
    {
        //
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
