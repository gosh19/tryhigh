<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use MP\MpHandler;

class MercadoPagoController extends Controller
{
    public function linkPago()
    {
      $handler = new MpHandler;

      return $handler->cargar();

    }
}