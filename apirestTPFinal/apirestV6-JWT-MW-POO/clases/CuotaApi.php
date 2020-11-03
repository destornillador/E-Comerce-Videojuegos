<?php
require_once 'Cuota.php';
class CuotaApi extends Cuota
{
    public function Traer($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $Cuota = Cuota::TraerDatos();
       
       $newresponse = $response->withJson($Cuota, 200);

       return $newresponse;
    }
}
?>