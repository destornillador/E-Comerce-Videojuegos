<?php
require_once 'Usuario.php';
class UsuarioApi extends Usuario 
{
    public function TraerTodos($request, $response, $args) {
        $todosLosRemiseros=Usuario::TraerTodoLosUsuarios();
        $newresponse = $response->withJson($todosLosRemiseros, 200);  
        return $newresponse;
    }


    public function CargarUno($request, $response, $args) {
       
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       
       $usuario = $ArrayDeParametros["usuario"];
       $nombre = $ArrayDeParametros["nombre"];
       $apellido = $ArrayDeParametros["apellido"];
       $contrasenia = md5($ArrayDeParametros["contrasenia"]);
       $tipoUsuarioId = $ArrayDeParametros["tipoUsuarioId"];
       $telefono = $ArrayDeParametros["telefono"];
       $sexo = $ArrayDeParametros["sexo"];
       $email = $ArrayDeParametros["email"];
       $fechaNacimiento = $ArrayDeParametros["fechaNacimiento"];

       $ultimoId =  Usuario::InsertarUsuarioParametros($usuario,$nombre,$apellido,$contrasenia,$tipoUsuarioId,$telefono,$sexo,$email,$fechaNacimiento);
       $objDelaRespuesta->respuesta=$ultimoId;
       
       return $response->withJson($objDelaRespuesta, 200);
   }
    public function TraerUno($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       $usuario= $ArrayDeParametros["usuario"];
       $contrasenia = $ArrayDeParametros['contrasenia'];
       $pass = md5($contrasenia);
       $User = Usuario::TraerUnUsuario($usuario,$pass);
       //$User =Usuario::TraerTodoLosUsuarios();
       $newresponse = $response->withJson($User, 200);  
       return $newresponse;
    }
   
   public function CrearToken($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $token= AutentificadorJWT::CrearToken($ArrayDeParametros); 
        $objDelaRespuesta->respuesta = $token;
        return $response->withJson($objDelaRespuesta, 200);
   }
   public function VerificarToken($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $token = $ArrayDeParametros["Token"];
        try 
        {
            //$token="";
            AutentificadorJWT::verificarToken($token);
            $objDelaRespuesta->esValido=true;
            $objDelaRespuesta->respuesta = "Token valido";      
        }
        catch (Exception $e) {      
            //guardar en un log
            $objDelaRespuesta->respuesta=$e->getMessage();
            $objDelaRespuesta->esValido=false;     
        }
        return $response->withJson($objDelaRespuesta, 200);
   }
   public function RecuperarToken($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $token = $ArrayDeParametros["Token"];
        $data = AutentificadorJWT::ObtenerData($token);
        $objDelaRespuesta->respuesta = $data;
        return $response->withJson($objDelaRespuesta, 200);
   }
   
}
?>