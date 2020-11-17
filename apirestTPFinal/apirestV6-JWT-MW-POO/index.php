<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


require '../composer/vendor/autoload.php';
require_once 'clases/JuegoApi.php';
require_once 'clases/UsuarioApi.php';
require_once 'clases/PlataformaApi.php';
require_once 'clases/GeneroApi.php';
require_once 'clases/FormatoApi.php';
require_once 'clases/FormaPagoApi.php';
require_once 'clases/TipoRetiroApi.php';
require_once 'clases/ZonaApi.php';
require_once 'clases/CuotaApi.php';
require_once 'clases/VentaApi.php';
require_once 'clases/VentaJuegoApi.php';

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
      $this->post('/getJuego', \JuegoApi::class . ':TraerJuego')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/guardarJuego', \JuegoApi::class . ':CargarUno')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/actualizarJuego', \JuegoApi::class . ':ActualizarUno')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/traerCarrito', \JuegoApi::class . ':TraerCarrito')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/verificarJuego', \JuegoApi::class . ':ValidarJuego')->add(\MWparaCORS::class . ':HabilitarCORS8080');
     
      $this->post('/login',\UsuarioApi::class . ':TraerUno')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
      $this->post('/guardarCliente', \UsuarioApi::class . ':CargarUno')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/listarEmpleados', \UsuarioApi::class . ':TraerTodos')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/verificarUsuario', \UsuarioApi::class . ':ValidarUsuario')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/habilitar', \UsuarioApi::class . ':HabilitarUsuario');
      $this->post('/contratar', \UsuarioApi::class . ':ContratarUsuario');
      $this->post('/desabilitar', \UsuarioApi::class . ':DesabilitarUsuario');

      $this->post('/TraerVentas', \VentaApi::class . ':TraerVentas')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/guardarVenta', \VentaApi::class . ':CargarUno')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/TraerVentaJuegos', \VentaJuegoApi::class . ':TraerVentaJuegos')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/guardarVentaJuego', \VentaJuegoApi::class . ':CargarUno')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/regresarVentaJuego', \VentaJuegoApi::class . ':RegresarStock')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/pasarEstado', \VentaApi::class . ':PasarEstado')->add(\MWparaCORS::class . ':HabilitarCORS8080');

      $this->post('/listarPlataformas', \PlataformaApi::class . ':TraerPlataformas')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/listarFormatos', \FormatoApi::class . ':TraerFormatos')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/listarGeneros', \GeneroApi::class . ':TraerGeneros')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/listarZonas', \ZonaApi::class . ':Traer')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/listarTipoRetiros', \TipoRetiroApi::class . ':Traer')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/listarFormaPagos', \FormaPagoApi::class . ':Traer')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/listarCuotas', \CuotaApi::class . ':Traer')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/ingresarZona', \ZonaApi::class . ':CargarUno')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/actualizarZona', \ZonaApi::class . ':Actualizar')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/ingresarPlataforma', \PlataformaApi::class . ':CargarUno')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/actualizarPlataforma', \PlataformaApi::class . ':Actualizar')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/ingresarGenero', \GeneroApi::class . ':CargarUno')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/actualizarGenero', \GeneroApi::class . ':Actualizar')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/ingresarCuota', \CuotaApi::class . ':CargarUno')->add(\MWparaCORS::class . ':HabilitarCORS8080');
      $this->post('/actualizarCuota', \CuotaApi::class . ':Actualizar')->add(\MWparaCORS::class . ':HabilitarCORS8080');

      $this->post('/CrearToken', \UsuarioApi::class . ':CrearToken')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
      $this->post('/VerificarToken', \UsuarioApi::class . ':VerificarToken')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
      $this->post('/RecuperarToken', \UsuarioApi::class . ':RecuperarToken')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
    
  })->add(\MWparaCORS::class . ':HabilitarCORSTodos');

$app->run();