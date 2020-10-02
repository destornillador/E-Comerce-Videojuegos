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
    

	public static function TraerTodoLosUsuarios()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuario");
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
    public static function InsertarUsuarioParametros($usuario,$nombre,$apellido,$contrasenia,$tipoUsuarioId,$telefono,$sexo,$email,$fechaNacimiento)
    {
               $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
               $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuario(usuario,contrasenia,nombre,apellido,sexo,email,telefono,fechaNacimiento,tipoUsuarioId)
               values ('$usuario','$contrasenia','$nombre','$apellido','$sexo','$email','$telefono','$fechaNacimiento','$tipoUsuarioId')");
               
               $consulta->execute();		
               return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
   
}
?>