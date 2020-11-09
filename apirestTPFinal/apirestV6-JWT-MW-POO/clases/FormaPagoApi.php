<?php
require_once 'FormaPago.php';
class FormaPagoApi extends FormaPago
{
    public function Traer($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $FormaPago = FormaPago::TraerDatos();
       
       $newresponse = $response->withJson($FormaPago, 200);

       return $newresponse;
    }
}
?>