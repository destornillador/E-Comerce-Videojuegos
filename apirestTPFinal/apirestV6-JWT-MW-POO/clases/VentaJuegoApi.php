<?php
require_once 'VentaJuego.php';
class VentaJuegoApi extends VentaJuego
{
    public function TraerVentaJuegos($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       $ventaId = $ArrayDeParametros["ventaId"];
       
       $VentaJuegoApi = VentaJuegoApi::TraerVentasJuegoDatos($ventaId);
       
       $newresponse = $response->withJson($VentaJuegoApi, 200);

       return $newresponse;
    }
    
    public function CargarUno($request, $response, $args) {
        
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        
        $juegoId = $ArrayDeParametros["juegoId"];
        $ventaId = $ArrayDeParametros["ventaId"];
        $precio = $ArrayDeParametros["precio"];
        $cantidad = $ArrayDeParametros["cantidad"];
        $nuevoStock = $ArrayDeParametros["nuevoStock"];
        
        $ultimoId =  VentaJuego::InsertarParametros($juegoId,$ventaId,$precio,$cantidad);
        $objDelaRespuesta->respuesta=$ultimoId;

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE juego SET stock = :nuevoStock WHERE id = :juegoId");
        $consulta->bindParam(':juegoId',$juegoId);
        $consulta->bindParam(':nuevoStock',$nuevoStock);
        $consulta->execute();
        
        return $response->withJson($objDelaRespuesta, 200);
    }

    public function RegresarStock($request, $response, $args) {
        
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        
        $juegoId = $ArrayDeParametros["juegoId"];
        $nuevoStock = $ArrayDeParametros["nuevoStock"];
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE juego SET stock = :nuevoStock WHERE id = :juegoId");
        $consulta->bindParam(':juegoId',$juegoId);
        $consulta->bindParam(':nuevoStock',$nuevoStock);
        $consulta->execute();
        
        return $response->withJson($objDelaRespuesta, 200);
    }
}
?>