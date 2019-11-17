<?php

// SDK de Mercado Pago
require __DIR__ .  '/sdkMp/vendor/autoload.php';

// Agrega credenciales
MercadoPago\SDK::setAccessToken('TEST-3101082182252032-102414-18dacb1d23dc9eeca2d221c1eeb84978__LA_LC__-177026505');
$user_id = 3;
// Crea un objeto de preferencia
$preference = new MercadoPago\Preference();




// Crea un ítem en la preferencia

$item = new MercadoPago\Item();
/*
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
/*
$preference->save();
?>

<a href="<?php echo $preference->init_point; ?>">Pagar con Mercado Pago</a>*/