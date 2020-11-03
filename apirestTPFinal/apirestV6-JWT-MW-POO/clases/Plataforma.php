<?php
class Plataforma
{
	public $id;
    public $descripcion;

    public static function TraerPlataformasDatos()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$script = "select * from plataforma";
            $consulta =$objetoAccesoDato->RetornarConsulta($script);
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Plataforma");		
	}
}
?>