<?php
require_once 'TipoRetiro.php';
class TipoRetiroApi extends TipoRetiro
{
    public function Traer($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $TipoRetiro = TipoRetiro::TraerDatos();
       
       $newresponse = $response->withJson($TipoRetiro, 200);

       return $newresponse;
    }
}
?>