<?php
require_once 'Formato.php';
class FormatoApi extends Formato
{
    public function TraerFormatos($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $Formato = Formato::TraerFormatosDatos();
       
       $newresponse = $response->withJson($Formato, 200);

       return $newresponse;
    }
}
?>