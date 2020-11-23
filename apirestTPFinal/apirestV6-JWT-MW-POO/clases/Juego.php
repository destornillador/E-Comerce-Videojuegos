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
    public $stock;
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

    public static function TraerJuegosCarrito($ids)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$script = "select J.*,G.descripcion as genero,P.descripcion as plataforma, F.descripcion as formato from juego as J
                       inner join plataforma as P on J.plataformaId = P.id
                       inner join genero as G on J.generoId = G.id
                       inner join formato as F on J.formatoId = F.id 
                       where J.id in (".$ids.")";
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
    
    public static function InsertarJuegoParametros($titulo,$precio,$plataformaId,$generoId,$formatoId,$descripcion,$stock,$fotoNombre)
    {
               $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
               $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into juego(titulo, precio, plataformaId, generoId, formatoId, stock, foto, descripcion)
               values ('$titulo','$precio','$plataformaId','$generoId','$formatoId','$stock','$fotoNombre','$descripcion')");
               
               $consulta->execute();		
               return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
    public static function GuardarFoto($foto,$id)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("Update juego
               set foto = '$foto'
               where id = {$id}");
        
        $consulta->execute();		
    }
    public static function ActualizarJuegoParametros($id,$titulo,$precio,$descripcion,$stock,$foto)
    {
               $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
               $consulta =$objetoAccesoDato->RetornarConsulta("Update juego
               set titulo = '$titulo', descripcion = '$descripcion', precio = {$precio}, stock = {$stock}, foto = '$foto'
               where id = {$id}");
               
               $consulta->execute();		
               return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
    public static function BuscarJuego($id,$titulo,$formatoId,$plataformaId)
    {
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from juego
		Where titulo = :titulo AND formatoId = :formatoId AND plataformaId = :plataformaId AND id != :id");
		$consulta->bindParam(':id',$id);
        $consulta->bindParam(':titulo',$titulo);
        $consulta->bindParam(':formatoId',$formatoId);
        $consulta->bindParam(':plataformaId',$plataformaId);

		$consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_CLASS, "Juego");		
    }
}
?>
