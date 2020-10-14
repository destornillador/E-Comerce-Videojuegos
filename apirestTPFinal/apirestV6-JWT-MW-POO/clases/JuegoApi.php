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
       $fotoNombre = $ArrayDeParametros["fotoNombre"];
       
       $destino="../../src/assets/portadas/";
       //$destino="../../assets/portadas/";
       //$destino="./fotos/";
       $archivos = $request->getUploadedFiles();
       //$nombreAnterior=$archivos['foto']->getClientFilename();
       //$extension= explode(".", $nombreAnterior);
       //$extension=array_reverse($extension);
       //$NombreFoto = $Usuario.'.'.$extension[0];
       $archivos['foto']->moveTo($destino.$fotoNombre);

       $ultimoId =  Juego::InsertarJuegoParametros($titulo,$precio,$plataformaId,$generoId,$formatoId,$descripcion,$stock,$fotoNombre);
       $objDelaRespuesta->respuesta=$ultimoId;
       
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
        $destino="../../src/assets/portadas/";
        //$destino="../../assets/portadas/";
        //$destino="./fotos/";
        $archivos = $request->getUploadedFiles();
        $archivos['foto']->moveTo($destino.$fotoNombre);
       }

       $consulta =  Juego::ActualizarJuegoParametros($id,$titulo,$precio,$descripcion,$stock,$fotoNombre);
       $objDelaRespuesta->respuesta=$consulta;
       
    
       return $response->withJson($actualizar, 200);
   }
}
?>