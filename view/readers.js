function createTableReaders(data) {
    cleanDivMain();
    createDivMain();
 
    var buttonCreateReader = document.createElement("button");
    buttonCreateReader.classList.add("buttonCreateReader");
    buttonCreateReader.innerHTML="Добавить нового читателя";
    document.getElementById('divMain').append(buttonCreateReader);

    buttonCreateReader.onclick= function() {
        return formCreateUpdateDeleteReader(); 
    }
   
    var divTableReaders = document.createElement("div");
    divTableReaders.classList.add("divTableReaders");
    document.getElementById('divMain').append(divTableReaders);
  
    var tableReaders ="<table class='tableReaders' id='tableReaders' border='1'>"
    +"<tr>"
        +"<th>Номер</th>"
        +"<th>Фамилия</th>"
        +"<th>Имя</th>"
        +"<th>Дата рождения</th>"
        +"<th>Адрес</th>"
        +"<th>Телефон</th>"
        +"<th>Эмейл</th>"
        +"<th>Изменить</th>"
    +"</tr>";
    for(x in data) {
    tableReaders+="<tr onclick = 'updateDeleteReader(this)'>"
        +"<td>"+data[x].id+"</td>"
        +"<td>"+data[x].surname+"</td>"
        +"<td>"+data[x].name+"</td>"
        +"<td>"+convertDate(data[x].birthday)+"</td>"
        +"<td>"+data[x].address+"</td>"
        +"<td>"+data[x].phone+"</td>"
        +"<td>"+data[x].email+"</td>"
        +"<td class='idUpdate'>Изменить</td>"
        +"</tr>";
    }
    +"</table>";
    divTableReaders.innerHTML = tableReaders;
}

function formCreateUpdateDeleteReader(id ='', surname ='', name='', dayB='',
    monthB ='Выбрать месяц', yearB ='', address ='', phone='', email= '') {
	var divFormCreateReader = document.createElement("div");
   	divFormCreateReader.classList.add("divFormCreateReader");
	divFormCreateReader.id = 'divFormCreateReader';
	document.getElementById('divMain').append(divFormCreateReader);
	
	var formCreateReader = "<div id='divForm'>"
		+"<button class='btnCloseForm' onclick= divMain.removeChild(document.getElementById('divFormCreateReader'))>Закрыть</button>"
	     	+"<form id='formCreateUpdateReader'><table>"
       		+"<tr style='visibility:hidden';><td>Номер</td>"
        	+"<td><input type='text' name='id' value ='"+id+"' required></input></td></tr>"
    		+"<tr><td>Фамилия</td>"
		+"<td><input type='text' name='surname' value ='"+surname+"' required></input></td></tr>"
		+"<tr><td>Имя</td>"
		+"<td><input type='text' name='name' value ='"+name+"' required></input></td></tr>"
		+"<tr><td>День рождения</td>"
		+"<td><input type='number' min=1 max=31 name='dayB' value ='"+dayB+"' required></input></td></tr>"
		+"<tr><td>Месяц рождения</td>"
		+"<td><select name='monthB' required>"
			+"<Option value='"+monthB+"'>"+monthB+"</Option>"
			+"<Option value='01'>январь</Option>"
			+"<Option value='02'>февраль</Option>"
			+"<Option value='03'>март</Option>"
			+"<Option value='04'>апрель</Option>"
			+"<Option value='05'>май</Option>"
			+"<Option value='06'>июнь</Option>"
			+"<Option value='07'>июль</Option>"
			+"<Option value='08'>август</Option>"
			+"<Option value='09'>сентябрь</Option>"
			+"<Option value='10'>октябрь</Option>"
			+"<Option value='11'>ноябрь</Option>"
			+"<Option value='12'>декабрь</Option>"
			+"</select></td></tr>"
		+"<tr><td>Год рождения</td>"
		+"<td><input type='text' name='yearB' value ='"+yearB+"' required></input></td></tr>"
       		+"<tr><td>Адрес</td>"
		+"<td><input type='text' name='address' value ='"+address+"' required ></input></td></tr>"
	    	+"<tr><td>Телефон</td>"
		+"<td><input type='text' name='phone' value= '"+phone+"' required ></input></td></tr>"
	    	+"<tr><td>Почта</td>"
		+"<td><input type='email' name='email'value ='"+email+"' required ></input></td></tr></table>"
       		+"<button class='btnCreateReader' id='butCreateReader'type='button' onclick = 'createReader()'"
	    	+"'>Добавить нового читателя</button>"
		+"</form>"
		+"</div>";
	divFormCreateReader.innerHTML = formCreateReader;
};

