<?php

class Database
{
	public static $conn;
	private static $servername = "localhost";
	private static $username = "root";
	private static $password = "";
	private static $databasename = "library";

	public static function connect() {
		self::$conn = new mysqli(self::$servername, self::$username,
		self::$password, self::$databasename);
		mysqli_set_charset(self::$conn, 'utf8');
	    return self::$conn;
	}	
}
?>