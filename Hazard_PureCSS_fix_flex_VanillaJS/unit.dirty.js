/*ЗАМЕНИТЬ there_is_unsynchronized_data = true; НА ДОБАВЛЕНИЕ КЛАССА*/
/*ЗАМЕНИТЬ there_is_unsynchronized_data = false; НА УДАЛЕНИЕ КЛАССА*/

var login_from_storage = null; /*убрать нахрен!!!!!!!!!!!!!!!!!!!*/
if (isStorageSupport === "true") {
	if (isLoginDone === "true") {
		login_from_storage = localStorage.getItem("login");
	}
}
var isStorageSupport = false;
var isLoginDone = false;
var isAdmin = false;
var isModer = false;
var isUser = true; /*чек проверяется при отображении объектов ТОЛЬКО для юзеров (типа списка их доков в навигации, рекламы какой-то, ...)*/
try {
	localStorage.setItem("isStorageSupport", true);
	isStorageSupport = localStorage.getItem("isStorageSupport");
	console.log(localStorage);
	isLoginDone = localStorage.getItem("isLoginDone");
	isAdmin = localStorage.getItem("isAdmin");
	isModer = localStorage.getItem("isModer");
	isUser = localStorage.getItem("isUser");
} catch {
	console.log("LocalStorage is not supported");
}

/*var isAdmin = true;*/


var curr_user = null;
var there_is_unsynchronized_data = false;

var Unit = function(mail, login, password, surname, name, firstname) {

	this._typeofObj = "Unit";
	curr_user = this; /*добавление ссылки на конретного юзера в curr_user*/

	if (arguments.length === 0) { /*new User()*/
		/*используется для Temp */

		this._id = null;
		this._level = "user"
		this._mail = null;
		this._login = null;
		this._password = null;
		this._surname = null;
		this._name = null;
		this._firstname = null;
		this._docList = new Array(); /*doclist - отдельный для каждого юзера*/

		myLocalStorage.prototype.synchronizeAllData(); /* добавление юзера в общий список на локально */

	} else if (arguments.length === 1) { /*new User(obj)*/
		/*используется при лог ин и при стартовом парсе с хранилищ*/

		var obj = arguments[0];

		this._id = obj._id; /*солить айдишник тоже*/
		this._level = obj._level;
		console.log(this._level);
		this._mail = obj._mail;
		this._login = obj._login;
		this._password = obj._password;
		this._surname = obj._surname;
		this._name = obj._name;
		this._firstname = obj._firstname;
		this._docList = new Array();
		for (var i = 0; i < obj._docList.length; i++) {
			this._docList.push(new Doc(obj._docList[i]));
		}

	} else if (arguments.length > 1) { /*new User(mail, login...)*/
		/*используется только при регистрации*/

		this._id = Unit.prototype.getNextId();
		this._level = "user";
		this._mail = mail;
		this._login = login;
		this._password = password;
		this._surname = surname;
		this._name = name;
		this._firstname = firstname;
		this._docList = new Array();

		myLocalStorage.prototype.synchronizeAllData(); /* добавление юзера в общий список на локально */
		Server.prototype.synchronizeAllData(); /* добавление юзера в общий список на сервере */
	}

	if (isAdmin || isModer) {
		Unit.prototype.userList.push(this); /* добавление юзера в общий список объективизированный */
	}
	return this;
}

