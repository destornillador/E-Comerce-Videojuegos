<?php
class Usuario
{
	public $id;
    public $usuario;
    public $contrasenia;
 	public $nombre;
  	public $apellido;
    public $tipoUsuarioId;
    public $sexo;
    public $fechaNacimiento;
    public $email;
    public $telefono;
    

	public static function TraerTodoLosEmpleados()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuario where tipoUsuarioId = 3");
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");		
    }    
    public static function TraerUnUsuario($usuario,$pass)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuario
			Where usuario = :usuario AND contrasenia = :pass");
			$consulta->bindParam(':usuario',$usuario);
			$consulta->bindParam(':pass',$pass);
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");		
	}
    public static function InsertarUsuarioParametros($usuario,$nombre,$apellido,$contrasenia,$tipoUsuarioId,$telefono,$sexo,$email,$fechaNacimiento,$estado)
    {
               $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
               $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuario(usuario,contrasenia,nombre,apellido,sexo,email,telefono,fechaNacimiento,tipoUsuarioId,estado)
               values ('$usuario','$contrasenia','$nombre','$apellido','$sexo','$email','$telefono','$fechaNacimiento','$tipoUsuarioId','$estado')");
               
               $consulta->execute();		
               return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
   
}
?>