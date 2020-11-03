<?php
class Zona
{
	public $id;
    public $descripcion;
    public $precio;

    public static function TraerDatos()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$script = "select * from zona";
            $consulta =$objetoAccesoDato->RetornarConsulta($script);
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Zona");		
	}
}
?>