<?php
class Cuota
{
	public $id;
    public $numero;
    public $interes;

    public static function TraerDatos()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$script = "select * from cuota";
            $consulta =$objetoAccesoDato->RetornarConsulta($script);
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Cuota");		
	}
}
?>