<?php
class Juego
{
	public $id;
    public $titulo;
 	public $precio;
  	public $plataformaId;
    public $formatoId;
    public $generoId;
    public $stock;
    public $foto;


	public static function TraerJuegosDatos($plataforma,$formato,$genero)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$script = "select * from juego where true";
            if($plataforma != "" || $formato != "" || $genero != "")
            {
                if($plataforma != ""){
                    $script = $script. " AND plataformaId = ".$plataforma;
                }
                if($formato != ""){
                    $script = $script. " AND formatoId = ".$formato;
                }
                if($genero != ""){
                    $script = $script. " AND generoId = ".$genero;
                }
            }
            $consulta =$objetoAccesoDato->RetornarConsulta($script);
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Juego");		
	}
    
}
?>