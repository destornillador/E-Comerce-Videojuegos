<?php
class Juego
{
	public $id;
    public $titulo;
 	public $precio;
  	public $plataformaId;
    public $formatoId;
    public $generoId;
    public $plataforma;
    public $formato;
    public $genero;
    public $foto;
    public $descripcion;


	public static function TraerJuegosDatos($plataforma,$formato,$genero,$titulo,$orden)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$script = "select J.*,G.descripcion as genero,P.descripcion as plataforma, F.descripcion as formato from juego as J
                       inner join plataforma as P on J.plataformaId = P.id
                       inner join genero as G on J.generoId = G.id
                       inner join formato as F on J.formatoId = F.id 
                       where true";
            if($plataforma != "" || $formato != "" || $genero != "" || $titulo != "")
            {
                if($plataforma != ""){
                    $script = $script. " AND J.plataformaId = ".$plataforma;
                }
                if($formato != ""){
                    $script = $script. " AND J.formatoId = ".$formato;
                }
                if($genero != ""){
                    $script = $script. " AND J.generoId = ".$genero;
                }
                if($titulo != ""){
                    $script = $script. " AND J.titulo like '%{$titulo}%'";
                }
            }
            switch($orden){
                case "":
                    $script = $script. " order By J.titulo";
                    break;
                case "1":
                    $script = $script. " order By J.precio DESC";
                    break;
                case "2":
                    $script = $script. " order By J.precio ASC";
                    break;
            }
            $consulta =$objetoAccesoDato->RetornarConsulta($script);
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Juego");		
	}

    public static function TraerJuegoDatos($id)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$script = "select J.*,G.descripcion as genero,P.descripcion as plataforma, F.descripcion as formato from juego as J
                       inner join plataforma as P on J.plataformaId = P.id
                       inner join genero as G on J.generoId = G.id
                       inner join formato as F on J.formatoId = F.id 
                       where J.id = {$id}";
            $consulta =$objetoAccesoDato->RetornarConsulta($script);
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Juego");		
	}
    
}
?>