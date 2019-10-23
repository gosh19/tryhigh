<?php

namespace App\Http\Controllers;

use App\CategoriaNovedad;
use Illuminate\Http\Request;

class CategoriaNovedadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categorias = CategoriaNovedad::all();

        return $categorias;
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
            $categoria = new CategoriaNovedad;
            $categoria->tipo = $request->tipo;
            $categoria->save();

            return ['estado' => 1];
        } catch (\Throwable $th) {
            //throw $th;
            return ['estado' => $th];
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\CategoriaNovedad  $categoriaNovedad
     * @return \Illuminate\Http\Response
     */
    public function show(CategoriaNovedad $categoriaNovedad)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\CategoriaNovedad  $categoriaNovedad
     * @return \Illuminate\Http\Response
     */
    public function edit(CategoriaNovedad $categoriaNovedad)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CategoriaNovedad  $categoriaNovedad
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CategoriaNovedad $categoriaNovedad)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CategoriaNovedad  $categoriaNovedad
     * @return \Illuminate\Http\Response
     */
    public function destroy(CategoriaNovedad $categoriaNovedad)
    {
        //
    }
}
