<?php
include_once 'MySql.php';
include_once 'ConvertDate.php';

class Reader 
{
    use MySql;

    public $idReader;
    public $surname;
    public $name;
    public $dayB;
    public $monthB;
    public $yearB;
    public $birthday;
    public $address;
    public $phone;
    public $email;
    public $tableName = "readers";

    public function createReader()
    {
        $convertDate = new ConvertDate($this->dayB, $this->monthB,
        $this->yearB);  
        $this->birthday = $convertDate->convertDate();
        $sql = "INSERT INTO ".$this->tableName."
        (surname, name, birthday, address, phone, email)
        VALUES(?, ?, ?, ?, ?, ?)";

        if ($stmt = Database::connect()->prepare($sql)) {
            $stmt->bind_param("ssssss", $this->surname,$this->name,
            $this->birthday, $this->address, $this->phone, $this->email);
            $stmt->execute(); 
            return true;
        }
    }
    
 
    public function updateReader() 
    {
        $convertDate = new ConvertDate($this->dayB, $this->monthB,
        $this->yearB);  
        $this->birthday = $convertDate->convertDate();
        $sql = "UPDATE $this->tableName SET surname = ?,
        name = ?, birthday = ?, 
        address = ?, phone = ?, email = ?
        WHERE id = ?";
        
        if ($stmt = Database::connect()->prepare($sql)) {
            $stmt->bind_param("ssssssi", 
            $this->surname, $this->name,
            $this->birthday, $this->address, $this->phone,
            $this->email, $this->idReader);
            $stmt->execute();
            return true;
        }
    }
}
?>