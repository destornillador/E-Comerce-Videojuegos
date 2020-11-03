<?php
require_once 'Venta.php';
class VentaApi extends Venta
{
    public function TraerVentas($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       $usuarioId = $ArrayDeParametros["usuarioId"];
       $estado = $ArrayDeParametros['estado'];
       
       $Venta = Venta::TraerVentasDatos($usuarioId,$estado);
       
       $newresponse = $response->withJson($Venta, 200);

       return $newresponse;
    }
    
    public function CargarUno($request, $response, $args) {
        
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        
        $usuarioId = $ArrayDeParametros["usuarioId"];
        $precioTotal = $ArrayDeParametros["precioTotal"];
        $tipoRetiroId = $ArrayDeParametros["tipoRetiroId"];
        $zonaId = $ArrayDeParametros["zonaId"];
        $domicilio = $ArrayDeParametros["domicilio"];
        $formaPagoId = $ArrayDeParametros["formaPagoId"];
        $cuotas = $ArrayDeParametros["cuotas"];
        $estado = $ArrayDeParametros["estado"];
        $fecha = $ArrayDeParametros["fecha"];
        $tarjeta = $ArrayDeParametros["tarjeta"];

        $ultimoId =  Venta::InsertarParametros($usuarioId,$precioTotal,$tipoRetiroId,$zonaId,$domicilio,$formaPagoId,$cuotas,$estado,$fecha,$tarjeta);
        $objDelaRespuesta->respuesta=$ultimoId;
        
        return $response->withJson($objDelaRespuesta, 200);
    }

    public function PasarEstado($request, $response, $args){
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        
        $ventaId = $ArrayDeParametros["ventaId"];
        $tipoRetiroId = $ArrayDeParametros["tipoRetiroId"];
        $tarjeta = $ArrayDeParametros["tarjeta"];
        $estado = $ArrayDeParametros["estado"];
    
        $rechazo = false;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        if($tipoRetiroId == 1)//Domicilio
        {
            switch($estado){
                case "1":
                    if($tarjeta == "44444444"){
                        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE venta SET estado = 2 WHERE id = :ventaId");
                    }
                    else{
                        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE venta SET estado = 9 WHERE id = :ventaId");
                        $rechazo = true;
                    }
                break;
                case "2":
                    $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE venta SET estado = 3 WHERE id = :ventaId");
                break;
                case "3":
                    $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE venta SET estado = 4 WHERE id = :ventaId");
                break;
                case "4":
                    $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE venta SET estado = 5 WHERE id = :ventaId");
                break;
            }
        }
        if($tipoRetiroId == 2)//Por sucursal
        {
            switch($estado){
                case "1":
                    if($tarjeta == "44444444"){
                        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE venta SET estado = 2 WHERE id = :ventaId");
                    }
                    else{
                        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE venta SET estado = 9 WHERE id = :ventaId");
                        $rechazo = true;
                    }
                break;
                case "2":
                    $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE venta SET estado = 6 WHERE id = :ventaId");
                break;
                case "6":
                    $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE venta SET estado = 7 WHERE id = :ventaId");
                break;
            }
        }
        
        $consulta->bindParam(':ventaId',$ventaId);
        $consulta->execute();
        if($rechazo == true){
            $objDelaRespuesta->respuesta="No se pudo autorizar la venta.";
        }
        else{
            $objDelaRespuesta->respuesta="Venta actualizada éxitosamente.";
        }
        return $response->withJson($objDelaRespuesta, 200);
    }
}
?>