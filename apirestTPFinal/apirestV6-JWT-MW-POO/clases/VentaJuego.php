<?php
class VentaJuego
{
	public $id;
    public $juegoId;
    public $juegoTitulo;
    public $juegoGenero;
    public $juegoFormato;
    public $juegoPlataforma;
    public $ventaId;
 	public $precio;
  	public $cantidad;

	public static function TraerVentasJuegoDatos($ventaId)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$script = "SELECT VJ.*, J.titulo as juegoTitulo, G.descripcion as juegoGenero, P.descripcion as juegoPlataforma, F.descripcion as juegoFormato
                        FROM ventajuego as VJ 
                        inner join juego as J on J.id = VJ.juegoId
                        inner join plataforma as P on P.id = J.plataformaId
                        inner join genero as G on G.id = J.generoId
                        inner join formato as F on F.id = J.formatoId
                        WHERE VJ.ventaId = ".$ventaId;
            
            $consulta =$objetoAccesoDato->RetornarConsulta($script);
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "VentaJuego");		
	}
    
    public static function InsertarParametros($juegoId,$ventaId,$precio,$cantidad)
    {
               $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
               $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into ventajuego(juegoId,ventaId,precio,cantidad)
               values ('$juegoId',$ventaId,'$precio','$cantidad')");
               
               $consulta->execute();		
               return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
   
}
?>