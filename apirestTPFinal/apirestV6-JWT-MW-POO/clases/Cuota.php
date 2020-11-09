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
	public static function InsertarCuotaParametros($numero,$interes)
    {
               $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
               $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into cuota(numero,interes)
               values ('$numero','$interes')");
               
               $consulta->execute();		
               return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
}
?>