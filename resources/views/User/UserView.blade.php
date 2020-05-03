@extends('layouts.app')

@section('content')

    <div id="UserView"> Cargando...</div>
    <script>
        let userId = '{{$user->id}}'
    </script>
@endsection