if (isAdmin || isModer) {
	Unit.prototype.userList = new Array(); /* новый общий список объективизированный */
}
Unit.prototype._next_id = 0;
Unit.prototype.getNextId = function() {
	var next_id;
	try {
		next_id = Server.prototype.getNextId();
		if (!next_id) { throw new Error; }
	} catch { throw new Error("Can not set new id 😣"); }
	Server.prototype.setNextId(++next_id);
	return next_id;
}
Unit.prototype.getId = function() {
	return this._id;
}
Unit.prototype.getLevel = function() {
	return this._level;
}
Unit.prototype.setLevel = function(value) {
	/* ЗДЕСЬ ТИПА ПРОВЕРКУ if (isAdmin || isModer) { */
	this._level = value;
	myLocalStorage.prototype.synchronizeAllData();
	there_is_unsynchronized_data = true;
	/* Server будет синхрониться только по кнопке, которая отображается в пользовательском меню, которое генирируется if loginIsDone; и при окончательном завершении редактирования документа (закрытие страницы, переход по любой из ссылок (= в т. ч. выход из профиля))*/
}
Unit.prototype.getMail = function() {
	return this._mail;
}
Unit.prototype.setMail = function(value) {
	this._mail = value;
	myLocalStorage.prototype.synchronizeAllData();
	there_is_unsynchronized_data = true;
}
Unit.prototype.getLogin = function() {
	return this._login;
}
Unit.prototype.setLogin = function(value) {
	this._login = value;
	myLocalStorage.prototype.synchronizeAllData();
	there_is_unsynchronized_data = true;
}
Unit.prototype.getPassword = function() {
	return this._password;
}
Unit.prototype.setPassword = function(value) {
	this._password = value;
	myLocalStorage.prototype.synchronizeAllData();
	there_is_unsynchronized_data = true;
}
Unit.prototype.getSurname = function() {
	return this._surname;
}
Unit.prototype.setSurname = function(value) {
	this._surname = value;
	myLocalStorage.prototype.synchronizeAllData();
	there_is_unsynchronized_data = true;
}
Unit.prototype.getName = function() {
	return this._name;
}
Unit.prototype.setName = function(value) {
	this._name = value;
	myLocalStorage.prototype.synchronizeAllData();
	there_is_unsynchronized_data = true;
}
Unit.prototype.getFirstname = function() {
	return this._firstname;
}
Unit.prototype.setFirstname = function(value) {
	this._firstname = value;
	myLocalStorage.prototype.synchronizeAllData();
	there_is_unsynchronized_data = true;
}
Unit.prototype.getDocList = function() {
	return this._doclist;
}
Unit.prototype.setDocList = function(value) {
	this._doclist = value;
	myLocalStorage.prototype.synchronizeAllData();
	there_is_unsynchronized_data = true;
}

var Doc = function(is_main_doc, title, url_to_open, doc_org_name, doc_user_id) {

	if (arguments.length === 0) { /*new Doc()*/

		this.is_main_doc = null; /*true*/
	    this.title = null; /*Док 1*/
	    this.url_to_open = null; /*user-doc-main*/
	    /* данные, которые подгружаются при открытии */
	    this.doc_org_name = null; /*Совхоз 2*/
	    this.doc_user_id = null; /*324*/

    } else if (arguments.length === 1) { /*new Doc(obj)*/

		var obj = arguments[0];

		this.is_main_doc = obj.is_main_doc; /*true*/
	    this.title = obj.title; /*Док 1*/
	    this.url_to_open = obj.url_to_open; /*user-doc-main*/
	    /* данные, которые подгружаются при открытии */
	    this.doc_org_name = obj.doc_org_name; /*Совхоз 2*/
	    this.doc_user_id = obj.doc_user_id; /*324*/

	} else if (arguments.length > 1) { /*new Doc(mail, is_main_doc, title...)*/

		this.is_main_doc = is_main_doc; /*true*/
	    this.title = title; /*Док 1*/
	    this.url_to_open = url_to_open; /*user-doc-main*/
	    /* данные, которые подгружаются при открытии */
	    this.doc_org_name = doc_org_name; /*Совхоз 2*/
	    this.doc_user_id = doc_user_id; /*324*/

	}

	return this;
}
/* ---------------Server--------------- */
var Server = function() {}

