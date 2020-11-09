<?php
class Venta
{
	public $id;
    public $usuarioId;
    public $nombre;
    public $apellido;
    public $email;
    public $telefono;
    public $precioTotal;
    public $tipoRetiroId;
    public $tipoRetiro;
    public $zonaId;
    public $zona;
    public $domicilio;
    public $formaPagoId;
    public $formaPago;
    public $cuotaId;
    public $cuotaNumero;
    public $interes;
    public $estado;
    public $descripcionEstado;
    public $fecha;    
    
    public static function TraerVentasDatos($usuarioId,$estado)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$script = "SELECT V.*, U.nombre as nombre, U.apellido as apellido, U.email as email, U.telefono as telefono, 
                        TR.descripcion as tipoRetiro,E.descripcion as descripcionEstado, P.descripcion as formaPago,
                        C.numero as cuotaNumero, C.interes as interes, Z.descripcion as zona, V.tarjeta as tarjeta
                        FROM venta as V
                        inner join usuario as U on U.id = V.usuarioId
                        inner join tiporetiro as TR on TR.id = V.tipoRetiroId
                        left join zona as Z on Z.id = V.zonaId
                        inner join formapago as P on P.id = V.formaPagoId
                        left join cuota as C on C.id = V.cuotaId
                        inner join estadoventa as E on E.id = V.estado
                        WHERE 1";
            if($usuarioId != "" || $estado != "")
            {
                if($usuarioId != ""){
                    $script = $script. " AND V.usuarioId = ".$usuarioId;
                }
                if($estado != ""){
                    $script = $script. " AND V.estado = ".$estado;
                }
            }
            $consulta =$objetoAccesoDato->RetornarConsulta($script);
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Venta");		
	}

	public static function InsertarParametros($usuarioId,$precioTotal,$tipoRetiroId,$zonaId,$domicilio,$formaPagoId,$cuotas,$estado,$fecha,$tarjeta)
    {
               $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
               $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into venta(usuarioId, precioTotal, tipoRetiroId, zonaId, domicilio, formaPagoId, cuotaId, estado, fecha,tarjeta)
               values ('$usuarioId',$precioTotal,'$tipoRetiroId','$zonaId','$domicilio','$formaPagoId','$cuotas','$estado','$fecha','$tarjeta')");
               
               $consulta->execute();		
               return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
   
}
?>