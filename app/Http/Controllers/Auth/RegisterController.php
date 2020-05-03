<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;


class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'nameInvocador' => ['required', 'string', 'max:255', 'unique:users'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(Request $request)
    {
        try {
           $id= User::insertGetId([
                'name' => $request['name'],
                'email' => $request['email'],
                'nameInvocador' => $request['nameInvocador'],
                'rol_id' => 1,
                'password' => Hash::make($request['password']),
            ]);

            $datosInvoker = new \App\InvokerData;

            $datosInvoker->user_id = $id;
            if ($request->datosInvocador['summonerLevel'] != null) {
                $datosInvoker->icon = $request->datosInvocador['profileIconId'];
                $datosInvoker->lvl = $request->datosInvocador['summonerLevel'];
                if (count($request->datosInvocador['rankInfo']) != 0) {
                    $datosInvoker->type_league = $request->datosInvocador['rankInfo'][0]['queueType'];
                    $datosInvoker->tier_league = $request->datosInvocador['rankInfo'][0]['tier'];
                }
            }
            $datosInvoker->save();

            return ['estado' => 1];

        } catch (\Throwable $th) {
            return ['estado' => 0, 'error' => $th->getMessage()];
        }
        
    }
}
