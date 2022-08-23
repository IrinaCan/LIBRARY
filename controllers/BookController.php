<?php
include_once '../model/Book.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $bookData = json_decode($_POST['data']);
    $method = $bookData->method;
} else {
    $method = $_GET['method'];
}

switch ($method) {
    case "readAll":
        readAll();
        break;
    case "create":
        create($bookData);
        break;
    case "delete":
        delete($bookData);
        break;
    case "readInLibr":
        readAllInLibr();
        break;
    case "changeInLibr":
        a($bookData);
        break;
}

function readAll() {
    $book = new Book();
    $books = $book->readAll($book->tableName);
    $data = array();
    $count = $books->num_rows;

    for ($i = 0; $i < $count; $i++) {
        $row = $books->fetch_array();
        $data[] = $row;
    }
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
}

function create($bookData) {
    $book = new Book();

    if ( (!empty($bookData->idAuthor)) && 
        (!empty($bookData->title)) && 
        (!empty($bookData->idGenre)) && 
        (!empty($bookData->idHouse)) ) {
      // print_r(!empty($bookData->idGenre)); exit();
        $book->idAuthor = htmlspecialchars((int)$bookData->idAuthor);
        $book->title = htmlspecialchars($bookData->title);
        $book->idGenre = htmlspecialchars((int)$bookData->idGenre);
        $book->idHouse = htmlspecialchars((int)$bookData->idHouse);

        if ($book->createBook()) {
            echo "Ура!!! Новая книга добавлена";
            exit();
        }
        else echo "Не добавлена...";
        }
    else echo "Проверьте, все ли данные введены"; 
}

function delete($bookData) {
    $book = new Book();

    if ($book->deleteRowUsingId($book->tableName, $bookData->id)) {
        echo "Книга удалена";
        exit();
    } else {
        echo "Книга не удалена";
    }
}

function readAllInLibr() {
    $book = new Book();
    $books = $book->readBooksInLibr($book->tableName);
    $data = array();
    $count = $books->num_rows;
    
    for($i = 0; $i < $count; $i++) {
	    $row = $books->fetch_array();
        $data[] = $row;
    }
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
}
?>