Server.prototype.getNextId = function() {
	/*временная логика для оффлайн*/
	if (isStorageSupport) {
		return localStorage.getItem("nextIdOnServer");
	} else { console.log("LocalStorage is not supported."); throw new Error; }
	/*/временная логика для оффлайн*/
}
Server.prototype.setNextId = function(value) {
	/*временная логика для оффлайн*/
	if (isStorageSupport) {
		localStorage.setItem("nextIdOnServer", value);
	} else { console.log("LocalStorage is not supported."); throw new Error; }
	/*/временная логика для оффлайн*/
}
Server.prototype.synchronizeAllData = function() {
	if (isAdmin || isModer) {
		/*Server.prototype._synchronizeOneUserData(curr_user);*/
		/*можно синхронизировать не полностью, чтоб не перезаписывать весь список, а только изменять или добавлять данные одного пользователя, НО тогда нужно обновлять после каждого внесенного изменения*/
		/*Server.prototype.setAllUnitsFromList();*/
		Server.prototype.setAllUnitsFromLocal();
		there_is_unsynchronized_data = false;
	} else if (isLoginDone) {
		Server.prototype._synchronizeOneUserData(curr_user); /*на сервере нет отдельно curr_user*/
		there_is_unsynchronized_data = false;
	} else { /* if Temp */
		console.log("By working with temporary data, synchronizing with server is not supported.");
	}
};
Server.prototype.getAllData = function() {
	var answer = "";
	if (isAdmin || isModer) {
		answer = Server.prototype._getNobjectivizeAllUnits();
	} else if (isLoginDone) {
		answer = Server.prototype.logInCurrUnit(); /*на сервере нет отдельно curr_user*/
	} else { /* if Temp */
		console.log("By working with temporary data, synchronizing with server is not supported.");
		answer = "error";
	}
	return answer;
};

/*Server.prototype.setAllUnitsFromList = function() {
	/временная логика для оффлайн/
	if (isStorageSupport) {
		localStorage.setItem("userListOnServer", JSON.stringify(Unit.prototype.userList));
	} else { console.log("LocalStorage is not supported."); }
	/временная логика для оффлайн/
}*/

Server.prototype.setAllUnitsFromLocal = function() {
	/*временная логика для оффлайн*/
	if (isStorageSupport) {
		localStorage.setItem("userListOnServer", localStorage.getItem("userListOnLocal"));
	} else { console.log("LocalStorage is not supported."); }
	/*временная логика для оффлайн*/
}

Server.prototype._getNobjectivizeAllUnits = function() {
	/*временная логика для оффлайн*/
	if (isStorageSupport) {
		try {
			var userListOnServer = localStorage.getItem("userListOnServer");
			if (userListOnServer) {
				JSON.parse(userListOnServer, function(key, value) {
					 if (this._typeofObj === "Unit") { new Unit(this); console.log("создан распарсенный юнит"); }
				});
			} else throw new Error();
		} catch { return "error"; }
		return "success";
	} else { console.log("LocalStorage is not supported."); return "error"; }
	/*/временная логика для оффлайн*/
}

