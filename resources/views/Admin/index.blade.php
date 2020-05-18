@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row mb-3">
            <div class="col">
                <div class="card">
                    <div class="card-header">Crear Torneo</div>
                    <div class="card-body">
                        formularriod e torneo xd
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            @foreach ($torneos as $torneo)
                
            <div class="col-6">
                <div class="card">
                    <div class="card-header">{{$torneo->name}}</div>
                    <div class="card-body">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <div class="row">

                                    <div class="col-6">
                                        Cantidad de llaves: {{$torneo->cant_llaves}}
                                    </div>
                                    <div class="col-6">
                                        @if (count($torneo->llavesEnJuego) != 0)
                                        Inscriptos:                                           
                                        @foreach ($torneo->llavesEnJuego as $llave)
                                        <h5>Ronda: {{$llave->ronda}}</h5>
                                        <div class="d-flex">                                                
                                            <a class="btn btn-success" href="/Torneo/set-winner-llave/{{$llave->id}}/{{$llave->Team1}}">{{$llave->team1->nombre ?? 'Aun no inscripto'}}</a>
                                            <a class="btn btn-success" href="/Torneo/set-winner-llave/{{$llave->id}}/{{$llave->Team2}}">{{$llave->team2->nombre ?? 'Aun no inscripto'}}</a>
                                        </div>
                                        @endforeach
                                        @else
                                        Ganador: {{$torneo->getWinner($torneo->rondaFinal)->nombre}}
                                        @endif
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">Abierto: {{$torneo->abierto? 'SI':'NO'}}</li>
                            <li class="list-group-item">En juego: {{$torneo->en_juego? 'SI':'NO'}}</li>
                            <li class="list-group-item">Finalizado: {{$torneo->finalizado? 'SI':'NO'}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>
@endsection