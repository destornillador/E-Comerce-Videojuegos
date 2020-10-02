<?php
require_once 'Juego.php';
class JuegoApi extends Juego
{
    public function TraerJuegos($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       $plataforma= $ArrayDeParametros["plataforma"];
       $formato = $ArrayDeParametros['formato'];
       $genero = $ArrayDeParametros['genero'];
       
       $Juego = Juego::TraerJuegosDatos($plataforma,$formato,$genero);
       
       $newresponse = $response->withJson($Juego, 200);

       return $newresponse;
    }
}
?>