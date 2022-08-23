<?php
include_once '../model/Taking.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $takingData = json_decode($_POST['data']);
    $method = $takingData->method;
} else {
    $method = $_GET['method'];
}

switch ($method) {
    case "readAll":
        readAll();
        break;
    case "create":
        create($takingData);
        break;
    case "changeInLibr":
        changeInLibrary($takingData);
        break;
}

function readAll() {
    $taking = new Taking();
    $takes = $taking->readAll($taking->tableName);
    $data = array();
    $count = $takes->num_rows;

    for ($i = 0; $i < $count; $i++) {
        $row = $takes->fetch_array();
        $data[] = $row;
    }
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
}

function create($takingData) {
    $taking = new Taking();

    if ( (!empty($takingData->day)) && 
        (!empty($takingData->month)) && 
        (!empty($takingData->year)) && 
        (!empty($takingData->idReader)) && 
        (!empty($takingData->idBook)) && 
        (!empty($takingData->dateGive))) {
        $taking->day = (int)$takingData->day;
        $taking->month = (int)$takingData->month;
        $taking->year = (int)$takingData->year;
        $taking->idReader = (int)$takingData->idReader;
        $taking->idBook = (int)$takingData->idBook;
        $taking->dateGive = $takingData->dateGive;
 
        if ($taking->createTaking()) {
            echo "Ура!!! Новая выдача оформлена.";
            exit();
        } else {
            echo "Повторите оформление";
        }  
    } else {
        echo "Проверьте заполнение данных";
    } 
} 

function changeInLibrary($takingData) {
    $taking = new Taking();
    $taking->idTaking = (int)$takingData->idTaking;
    $taking->day = (int)$takingData->day;
    $taking->month = (int)$takingData->month;
    $taking->year = (int)$takingData->year;

    if ($taking->changeInLibraryStatus()) {
        echo "Возврат книги зачтён";
        exit();
    } else {
        echo "Что-то пошло не так";
    } 
}
?>