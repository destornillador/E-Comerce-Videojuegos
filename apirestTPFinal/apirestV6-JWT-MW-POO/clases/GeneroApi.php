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
    public function CargarUno($request, $response, $args) {
        
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        
        $descripcion = $ArrayDeParametros["descripcion"];
        $ultimoId =  Genero::InsertarGeneroParametros($descripcion);
        $objDelaRespuesta->respuesta=$ultimoId;
        
        return $response->withJson($objDelaRespuesta, 200);
    }
    public function Actualizar($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $id = $ArrayDeParametros["id"];
        $descripcion = $ArrayDeParametros["descripcion"];
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE genero SET descripcion=:descripcion WHERE id = :id");
        $consulta->bindParam(':id',$id);
        $consulta->bindParam(':descripcion',$descripcion);
        $consulta->execute();	
        
        $objDelaRespuesta->respuesta="Genero actualizado éxitosamente.";
        return $response->withJson($objDelaRespuesta, 200);
   }
}
?>