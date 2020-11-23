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

       $archivos = $request->getUploadedFiles();
       $fotoNombre = "../../assets/portadas/".$ultimoId.".jpg";
       $archivos['foto']->moveTo($fotoNombre);

       if (isset($_ENV['CLOUDINARY_URL'])) {
         $fotoNombreCloudinary='production/'.$ultimoId;
         $resCloudinary = \Cloudinary\Uploader::upload($fotoNombre,array("public_id" => $fotoNombreCloudinary));
         $fotoNombre = $resCloudinary["secure_url"];
       }
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
       $actualizar = $ArrayDeParametros["cambiarFoto"];

       $fotoNombre = "../../assets/portadas/".$id.".jpg";    

       if($actualizar == "Si"){
        //$destino="../../src/assets/portadas/";
		$archivos = $request->getUploadedFiles();
        $archivos['foto']->moveTo($fotoNombre);

         if (isset($_ENV['CLOUDINARY_URL'])) {
           $fotoNombreCloudinary='production/'.$id;
           $resCloudinary = \Cloudinary\Uploader::upload($fotoNombre,array("public_id" => $fotoNombreCloudinary, "overwrite" => true));
           $fotoNombre = $resCloudinary["secure_url"];
         }
       }
       $consulta =  Juego::ActualizarJuegoParametros($id,$titulo,$precio,$descripcion,$stock,$fotoNombre);
       $objDelaRespuesta->respuesta=$consulta;
       
    
       return $response->withJson($actualizar, 200);
   }

   public function ValidarJuego($request, $response, $args) 
    {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $id= $ArrayDeParametros["id"];
        $titulo= $ArrayDeParametros["titulo"];
        $formato= $ArrayDeParametros["formato"];
        $plataforma= $ArrayDeParametros["plataforma"];
        $formatoId= $ArrayDeParametros["formatoId"];
        $plataformaId= $ArrayDeParametros["plataformaId"];
        
        $Juego = Juego::BuscarJuego($id,$titulo,$formatoId,$plataformaId);
        
        $resultado = new stdClass();
            
        if($Juego == []){
            $resultado->exito = true;
            $objDelaRespuesta->respuesta= $resultado;
        }
        else{
            $resultado->exito = false;
            $resultado->mensaje = "El juego ".$titulo. " para la ".$plataforma." en formato ".$formato. " ya fue creado";
            $objDelaRespuesta->respuesta= $resultado;
        }

        $newresponse = $response->withJson($objDelaRespuesta, 200);  
        return $newresponse;
    }
}
?>
