<?php
include_once 'MySql.php';

class Author 
{   
	use MySql;
	
	public $id;
	public $surname;
	public $name;
	public $lastname;
	public $tableName = "authors";

	public function createAuthor() 
	{
		$sql = "INSERT INTO $this->tableName
    	(surname, name, lastname)
   		VALUES(?, ?, ?)";
		
		if ($stmt = Database::connect()->prepare($sql)) {
			$stmt->bind_param("sss", $this->surname, 
			$this->name, $this->lastname);
			$stmt->execute();
			return true;
		}
	}
}

?>