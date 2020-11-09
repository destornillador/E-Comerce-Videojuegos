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

    public function CargarUno($request, $response, $args) {
        
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        
        $descripcion = $ArrayDeParametros["descripcion"];
        $precio = $ArrayDeParametros["precio"];
        $ultimoId =  Zona::InsertarZonaParametros($descripcion,$precio);
        $objDelaRespuesta->respuesta=$ultimoId;
        
        return $response->withJson($objDelaRespuesta, 200);
    }
    public function Actualizar($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $id = $ArrayDeParametros["id"];
        $descripcion = $ArrayDeParametros["descripcion"];
        $precio = $ArrayDeParametros["precio"];
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE zona SET descripcion=:descripcion,precio=:precio WHERE id = :id");
        $consulta->bindParam(':id',$id);
        $consulta->bindParam(':descripcion',$descripcion);
        $consulta->bindParam(':precio',$precio);
        $consulta->execute();	
        
        $objDelaRespuesta->respuesta="Zona actualizada éxitosamente.";
        return $response->withJson($objDelaRespuesta, 200);
   }
}
?>