<?php
include_once 'Database.php';

 trait MySql
 {
	public function readAll($tableName) 
	{
		$sql = "SELECT * FROM $tableName";
		$result = Database::connect()->query($sql);
		return $result;
 	}

 	public function deleteRowUsingID($tableName, $id) 
	{
		$sql = "DELETE FROM $tableName
		WHERE id= $id;
		ALTER TABLE $tableName AUTO_INCREMENT = 1";
		
		if (Database::connect()->multi_query($sql) )
			return true;
	}

/* 	public function readRowUsingID($tableName, $id) 
	{
 		$sql = "SELECT * FROM ".$tableName." 
 			WHERE id = ".$id;
 		$row = Database::connect()->query($sql);
 		var_dump($row);
	} */

}
?>