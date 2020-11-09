<?php
require_once 'Cuota.php';
class CuotaApi extends Cuota
{
    public function Traer($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $Cuota = Cuota::TraerDatos();
       
       $newresponse = $response->withJson($Cuota, 200);

       return $newresponse;
    }

    public function CargarUno($request, $response, $args) {
        
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        
        $numero = $ArrayDeParametros["numero"];
        $interes = $ArrayDeParametros["interes"];
        $ultimoId =  Cuota::InsertarCuotaParametros($numero,$interes);
        $objDelaRespuesta->respuesta=$ultimoId;
        
        return $response->withJson($objDelaRespuesta, 200);
    }
    public function Actualizar($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $id = $ArrayDeParametros["id"];
        $numero = $ArrayDeParametros["numero"];
        $interes = $ArrayDeParametros["interes"];
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE cuota SET numero=:numero,interes=:interes WHERE id = :id");
        $consulta->bindParam(':id',$id);
        $consulta->bindParam(':numero',$numero);
        $consulta->bindParam(':interes',$interes);
        $consulta->execute();	
        
        $objDelaRespuesta->respuesta="Cuota actualizada éxitosamente.";
        return $response->withJson($objDelaRespuesta, 200);
   }
}
?>