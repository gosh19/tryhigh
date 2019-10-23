@extends('layouts.app')

@section('content')

    <div id="UserView"> Cargando...</div>
    <script>
        let nombreInvocador = '{{$user->nameInvocador}}';
        let userId = '{{$user->id}}'
    </script>
@endsection
