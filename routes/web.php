<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
});
Route::post('/registro', 'Auth\RegisterController@create');


Auth::routes();
Route::resources([
    'users' => 'UserController',
    'torneo_tfts' => 'TorneoTftController',
    'inscriptos' => 'InscriptoController',
    'partidas' => 'PartidaController',
    'categoria_novedads' => 'CategoriaNovedadController',
    'novedads' => 'NovedadController',
    'llaves' => 'LlaveController',
]);

Route::get('/envio-mail','MailController@store');

Route::get('/home', 'HomeController@index')->name('home');

//USUARIOS**********************************************************

Route::middleware('auth')->group(function(){
    Route::get('/UserView' , function(){
        return view('User.UserView')->with('user', Auth::user());
    });
    
    Route::get('confirmar-tft/{id}', 'PartidaController@confirmarPartida');
    Route::get('infoConfirmacion/{id}', 'PartidaController@infoConfirmacion');
    Route::resource('TeamLol', 'TeamLolController');
    Route::get('/get-info-team', 'TeamLolController@getInfoTeam');
    Route::get('/get-Integrantes/{team_id}', 'TeamLolController@getIntegrantes');
});

Route::get('/AdminView' , function(){
    return view('Admin.AdminView');
});

Route::get('/aaa' , 'MercadoPagoController@verPago');
Route::get('/a' , 'MercadoPagoController@linkPago');

Route::get('finalizarLlave/{llave_id}', 'LlaveController@finalizarLlave');

Route::get('partidas/pasa/{id}','PartidaController@pasaDeRonda');

Route::get('torneo_tfts/iniciar/{id}', 'TorneoTftController@iniciarTorneo');

Route::get('inscriptos/llaves/{llave_id}', 'InscriptoController@llave');
Route::get('/inscriptos.show', 'InscriptoController@show');