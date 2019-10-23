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
]);
Route::get('/inscriptos.show', 'InscriptoController@show');

Route::get('/home', 'HomeController@index')->name('home');

//USUARIOS**********************************************************

Route::middleware('auth')->group(function(){
    Route::get('/UserView' , function(){
        return view('User.UserView')->with('user', Auth::user());
    });

});

Route::get('/AdminView' , function(){
    return view('Admin.AdminView');
});