function getFormReaderData($method) {
    var reader = {
	method:$method,        
	id:document.forms["formCreateUpdateReader"]["id"].value,    
	surname:document.forms["formCreateUpdateReader"]["surname"].value,
	name:document.forms["formCreateUpdateReader"]["name"].value,
	dayB:document.forms["formCreateUpdateReader"]["dayB"].value,
	monthB:document.forms["formCreateUpdateReader"]["monthB"].value,
	yearB:document.forms["formCreateUpdateReader"]["yearB"].value,
	address:document.forms["formCreateUpdateReader"]["address"].value,
	phone:document.forms["formCreateUpdateReader"]["phone"].value,
	email:document.forms["formCreateUpdateReader"]["email"].value
   };
return JSON.stringify(reader);
};

function createReader() {
    var newReader = getFormReaderData("create");
    zaprosPostAjax("../controllers/ReaderController.php", newReader);
    zaprosGetAjax("../controllers/ReaderController.php"+'?'+'method=readAll', createTableReaders);
}

function updateDeleteReader(tr) {
    var indexReader = tr.rowIndex; // номер строки 
    var table = document.getElementById('tableReaders');
    var dataReader = {
        id: table.rows[indexReader].cells[0].innerHTML,
        surname: table.rows[indexReader].cells[1].innerHTML,
        name: table.rows[indexReader].cells[2].innerHTML,
        dayB: table.rows[indexReader].cells[3].innerHTML.substr(0,2),
        monthB: table.rows[indexReader].cells[3].innerHTML.substr(3,3),
        yearB: table.rows[indexReader].cells[3].innerHTML.substr(8,11),
        address: table.rows[indexReader].cells[4].innerHTML,
        phone: table.rows[indexReader].cells[5].innerHTML,
        email: table.rows[indexReader].cells[6].innerHTML
    }

 formCreateUpdateDeleteReader(dataReader.id, dataReader.surname, dataReader.name,
        dataReader.dayB, dataReader.monthB, 
        dataReader.yearB, dataReader.address, 
        dataReader.phone, dataReader.email);
 
        document.getElementById('butCreateReader').style.visibility='hidden';
   
    	var buttonDeleteReader =document.createElement("button");
    	buttonDeleteReader.classList.add("btnDeleteReader");
    	buttonDeleteReader.innerHTML='Удалить читателя';
    	document.getElementById("divFormCreateReader").append(buttonDeleteReader);
   	buttonDeleteReader.onclick = function() {
   	var idReaderAndMethod= {
        	method:"delete",
        	idReader:document.forms["formCreateUpdateReader"]["id"].value
    }; 
idReaderAndMethod = JSON.stringify(idReaderAndMethod);
if(confirm("Вы уверены, что хотите удалить данного читателя?")
    == true) {  
	zaprosPostAjax('../controllers/ReaderController.php', idReaderAndMethod);    
	zaprosGetAjax('../controllers/ReaderController.php'+'?'+'method=readAll', createTableReaders);
	}
}
   	var buttonUpdateReader = document.createElement("button");
    	buttonUpdateReader.classList.add("btnUpdateReader");
    	buttonUpdateReader.innerHTML='Редактировать читателя';
    	document.getElementById("divFormCreateReader").append(buttonUpdateReader)
    	buttonUpdateReader.onclick = function() {
        var readerData = getFormReaderData("update");
        zaprosPostAjax('../controllers/ReaderController.php', readerData);
        zaprosGetAjax('../controllers/ReaderController.php'+'?'+'method=readAll', createTableReaders);
    }   
}
