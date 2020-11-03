<?php
require_once 'Zona.php';
class ZonaApi extends Zona
{
    public function Traer($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $Zona = Zona::TraerDatos();
       
       $newresponse = $response->withJson($Zona, 200);

       return $newresponse;
    }
}
?>