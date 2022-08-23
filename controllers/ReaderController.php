<?php
include_once '../model/Reader.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $readerData = json_decode($_POST['data']);
    $method = $readerData->method;
} else {
    $method = $_GET['method'];
}

switch ($method) {
    case "readAll":
        readAll();
        break;
    case "create":
        create($readerData);
        break;
    case "update":
        update($readerData);
        break;
    case "delete":
        delete($readerData);
        break;
}

function readAll() {
    $reader = new Reader();
    $readers = $reader->readAll($reader->tableName);
    $readersArr = array();
    $count = $readers->num_rows;

    for ($i = 0; $i < $count; $i++) {
        $row = $readers->fetch_array();
        $readersArr[] = $row;
    }
    echo json_encode($readersArr, JSON_UNESCAPED_UNICODE);
}

function create($readerData) {
    $reader = new Reader();

    if ( (!empty($readerData->surname)) &&
        (!empty($readerData->name)) &&
        (!empty($readerData->dayB)) &&
        (!empty($readerData->monthB)) &&
        (!empty($readerData->yearB)) &&
        (!empty($readerData->address)) &&
        (!empty($readerData->phone)) &&
        (!empty($readerData->email)) ) {

        $reader->idReader = (int)$readerData->id;
        $reader->surname = $readerData->surname;
        $reader->name = $readerData->name;
        $reader->dayB = (int)$readerData->dayB;
        $reader->monthB = (int)$readerData->monthB;
        $reader->yearB = (int)$readerData->yearB;
        $reader->address = $readerData->address;
        $reader->phone = $readerData->phone;
        $reader->email = $readerData->email;

        if ($reader->createReader()) {
            echo "Новый читатель добавлен"; 
            exit();
        } else {
            echo "Что-то пошло не так...";
            }
        }
    else {
        echo "Поверьте, все ли данные заполнены";
    }
}

function update($readerData) {
    $reader = new Reader();
    $reader->idReader = (int)$readerData->id;
    $reader->name = $readerData->name;
    $reader->surname = $readerData->surname;
    $reader->dayB = (int)$readerData->dayB;
    $reader->monthB = (int)$readerData->monthB;
    $reader->yearB = (int)$readerData->yearB;
    $reader->address = $readerData->address;
    $reader->phone = $readerData->phone;
    $reader->email = $readerData->email;

    if ($reader->updateReader()) {
        echo "Данные успешно обновлены";
        exit();
    } else {
        echo "Что-то пошло не так с обновлением данных...";
    }
}

function delete($readerData) {
    $reader = new Reader();
    $reader->id = $readerData->idReader;

    if( $reader->deleteRowUsingID($reader->tableName, $reader->id)) {
        echo "Читатель удалён.";
    } else {
        echo "Не удалён.";
    }
}
?>
