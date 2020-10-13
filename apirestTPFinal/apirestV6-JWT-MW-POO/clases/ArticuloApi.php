<?php
require_once 'Articulo.php';
class ArticuloApi extends Articulo
{
    public function TraerArticulos($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       $juegoId= $ArrayDeParametros["juegoId"];
       
       $Articulo = Articulo::TraerArticulosDatos($juegoId);
       
       $newresponse = $response->withJson($Articulo, 200);

       return $newresponse;
    }
    public function AgregarNuevoArticulo($request, $response, $args)
    {
        $objDelaRespuesta= new stdclass();

        $ArrayDeParametros = $request->getParsedBody();
        
        $juegoId = $ArrayDeParametros["juegoId"];
        $codigo = $ArrayDeParametros["codigo"];
        
        $ultimoId =  Articulo::InsertarArticuloParametros($juegoId,$codigo);
        $objDelaRespuesta->respuesta=$ultimoId;
        
        return $response->withJson($objDelaRespuesta, 200);
    }
    public function AgregarArticulo($request, $response, $args)
    {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $id = $ArrayDeParametros["id"];
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE articulo SET disponible = 1 WHERE id = :id");
        $consulta->bindParam(':id',$id);
        $consulta->execute();	
        
        $objDelaRespuesta->respuesta="Articulo agregado éxitosamente.";
        return $response->withJson($objDelaRespuesta, 200);
    }
    public function RetirarArticulo($request, $response, $args)
    {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $id = $ArrayDeParametros["id"];
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE articulo SET disponible = 0 WHERE id = :id");
        $consulta->bindParam(':id',$id);
        $consulta->execute();	
        
        $objDelaRespuesta->respuesta="Articulo retirado éxitosamente.";
        return $response->withJson($objDelaRespuesta, 200);
    }
}
?>