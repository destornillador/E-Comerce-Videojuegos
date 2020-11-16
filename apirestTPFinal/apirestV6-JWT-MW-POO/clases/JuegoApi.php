<?php
require_once 'Juego.php';
class JuegoApi extends Juego
{
    public function TraerJuegos($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       $plataforma= $ArrayDeParametros["plataforma"];
       $formato = $ArrayDeParametros['formato'];
       $genero = $ArrayDeParametros['genero'];
       $titulo = $ArrayDeParametros['titulo'];
       $orden = $ArrayDeParametros['orden'];

       $Juego = Juego::TraerJuegosDatos($plataforma,$formato,$genero,$titulo,$orden);
       
       $newresponse = $response->withJson($Juego, 200);

       return $newresponse;
    }
    public function TraerCarrito($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       $ids= $ArrayDeParametros["ids"];
       $Juego = Juego::TraerJuegosCarrito($ids);
       
       $newresponse = $response->withJson($Juego, 200);

       return $newresponse;
    }

    public function TraerJuego($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       $id= $ArrayDeParametros["id"];

       $Juego = Juego::TraerJuegoDatos($id);
       
       $newresponse = $response->withJson($Juego, 200);

       return $newresponse;
    }
    public function CargarUno($request, $response, $args) {
       
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       
       $titulo = $ArrayDeParametros["titulo"];
       $precio = $ArrayDeParametros["precio"];
       $plataformaId = $ArrayDeParametros["plataformaId"];
       $generoId = $ArrayDeParametros["generoId"];
       $formatoId = $ArrayDeParametros["formatoId"];
       $descripcion = $ArrayDeParametros["descripcion"];
       $stock = $ArrayDeParametros["stock"];
       
       $ultimoId =  Juego::InsertarJuegoParametros($titulo,$precio,$plataformaId,$generoId,$formatoId,$descripcion,$stock,"");
       $objDelaRespuesta->respuesta=$ultimoId;

       //$destino="../../src/assets/portadas/";
	   $destino="../../assets/portadas/";
       $archivos = $request->getUploadedFiles();
       $fotoNombre = $ultimoId.".jpg";
       $archivos['foto']->moveTo($destino.$fotoNombre);

       Juego::GuardarFoto($fotoNombre,$ultimoId);
       
       return $response->withJson($objDelaRespuesta, 200);
   }
   public function ActualizarUno($request, $response, $args) {
       
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       
       $id = $ArrayDeParametros["id"];
       $titulo = $ArrayDeParametros["titulo"];
       $precio = floatval($ArrayDeParametros["precio"]);
       $descripcion = $ArrayDeParametros["descripcion"];
       $stock = $ArrayDeParametros["stock"];
       $fotoNombre = $ArrayDeParametros["fotoNombre"];
       $actualizar = $ArrayDeParametros["cambiarFoto"];
       
       if($actualizar == "Si"){
        //$destino="../../src/assets/portadas/";
        $destino="../../assets/portadas/";
		$archivos = $request->getUploadedFiles();
        $archivos['foto']->moveTo($destino.$fotoNombre);
       }

       $consulta =  Juego::ActualizarJuegoParametros($id,$titulo,$precio,$descripcion,$stock);
       $objDelaRespuesta->respuesta=$consulta;
       
    
       return $response->withJson($actualizar, 200);
   }
}
?>