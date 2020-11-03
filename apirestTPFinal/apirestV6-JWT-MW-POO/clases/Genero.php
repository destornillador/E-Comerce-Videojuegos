<?php
class Genero
{
	public $id;
    public $descripcion;

    public static function TraerGenerosDatos()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$script = "select * from genero";
            $consulta =$objetoAccesoDato->RetornarConsulta($script);
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Genero");		
	}
}
?>