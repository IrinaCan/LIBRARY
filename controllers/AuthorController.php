<?php
include_once '../model/Author.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') { 
    $authorData = json_decode($_POST['data']);
    $method = $authorData->method;
} else {
    $method = $_GET['method'];
    }

switch ($method) {
    case "readAll":
        readAll();
        break;
    case "create":
        create($authorData);
        break;
}

function readAll() {
    $author = new Author();
    $authors = $author->readAll($author->tableName);
    $data = array();
    $count = $authors->num_rows;

    for ($i = 0; $i < $count; $i++) {
	    $row = $authors->fetch_array();
        $data[] = $row;
    }
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
}

function create($authorData) {
    $author = new Author();

    if ( (!empty($authorData->surname)) && 
        (!empty($authorData->name)) && 
        (!empty($authorData->lastname)) ) {
            
        $author->surname = $authorData->surname;
        $author->name = $authorData->name;
        $author->lastname = $authorData->lastname;

        if ($author->createAuthor()) {
         echo "Новый автор добавлен";
            exit();
        } else {
            echo "Автор не добавлен";
        } 
    } else {
        echo "Проверьте заполнение данных"; 
    }
}
























?>