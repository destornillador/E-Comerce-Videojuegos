<?php
class AccesoDatos
{
    private static $ObjetoAccesoDatos;
    private $objetoPDO;

    private dbHost=isset(getenv("DB_HOST")) ? getenv("DB_HOST") : 'localhost';
    private dbName=isset(getenv("DB_NAME")) ? getenv("DB_NAME") : 'ecomerce-juegos';
    private dbUser=isset(getenv("DB_USER")) ? getenv("DB_USER") : 'root';
    private dbPass=isset(getenv("DB_PASS")) ? getenv("DB_PASS") : '';


    private function __construct()
    {
        try { 
            $this->objetoPDO = new PDO('mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8', '$DB_USER', '$DB_PASS', array(PDO::ATTR_EMULATE_PREPARES => false,PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
            //$this->objetoPDO = new PDO('mysql:host=mysql.hostinger.com.ar;dbname=u165458543_final;charset=utf8', 'u165458543_rbal', 'Laboratorio4', array(PDO::ATTR_EMULATE_PREPARES => false,PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
            
            $this->objetoPDO->exec("SET CHARACTER SET utf8");
            } 
        catch (PDOException $e) { 
            print "Error!: " . $e->getMessage(); 
            die();
        }
    }
 
    public function RetornarConsulta($sql)
    { 
        return $this->objetoPDO->prepare($sql); 
    }
     public function RetornarUltimoIdInsertado()
    { 
        return $this->objetoPDO->lastInsertId(); 
    }
 
    public static function dameUnObjetoAcceso()
    { 
        if (!isset(self::$ObjetoAccesoDatos)) {          
            self::$ObjetoAccesoDatos = new AccesoDatos(); 
        } 
        return self::$ObjetoAccesoDatos;        
    }
 
 
     // Evita que el objeto se pueda clonar
    public function __clone()
    { 
        trigger_error('La clonación de este objeto no está permitida', E_USER_ERROR); 
    }
}
?>
