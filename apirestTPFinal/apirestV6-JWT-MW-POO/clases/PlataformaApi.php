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
    public function CargarUno($request, $response, $args) {
        
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        
        $descripcion = $ArrayDeParametros["descripcion"];
        $ultimoId =  Plataforma::InsertarPlataformaParametros($descripcion);
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
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE plataforma SET descripcion=:descripcion WHERE id = :id");
        $consulta->bindParam(':id',$id);
        $consulta->bindParam(':descripcion',$descripcion);
        $consulta->execute();	
        
        $objDelaRespuesta->respuesta="Plataforma actualizada éxitosamente.";
        return $response->withJson($objDelaRespuesta, 200);
   }
}
?>