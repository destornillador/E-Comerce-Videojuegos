<?php
require_once 'Genero.php';
class GeneroApi extends Genero
{
    public function TraerGeneros($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $Genero = Genero::TraerGenerosDatos();
       
       $newresponse = $response->withJson($Genero, 200);

       return $newresponse;
    }
}
?>