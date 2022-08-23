// создание GET - запроса AJAX
// параметры функции - адрес контроллера - файла php 
// и функция, вызываемая для обработки пришедших данных

function zaprosGetAjax(url, chtoDelat) {
    var zapros = new XMLHttpRequest();
    zapros.onreadystatechange = function() {
        if(zapros.readyState==4 && zapros.status==200) {
            var data = JSON.parse(zapros.response);
            chtoDelat(data);
        }
    }
    zapros.open("GET", url );
    zapros.send();
}

// создание POST - запроса AJAX
// параметры функции - адрес контроллера - файла php 
// и передаваемые данные

function zaprosPostAjax(url, data) {
    var zapros = new XMLHttpRequest();
    zapros.onreadystatechange = function() {
        if(zapros.readyState == 4 && zapros.status == 200) {
			alert(zapros.response);
	    }
	};
    zapros.open("POST", url);
    zapros.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    zapros.send("data="+ data);	  
    } 

// функция для создания "сегодняшней" даты

function todayDate() {
    return new Date().toLocaleDateString();
}
  
// функция для "перевода" даты в формат "день. месяц. год"

function convertDate(incorrectData) {
    return incorrectData.substr(8,2)+". "+incorrectData.substr(5,2)
    +". "+incorrectData.substr(0,4)
}
 
// функция для "очищения страницы"

function cleanDivMain() {
    var parent = document.getElementById('divMain').parentNode; 
    var child = document.getElementById('divMain');
    parent.removeChild(child);
}

// функция для создания удалённого блока для новой вкладки

function createDivMain() {
    var divMain = document.createElement('div');
    divMain.id= 'divMain';
    document.getElementById('main').append(divMain);
}
