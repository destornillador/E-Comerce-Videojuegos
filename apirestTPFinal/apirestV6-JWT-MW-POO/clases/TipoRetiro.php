<?php
class TipoRetiro
{
	public $id;
    public $descripcion;

    public static function TraerDatos()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$script = "select * from tiporetiro";
            $consulta =$objetoAccesoDato->RetornarConsulta($script);
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "TipoRetiro");		
	}
}
?>