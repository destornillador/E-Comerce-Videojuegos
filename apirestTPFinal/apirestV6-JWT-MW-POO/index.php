<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


require '../composer/vendor/autoload.php';
require_once 'clases/JuegoApi.php';
require_once 'clases/UsuarioApi.php';

require_once 'clases/MWparaAutentificar.php';
require_once 'clases/MWparaCORS.php';
require_once 'clases/AccesoDatos.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

/*

¡La primera línea es la más importante! A su vez en el modo de 
desarrollo para obtener información sobre los errores
 (sin él, Slim por lo menos registrar los errores por lo que si está utilizando
  el construido en PHP webserver, entonces usted verá en la salida de la consola 
  que es útil).

  La segunda línea permite al servidor web establecer el encabezado Content-Length, 
  lo que hace que Slim se comporte de manera más predecible.
*/

$app = new \Slim\App(["settings" => $config]);

//Evitar Problema con CORS
$app->options('/{routes:.+}', function ($request, $response, $args) {
  return $response;
});
$app->add(function ($request, $response, $next) {
  try
  { 
      $response = $next($request, $response);
      return $response;
  }
  catch(Exception $e)
  {
      $resultado = new stdClass();
      $resultado->exito = false;
      $resultado->error = $e->getMessage();
      $response = $response->withJson($resultado);
      return $response->withHeader('Content-type', 'application/json');
  }
});
$app->add(function ($req, $res, $next) {
  $response = $next($req, $res);
  return $response
          ->withHeader('Access-Control-Allow-Origin', '*') //La pagina donde este alojado.
          ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
          ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
//Fin Evitar Problemas Con CORS


//LLAMADA A METODOS DE INSTANCIA DE UNA CLASE

/*$app->get('/crearToken/', function (Request $request, Response $response) {
      $datos = array('usuario' => 'rogelio@agua.com','perfil' => 'Administrador', 'alias' => "PinkBoy");
     //$datos = array('usuario' => 'rogelio@agua.com','perfil' => 'profe', 'alias' => "PinkBoy");
      
      $token= AutentificadorJWT::CrearToken($datos); 
      $newResponse = $response->withJson($token, 200); 
      return $newResponse;
});*/ 

$app->group('/ecomerce', function () {
      $this->post('/', \JuegoApi::class . ':TraerJuegos')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      
      $this->post('/login',\UsuarioApi::class . ':traerUno')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
      $this->post('/guardarCliente', \UsuarioApi::class . ':CargarUno')->add(\MWparaCORS::class . ':HabilitarCORS8080');

      $this->post('/CrearToken', \UsuarioApi::class . ':CrearToken')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
      $this->post('/VerificarToken', \UsuarioApi::class . ':VerificarToken')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
      $this->post('/RecuperarToken', \UsuarioApi::class . ':RecuperarToken')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
    
  })->add(\MWparaCORS::class . ':HabilitarCORSTodos');

$app->run();