<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return $users;
    }

    public function searchInvocadores($data= null)
    {
        if ($data == null) {
            return [];
        }
        $invocadores = User::where([['nameInvocador','LIKE', '%'.$data.'%'],['id','<>',Auth::user()->id]])->take(10)->get();

        return $invocadores;
    }

    public function userView()
    {

        return view('User.UserView')->with('user', Auth::user());
    }

    public function getUserData()
    {
        $user = User::find(Auth::user()->id);
        $user->invokerData;
        $user->integrante;
        return $user;
    }

    public function updateInvokerData(Request $request)
    {
        try {
            $datosInvoker = \App\InvokerData::find(Auth::user()->id);
            if ($datosInvoker == null) {
                $datosInvoker = new \App\InvokerData;
            }

            $datosInvoker->user_id = Auth::user()->id;
            if ($request['summonerLevel'] != null) {
                $datosInvoker->icon = $request['profileIconId'];
                $datosInvoker->lvl = $request['summonerLevel'];
                if (count($request['rankInfo']) != 0) {
                    $datosInvoker->type_league = $request['rankInfo'][0]['queueType'];
                    $datosInvoker->tier_league = $request['rankInfo'][0]['tier'];
                }
            }
            $datosInvoker->save();
            return ['estado' => 1, 'data' => $datosInvoker];
        } catch (\Throwable $th) {
            return ['estado' => 0, 'error' => $th->getMessage()];
        }
    }

    public function changeName(Request $request)
    {
        
        try {
            $user = User::find(Auth::user()->id);

            $user->nameInvocador = $request->name;

            $user->save();

            return ['estado'=>1];
        } catch (\Throwable $th) {
            //throw $th;
            return ['estado' => 0, 'error' => $th->getMessage()];
        }
    }
}
