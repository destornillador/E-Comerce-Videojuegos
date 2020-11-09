<?php
class FormaPago
{
	public $id;
    public $descripcion;

    public static function TraerDatos()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$script = "select * from formapago";
            $consulta =$objetoAccesoDato->RetornarConsulta($script);
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "FormaPago");		
	}
}
?>