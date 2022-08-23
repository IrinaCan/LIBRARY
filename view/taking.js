////// "раздел" для работы с выдачами книг //////////////
///////////////////////////////////////////////////////

// создание таблицы с выдачами книг
function createTableTaking(data) {
    cleanDivMain();
    createDivMain();
    // кнопка "Добавить новую выдачу"
    var buttonCreateTaking = document.createElement("button");
    buttonCreateTaking.classList.add("buttonCreateTaking");
    buttonCreateTaking.innerHTML = "Оформить выдачу книги";
    document.getElementById('divMain').append(buttonCreateTaking);

    buttonCreateTaking.onclick= function() {
        return formCreateTaking();  // форма для создании выдачи
   
    }
    // блок для таблицы с выдачами
    var divTableTaking = document.createElement("div");
    divTableTaking.classList.add("divTableTaking");
    document.getElementById('divMain').append(divTableTaking);

    // создание таблицы с выдачами    
    var tableTaking ="<table class='tableTaking' id='tableTaking' border='1'>"
    +"<tr>"
        +"<th>Номер выдачи</th>"
        +"<th>Дата выдачи</th>"
        +"<th>Читатель</th>"
        +"<th>Книга</th>"
        +"<th>Дата возврата</th>"
        +"<th>Отметить возврат</th>"
    +"</tr>";
    for(x in data) {
    tableTaking+="<tr onclick = 'changeStatus(this)'>"
        +"<td>"+data[x].id+"</td>"
        +"<td>"+convertDate(data[x].dateTake)+"</td>"
        +"<td>"+data[x].readerSurname+" "+data[x].readerName+"</td>"
        +"<td>"+data[x].surname+" "+data[x].name+" "
        +data[x].lastname+"<br> \"" +data[x].title+"\"</td>"
        +"<td>"+convertDate(data[x].dateGive)+"</td>";
    if(convertDate(data[x].given) == '00. 00. 0000'){
        var textChange ='На руках';
        var colorTdChange = 'orangered';     
        }
            else { 
                var textChange='Возврат<br>'+convertDate(data[x].given);
               var colorTdChange = 'rgb(179, 235, 95)';         
   } 
   tableTaking+="<td id='tdChange'class='tdChange' "
   +"style='background:"+colorTdChange+"';>"+textChange+"</td></tr>";
}
    +"</table>";
    divTableTaking.innerHTML = tableTaking;
}

// изменить статус книги - установить отметку о возврате книги
function changeStatus(tr) {
    var indexTaking = tr.rowIndex; // номер строки 
    var table = document.getElementById('tableTaking');
    var today = todayDate(); // создать "сегодняшнюю" дату
    var dataForChange = {
        method:"changeInLibr",
        idTaking:table.rows[indexTaking].cells[0].innerHTML,
        day:today.substr(0,2),
        month:today.substr(3,2),
        year:today.substr(6,9)
        };
    var dataForChange =  JSON.stringify(dataForChange); 
if(confirm("Отметить возврат книги?")==true) {  
zaprosPostAjax('../controllers/TakingController.php', dataForChange);  

zaprosGetAjax('../controllers/TakingController.php'+'?'+'method=readAll', createTableTaking);    
}
}


// создать форму для добавления новой выдачи книги
function formCreateTaking() {
	var divFormCreateTaking = document.createElement("div");
	divFormCreateTaking.classList.add("divFormCreateTaking");
	divFormCreateTaking.id = 'divFormCreateTaking';
	document.getElementById('divMain').append(divFormCreateTaking);
	
	var formCreateTaking = "<div id='divForm'>"
	+"<button class='btnCloseForm' onclick= divMain.removeChild(document.getElementById('divFormCreateTaking'))>Закрыть</button>"
	    // форма
    +"<form id='formCreateTaking'><table>"
        +"<tr><td>Дата выдачи</td>"
        +"<td><input type='text' name='dateTake' value ='"+todayDate()+"' required></input></td></tr>"
    	+"<tr><td>Читатель</td>"
		+"<td><select id ='selectAllReaders' name='selectAllReaders'>"
        +"<Option>Выбор читателя</Option>"
        +"</select></td></tr>"
		+"<tr><td>Книга</td>"
        +"<td><select id ='selectBooksInLibr' name='selectBooksInLibr'>"
        +"<Option value=''> Книги в наличии</Option>"
        +"</select></td></tr>"
		+"<tr><td>Дата возврата</td>"
		+"<td><input type='date' name='dateGive' required></input></td></tr></table>"
        +"<button type='button' class='btnCreateTaking' onclick='createTaking()'"
    +"'>Добавить выдачу книги</button>"	
	+"</form>"
	+"</div>";
  
divFormCreateTaking.innerHTML = formCreateTaking;
makeSelectAllReaders(); // получение списка читателей
// получение книг, доступных для выдачи (все книги минус книги "на руках")
makeSelectBooksInLibr(); 
};

// получение всех читателей и вывод из в select
function makeSelectAllReaders() {
        zaprosGetAjax('../controllers/ReaderController.php'+'?'+'method=readAll', 
    function(data) {
        for (x in data) {
        var selectAllReaders = document.getElementById('selectAllReaders');
        selectAllReaders.innerHTML+=
        "<option value='"+data[x].id+"'>"+ data[x].surname+" "+data[x].name
        +"</option>"
        }
    })
}
// получение книг, доступных для выдачи (все книги минус книги "на руках")
     function makeSelectBooksInLibr() {
        zaprosGetAjax('../controllers/BookController.php'+'?'+'method=readInLibr', 
    function(data) {
        for (x in data) {
        var selectBooksInLibr = document.getElementById('selectBooksInLibr');
        selectBooksInLibr.innerHTML+=
        "<option value='"+data[x].id+"'>"+data[x].surname+" "+data[x].name+" "
        +data[x].lastname+"<br> \"" +data[x].title+"\"</option>"
        }
    })
}
 // отправка данных о новой выдачи
function createTaking() {
    var dateTake = document.forms["formCreateTaking"]["dateTake"].value;
    var taking = {
        method:"create",
        day:dateTake.substr(0,2),
        month:dateTake.substr(3,4),
        year:dateTake.substr(6,9),
        idReader:document.forms["formCreateTaking"]["selectAllReaders"].value,
        idBook:document.forms["formCreateTaking"]["selectBooksInLibr"].value,
        dateGive:document.forms["formCreateTaking"]["dateGive"].value
    };
var newTaking =  JSON.stringify(taking);
zaprosPostAjax('../controllers/TakingController.php', newTaking);
zaprosGetAjax('../controllers/TakingController.php'+'?'+'method=readAll', createTableTaking);    
}