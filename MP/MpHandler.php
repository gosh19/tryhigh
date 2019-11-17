<?php

namespace MP;


class MpHandler
{
    
    public function cargar(){
        
        require_once 'pagoInscripcion.php';
        $hola = 4;
        
        $item->title = 'Mi producto';
        $item->quantity = 1;
        $item->unit_price = 75.56;
        $preference->items = array($item);

        $preference->back_urls = array(
            "success" => "localhost/mp/xd.php",
            "failure" => "http://www.tu-sitio/failure",
            "pending" => "http://www.tu-sitio/pending"
        );
        $preference->auto_return = "all";

        $preference->save();

        return view('asd',['preference' => $preference]);
    }

}