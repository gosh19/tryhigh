@extends('layouts.app')

@section('content')
    <div class="container mt-5">
        <div class="alert-success">
            <div class="row p-4">
                <div class="col text-center">
                    <h1>Felicidades {{$user->nameInvocador}}!</h1>
                    <h1>Haz confirmado tu partida exitosamente</h1>
                    <h3>Ya puedes ver a tus contrincantes y planear tu estrategia para la siguiente partida</h3>

                    <p>Ante cualquier duda recuerden que pueden dirigirse a nuestro instagram o por el canal de discord</p>
                </div>
            </div>
        </div>
        <div class="alert-primary">
            <div class="row mt-5 p-3">
                <div class="col text-center">
                    <div class="spinner-grow text-danger" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <h2><a href="/UserView">Volver al perfil</a></h2>
                </div>
            </div>
        </div>
    </div>
@endsection