Server.prototype.logInCurrUnit = function(curr_login, curr_password) {
	/*временная логика для оффлайн*/
	if (isStorageSupport) {
		try {
			var userListOnServer = localStorage.getItem("userListOnServer");
			if (userListOnServer) {
				JSON.parse(userListOnServer, function(key, value) {
					 if ((this._typeofObj === "Unit") && (this._login === curr_login) && (this._password === curr_password)) {

					 	new Unit(this);

					 	console.log("login succesful");
					 	isLoginDone = true;
					 	localStorage.setItem("isLoginDone", true);

					 	if (this._level === "admin") { isAdmin = true; isModer = false; isUser = false; }
					 	else if (this._level === "moder")  { isAdmin = false; isModer = true; isUser = false; }
					 	else { isAdmin = false; isModer = false; isUser = true; }

						localStorage.setItem("isAdmin", isAdmin);
						localStorage.setItem("isModer", isModer);
						localStorage.setItem("isUser", isUser);
					 }
				});
			} else throw new Error();
		} catch { return "error"; }
		return "success";
	} else { console.log("LocalStorage is not supported."); return "error"; }
	/*/временная логика для оффлайн*/
}
Server.prototype._synchronizeOneUserData = function(synth_user) {
	/*временная логика для оффлайн*/
	if (isStorageSupport) {
		var userListOnServer = localStorage.getItem("userListOnServer");
		if (userListOnServer) { /*не первый юзер*/
			console.log("не первый юзер");
			var userListOnServer_parsed = JSON.parse(userListOnServer);
			for (var i = 0; i < userListOnServer_parsed.length; i++) {
				if (userListOnServer_parsed[i]._id === synth_user._id) { userListOnServer_parsed.splice(i, 1); }
			}
			userListOnServer_parsed.push(synth_user);
			localStorage.setItem("userListOnServer", JSON.stringify(userListOnServer_parsed));
		} else { /*первый юзер*/
			console.log("первый юзер");
			temp_arr = new Array();
			temp_arr.push(synth_user);
			localStorage.setItem("userListOnServer", JSON.stringify(temp_arr));
		}
	} else { console.log("LocalStorage is not supported."); }
	/*/временная логика для оффлайн*/

	/*найти по логину
	если найден - перезаписать
	если не найден - добавить нового*/
};
Server.prototype.isUnitByMail = function(mail_value) {
	/*временная логика для оффлайн*/
	if (isStorageSupport) {
		try {
			var userListOnServer = localStorage.getItem("userListOnServer");
			if (userListOnServer) {
				JSON.parse(userListOnServer, function(key, value) {
					if ((this._typeofObj === "Unit") && (this._mail === mail_value)) {
						new Unit(this);
					}
				});
			} else { throw new Error(); }
		} catch { return false; }
		return true;
	} else { console.log("LocalStorage is not supported."); return false; }
	/*/временная логика для оффлайн*/
}
/* ---------------/Server--------------- */

/* ---------------myLocalStorage--------------- */
var myLocalStorage = function() {}

myLocalStorage.prototype.synchronizeAllData = function() { /*это не сервер, а именно локалка*/
	if (isAdmin || isModer) {
		myLocalStorage.prototype._synchronizeOneUserData(curr_user);
		/*синхронизируем не полностью, чтоб не перезаписывать весь список, а только изменять или добавлять данные одного пользователя*/
		/*myLocalStorage.prototype.setAllUnitsFromList(Unit.prototype.userList);*/
	} else if (isLoginDone) { /* if User */
		myLocalStorage.prototype._synchronizeOneUserData(curr_user); /*на сервере нет отдельно curr_user*/
	}
	if (isUser) { /* if User || Temp */
		if (isStorageSupport) {
			localStorage.setItem("curr_user_data", JSON.stringify(curr_user));
			/*отдельно curr_user есть локально у User || Temp, а у админа и модера нет*/
		} else { console.log("LocalStorage is not supported."); }
	}
	/*ДОБАВИТЬ СИНХРОНИЗАЦИЮ ПОЛЕЙ ISADMIN, ISMODER, ISUSER, ISLOGINDONE, there_is_unsynchronized_data*/
};

myLocalStorage.prototype._synchronizeOneUserData = function(synth_user) { /*это не сервер, а именно локалка*/
	if (isStorageSupport) {
		var userListOnLocal = localStorage.getItem("userListOnLocal");
		if (userListOnLocal) { /*не первый юзер*/
			console.log("не первый юзер");
			var userListOnServer_parsed = JSON.parse(userListOnLocal);
			for (var i = 0; i < userListOnServer_parsed.length; i++) {
				if (userListOnServer_parsed[i]._id === synth_user._id) { userListOnServer_parsed.splice(i, 1); }
			}
			userListOnServer_parsed.push(synth_user);
			localStorage.setItem("userListOnLocal", JSON.stringify(userListOnServer_parsed));
		} else { /*первый юзер*/
			console.log("первый юзер");
			temp_arr = new Array();
			temp_arr.push(synth_user);
			localStorage.setItem("userListOnLocal", JSON.stringify(temp_arr));
		}
	} else { console.log("LocalStorage is not supported."); }

	/*найти по логину
	если найден - перезаписать
	если не найден - добавить нового*/
};

