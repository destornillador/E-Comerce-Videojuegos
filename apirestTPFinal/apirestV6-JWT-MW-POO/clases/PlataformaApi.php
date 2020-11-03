<?php
require_once 'Plataforma.php';
class PlataformaApi extends Plataforma
{
    public function TraerPlataformas($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $Plataforma = Plataforma::TraerPlataformasDatos();
       
       $newresponse = $response->withJson($Plataforma, 200);

       return $newresponse;
    }
}
?>