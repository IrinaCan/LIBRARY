<?php
include_once 'MySql.php';
include_once 'Author.php';
include_once 'Book.php';
include_once 'ConvertDate.php';

class Taking
{
  use MySql;

  public $idTaking;
  public $day;
  public $month;
  public $year;
  public $dateTake;
  public $idReader;
  public $idBook;
  public $dateGive;
  public $dateGiven;
  public $tableName = "taking";

  public function readAll() 
  {	
    $sql ="SELECT taking.id, taking.date_take as dateTake, readers.surname as readerSurname, 
    readers.name as readerName, authors.surname,
    authors.name, authors.lastname, books.title, taking.date_give
    as dateGive, taking.given
    FROM ".$this->tableName. "
    LEFT JOIN readers ON taking.id_reader=readers.id
    LEFT JOIN books ON taking.id_book=books.id
    LEFT JOIN authors ON books.id_author=authors.id"; 
    $result = Database::connect()->query($sql);
    return $result;      
  }

  public function createTaking() 
  {
    $convertDate = new ConvertDate($this->day, $this->month,
    $this->year);  
    $this->dateTake = $convertDate->convertDate();
    $sql = "SET foreign_key_checks=0;
    INSERT INTO ".$this->tableName."
    (date_take, id_reader, id_book, date_give)
    VALUES('$this->dateTake', '$this->idReader',
	  '$this->idBook', '$this->dateGive')";

    if (Database::connect()->multi_query($sql)) {
      $this->changeStatusBook($this->idBook, 0);
      return true;
    }
  }

  public function changeInLibraryStatus() 
  {
    $convertDate = new ConvertDate($this->day, $this->month,
    $this->year);  
    $this->dateGiven = $convertDate->convertDate();
    $sql = "UPDATE taking SET given = '$this->dateGiven'
    WHERE id = $this->idTaking ";
    Database::connect()->query($sql);
    $sql = "SELECT taking.id_book as idBook
    FROM $this->tableName 
    LEFT JOIN books ON taking.id_book=books.id
    WHERE taking.id = $this->idTaking";
    $result = Database::connect()->query($sql);
    $row = $result->fetch_array();
    extract($row);
 
    if ($this->changeStatusBook($idBook, 1))
      return true;
  }

  private function changeStatusBook($idBook, $status) 
  {
    $sql = "UPDATE books SET in_library = $status
    WHERE id = $idBook ";
      if (Database::connect()->query($sql))
       return true;
  }
}
?>