<?php
require_once 'Usuario.php';
class UsuarioApi extends Usuario 
{
    public function TraerTodos($request, $response, $args) {
        $todosLosEmpleados=Usuario::TraerTodoLosEmpleados();
        $newresponse = $response->withJson($todosLosEmpleados, 200);  
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
        $estado = $ArrayDeParametros["estado"];

        $ultimoId =  Usuario::InsertarUsuarioParametros($usuario,$nombre,$apellido,$contrasenia,$tipoUsuarioId,$telefono,$sexo,$email,$fechaNacimiento,$estado);
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
        
        $newresponse = $response->withJson($User, 200);  
        return $newresponse;
    }
    
    public function ValidarUsuario($request, $response, $args) 
    {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $usuario= $ArrayDeParametros["usuario"];
        
        $User = Usuario::BuscarUsuario($usuario);
        
        $resultado = new stdClass();
            
        if($User == []){
            $resultado->exito = true;
            $objDelaRespuesta->respuesta= $resultado;
        }
        else{
            $resultado->exito = false;
            $resultado->mensaje = "El usuario ya fue creado";
            $objDelaRespuesta->respuesta= $resultado;
        }

        $newresponse = $response->withJson($objDelaRespuesta, 200);  
        return $newresponse;
    }

    public function DesabilitarUsuario($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $id = $ArrayDeParametros["id"];
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuario SET estado=2 WHERE id = :id");
        $consulta->bindParam(':id',$id);
        $consulta->execute();	
        
        $objDelaRespuesta->respuesta="Empleado suspendido éxitosamente.";
        return $response->withJson($objDelaRespuesta, 200);
   }
   public function HabilitarUsuario($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $id = $ArrayDeParametros["id"];
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuario SET estado=1 WHERE id = :id");
        $consulta->bindParam(':id',$id);
        $consulta->execute();	
        
        $objDelaRespuesta->respuesta="Empleado reabilitado éxitosamente.";
        return $response->withJson($objDelaRespuesta, 200);
   }
   public function ContratarUsuario($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $id = $ArrayDeParametros["id"];
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuario SET estado=1 WHERE id = :id");
        $consulta->bindParam(':id',$id);
        $consulta->execute();	
        
        $objDelaRespuesta->respuesta="Empleado contratado éxitosamente.";
        return $response->withJson($objDelaRespuesta, 200);
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