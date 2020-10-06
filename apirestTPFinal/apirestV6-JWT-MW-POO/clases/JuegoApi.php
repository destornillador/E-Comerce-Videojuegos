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
       $titulo = $ArrayDeParametros['titulo'];
       $orden = $ArrayDeParametros['orden'];

       $Juego = Juego::TraerJuegosDatos($plataforma,$formato,$genero,$titulo,$orden);
       
       $newresponse = $response->withJson($Juego, 200);

       return $newresponse;
    }

    public function TraerJuego($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       $id= $ArrayDeParametros["id"];

       $Juego = Juego::TraerJuegoDatos($id);
       
       $newresponse = $response->withJson($Juego, 200);

       return $newresponse;
    }
}
?>