myLocalStorage.prototype.getAllData = function() {
	if (isStorageSupport) {
		try {
			if (isAdmin || isModer) {
				var userListOnLocal = localStorage.getItem("userListOnLocal");
				if (userListOnLocal) {
					JSON.parse(userListOnLocal, function(key, value) {
						 if (this._typeofObj === "Unit") { new Unit(this); console.log("создан распарсенный юнит");}
					});
				} else throw new Error();
			} else if (isLoginDone) {

				var userListOnLocal = localStorage.getItem("userListOnLocal");
				if (userListOnLocal) {
					/*здесь типа LogInCurrUser */
				} else throw new Error();

				var curr_user_data = localStorage.getItem("curr_user_data");
				if (curr_user_data) {

				} else throw new Error();
				/*ДОБАВИТЬ ДВЕ ПОПЫТКИ ЧТЕНИЯ: ЛИСТ И CURR_USER, ЕСЛИ ИЗ ЛИСТА NULL*/

			} else {  /* if Temp - попытка чтения одна: с curr_user */

				var curr_user_data = localStorage.getItem("curr_user_data");
				if (curr_user_data) {
					JSON.parse(curr_user_data, function(key, value) {
						if (this._typeofObj === "Unit") { console.log("myLocalStorage.prototype.getAllData - "); curr_user = new Unit(this); console.log(curr_user); }
					});
				} else throw new Error();

			}
		} catch { return "error"; }
		return "success";
	} else { console.log("LocalStorage is not supported."); return "error"; }
}
/* ---------------/myLocalStorage--------------- */




/*
localStorage.clear();
localStorage.setItem("nextIdOnServer", 0);*/



/* iniziaisation */
/* в самом начале пытаться загрузить свежие данные с сервера. если не получилось, попытаться всять из локалки. если не получилось, создать нового юзера */


try {
	if (Server.prototype.getAllData() === "error") { console.log("Server.prototype.getAllData() === 'error') { throw new Error();"); throw new Error(); }
} catch {
	try {
		if (myLocalStorage.prototype.getAllData() === "error") { console.log("myLocalStorage.prototype.getAllData() === 'error') { throw new Error();"); throw new Error(); }
	} catch { /* new Local */ /* создание новой базы приложения в зависимости от того, кто инициализирует приложение */
		if (isAdmin) {
			var un = new Unit("admin_mail", "нулевой", "admin_password", "admin_surname", "admin_name", "admin_firstname");
			un.setLevel("admin");
		} else if (isModer) {
			var un = new Unit("moder_mail", "нулевой", "moder_password", "moder_surname", "moder_name", "moder_firstname");
			un.setLevel("moder");
		} else if (isLoginDone) {
			var un = new Unit("user_mail", "нулевой", "user_password", "user_surname", "user_name", "user_firstname");
		} else {  /* if Temp*/
			var un0 = new Unit();
			un0.setLogin("нулевой");
		}
	}
}


/*var un1 = new Unit("mail", "login", "password", "surname", "name", "firstname");
un1.setLevel("moder");
var un2 = new Unit("mail", "login", "password", "surname", "name", "firstname");
un2.setLogin("второй");*/


Server.prototype.synchronizeAllData();

try {
console.log(curr_user.userList);
} catch {}
console.log(localStorage.getItem("userListOnLocal"));
console.log(localStorage.getItem("userListOnServer"));

/* /iniziaisation */



myLocalStorage.prototype.logOut = function() { /*в логин добавить и в начало переменные*/
	isLoginDone = false;
	localStorage.setItem("isLoginDone", false);
	isAdmin = false;
	localStorage.setItem("isAdmin", false);
	isModer = false;
	localStorage.setItem("isModer", false);
	isUser = true;
	localStorage.setItem("isUser", true);
	Unit.prototype.userList = null;
	localStorage.setItem("userListOnLocal", null);
	curr_user = null;
	localStorage.setItem("curr_user_data", null);
	location.reload();
}
/*добавить подгрузку данных isAdmin islogin при инициализации*/

/*register = new Unit(mail, login...) = addNewUnit(user)
login = new Unit(obj) =  logInCurrUnit(curr_login, curr_password)
								ifAdmin setAdmin
								ifUser setUser*/








