<?php
class Articulo
{
	public $id;
    public $juegoId;
 	public $codigo;
  	public $disponible;
    
	public static function TraerArticulosDatos($juegoId)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$script = "select * from articulo
					where juegoId = {$juegoId}";
		$consulta =$objetoAccesoDato->RetornarConsulta($script);
		$consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_CLASS, "Articulo");		
	}
	public static function InsertarArticuloParametros($juegoId,$codigo)
    {
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into articulo(juegoId, disponible, codigo)
		values ('$juegoId',1,'$codigo')");
		
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }

}
?>