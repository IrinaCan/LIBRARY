<?php
include_once 'Taking.php';
include_once 'MySql.php';

class Book  
{
	use MySql;

	public $idBook;
	public $idAuthor;
	public $title;
	public $idGenre;
	public $idHouse;
	public $inLibr;
	public $tableName = "books";

	public function readAll($tableName) 
	{	
		$sql ="SELECT books.id, authors.surname, authors.name, 
		authors.lastname, books.title, genres.genre, 
		publish_houses.nameHouse, books.in_library as inLibr
		FROM ".$this->tableName. "
		LEFT JOIN authors on books.id_author=authors.id
		LEFT JOIN genres ON
		books.id_genre=genres.id
		LEFT JOIN publish_houses ON
		books.id_house=publish_houses.id
		ORDER BY authors.surname";	 
    	$result = Database::connect()->query($sql);
		return $result;     
	}

	public function createBook() 		
	{
		$sql = "SET foreign_key_checks=0;
    	INSERT INTO ".$this->tableName."
    	(id_author, title, id_genre, id_house)
    	VALUES('".$this->idAuthor."', '".$this->title."',
		'".$this->idGenre."', '".$this->idHouse."')";

		if (Database::connect()->multi_query($sql)) { 
			return true;
		}
	}

	public function readBooksInLibr() 
	{
		$sql ="SELECT books.id, authors.surname, authors.name,
		authors.lastname, books.title
		FROM books
		LEFT JOIN authors on books.id_author=authors.id 
    	WHERE in_library = 1
		ORDER BY authors.surname";
		$result = Database::connect()->query($sql);
		return $result;     
	}
}
?>

