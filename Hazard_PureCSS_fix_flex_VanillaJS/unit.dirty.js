/*ЗАМЕНИТЬ there_is_unsynchronized_data_on_local = true; НА ДОБАВЛЕНИЕ КЛАССА*/
/*ЗАМЕНИТЬ there_is_unsynchronized_data_on_local = false; НА УДАЛЕНИЕ КЛАССА*/




/*localStorage.setItem("isFirstAdminLoading", true)*/




/*КАРОЧЕ УБРАТЬ ПРИСВОЕНИЕ CURR_USER*/
/*СДЕЛАТЬ ПРИСВОЕНИЕ КАРР ТОЛЬКО ПРИ ЛОГ ИН И ТРЫНДЕЦ*/
/*А ЮЗЕРА ДЛЯ ДОКОВ МОЖНО ОТДЕЛЬНО ПРИСВАИВАТЬ. ИЗ СПИСКА. ТАК, КАК В АРХИТЕКТУРЕ ПРОГОВАРИВАЛ. ТИПА ПО УМОЛЧАНИЮ КРАЙНИЙ, А ЕСЛИ КЛИК ПО КАКОМУ-ЛИБО ИТЕМУ дР ЮЗЕРА, ТО ПЕРЕХОд К НЕМУ*/



/*!!!!!!!!!при регистрации гнового дока или юзера не забывать присваивать ему уникальный id*/


/*во время работы с электроном можно обработать событие закрытия окна и засинхронить данные*/




/* если стоит галка при логине "запомнить"!!!! записать в локалстораге дату подгрузки страницы. при повторной загрузке сравнивать даты. если более двух суток, пытаться синхронить несинхроненное с сервером, затем чистить хранилище (ну по сути после попытки синхронизации выполнять лог аут и трындец) если не стоит галка "запомнить", то выкидывать через сутки бездействия */





var isStorageSupport = false;
var isLoginDone = false;
var isAdmin = false;
var isModer = false;
var isUser = true; /*чек проверяется при отображении объектов ТОЛЬКО для юзеров (типа списка их доков в навигации, рекламы какой-то, ...)*/
var there_is_unsynchronized_data_on_local = false;
var isFirstAdminLoading = false;
try {
	localStorage.setItem("isStorageSupport", true);
	isStorageSupport = localStorage.getItem("isStorageSupport");
	console.log(localStorage);
	isLoginDone = localStorage.getItem("isLoginDone");
	isAdmin = localStorage.getItem("isAdmin");
	isModer = localStorage.getItem("isModer");
	isUser = localStorage.getItem("isUser");
	there_is_unsynchronized_data_on_local = localStorage.getItem("there_is_unsynchronized_data_on_local");
	isFirstAdminLoading = localStorage.getItem("isFirstAdminLoading");
} catch (error) {
	console.log("LocalStorage is not supported");
}

if (isFirstAdminLoading === "true") {
	isAdmin = true;
}


var loged_in_user = null;
var viewing_user =  null; /*не синхронится с локалкой*/
var viewing_doc = null; /*скорее всего он бурет изменяться только через пользовательский интерфейс*/
var temp_user = null;



/* ------ Unit ------ */
var Unit = function(mail, login, password, surname, name, firstname) {

	this._typeofObj = "Unit";

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
		this._docList = new Array(); /*_docList - отдельный для каждого юзера*/

		myLocalStorage.prototype.synchronizeAllData(this); /* добавление temp'a в общий список на локально */

	} else if (arguments.length === 1) { /*new User(obj)*/
		/*используется при лог ин и при стартовом парсе с хранилищ*/
console.log("логин юзера или с сервера");
		var obj = arguments[0];

		this._id = obj._id; /*солить айдишник тоже*/
		this._level = obj._level;
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

		/*добавить ЛИ ЗДЕСЬ синхрон доков Temp юзера*/
	}

	return this;
}

if ((isAdmin === "true") || (isAdmin === true) || (isModer === "true") || (isModer === true)) {
	Unit.prototype.userList = new Array(); /* новый общий список объективизированный */
}

Unit.prototype.getNextId = function() {
	var next_id;
	try {
		next_id = Server.prototype.getNextId();
		if (!next_id) { throw new Error; }
	} catch (error) { throw new Error("Can not set new id 😣"); }
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
	/* ЗДЕСЬ ТИПА ПРОВЕРКУ if ((isAdmin === "true") || (isAdmin === true) || (isModer === "true") || (isModer === true)) { */
	this._level = value;
	this.userDataChanged777(this);
	/* Server будет синхрониться только по кнопке, которая отображается в пользовательском меню, которое генирируется if loginIsDone; и при окончательном завершении редактирования документа (закрытие страницы, переход по любой из ссылок (= в т. ч. выход из профиля))*/
}
Unit.prototype.getMail = function() {
	return this._mail;
}
Unit.prototype.setMail = function(value) {
	this._mail = value;
	this.userDataChanged777(this);
}
Unit.prototype.getLogin = function() {
	return this._login;
}
Unit.prototype.setLogin = function(value) {
	this._login = value;
	this.userDataChanged777(this);
}
Unit.prototype.getPassword = function() {
	return this._password;
}
Unit.prototype.setPassword = function(value) {
	this._password = value;
	this.userDataChanged777(this);
}
Unit.prototype.getSurname = function() {
	return this._surname;
}
Unit.prototype.setSurname = function(value) {
	this._surname = value;
	this.userDataChanged777(this);
}
Unit.prototype.getName = function() {
	return this._name;
}
Unit.prototype.setName = function(value) {
	this._name = value;
	this.userDataChanged777(this);
}
Unit.prototype.getFirstname = function() {
	return this._firstname;
}
Unit.prototype.setFirstname = function(value) {
	this._firstname = value;
	this.userDataChanged777(this);
}
Unit.prototype.getDocList = function() {
	return this._docList;
}
Unit.prototype.setDocList = function(value) {
	this._docList = value;
	this.userDataChanged777(this);
}
Unit.prototype.pushNewDocToList = function(value) {
	this._docList.push(value);
	this.userDataChanged777(this);
}

Unit.prototype.userDataChanged777 = function(obj) {
	myLocalStorage.prototype.synchronizeAllData(obj);
	there_is_unsynchronized_data_on_local = true;
	localStorage.setItem("there_is_unsynchronized_data_on_local", there_is_unsynchronized_data_on_local);
}

var Doc = function(is_main_doc, doc_title, doc_url_to_open, doc_org_name, doc_user_id) {

	if (arguments.length === 0) { /*new Doc()*/
	/*используется при создании нового unit, Temp или User*/

		this._doc_id = null;
		this._is_main_doc = null; /*true*/
	    this._doc_title = null; /*Док 1*/
	    this._doc_url_to_open = null; /*user-doc-main*/
	    /* данные, которые подгружаются при открытии */
	    this._doc_org_name = null; /*Совхоз 2*/
	    this._doc_user_id = null; /*324*/
	    this._doc_dataList = {};

    } else if (arguments.length === 1) { /*new Doc(obj)*/
	/*используется при лог ин и при стартовом парсе с хранилища*/
		var obj = arguments[0];

		this._doc_id = obj._doc_id;
		this._is_main_doc = obj._is_main_doc; /*true*/
	    this._doc_title = obj._doc_title; /*Док 1*/
	    this._doc_url_to_open = obj._doc_url_to_open; /*user-doc-main*/
	    /* данные, которые подгружаются при открытии */
	    this._doc_org_name = obj._doc_org_name; /*Совхоз 2*/
	    this._doc_user_id = obj._doc_user_id; /*324*/
	    this._doc_dataList = {};

	} else if (arguments.length > 1) { /*new Doc(mail, is_main_doc, doc_title...)*/
	/*используется при сборе данных с интерфейса при создании нового дока*/

		this._doc_id = Unit.prototype.getNextId();
		this._is_main_doc = is_main_doc; /*true*/
	    this._doc_title = doc_title; /*Док 1*/
	    this._doc_url_to_open = doc_url_to_open; /*user-doc-main*/
	    /* данные, которые подгружаются при открытии */
	    this._doc_org_name = doc_org_name; /*Совхоз 2*/
	    this._doc_user_id = doc_user_id; /*324*/
	    this._doc_dataList = {};

	}
	/*данные не при каких условиях не синхронизируются, потому что в чистом вире документ никогда не взаимодействует с юнитом, - только через докЛист*/
	return this;
}

Doc.prototype.getIsMainDoc = function() {
	return this._is_main_doc;
}
Doc.prototype.setIsMainDoc = function(value) {
	this._is_main_doc = value;
	this.userDataChanged777(this);
}
Doc.prototype.getDocTitle = function() {
	return this._doc_title;
}
Doc.prototype.setDocTitle = function(value) {
	this._doc_title = value;
	this.userDataChanged777(this);
}
Doc.prototype.getDocUrlToOpen = function() {
	return this._doc_url_to_open;
}
Doc.prototype.setDocUrlToOpen = function(value) {
	this._doc_url_to_open = value;
	this.userDataChanged777(this);
}
Doc.prototype.getDocOrgName = function() {
	return this._doc_org_name;
}
Doc.prototype.setDocOrgName = function(value) {
	this._doc_org_name = value;
	this.userDataChanged777(this);
}
Doc.prototype.getDocUserId = function() {
	return this._doc_user_id;
}
Doc.prototype.setDocUserId = function(value) {
	this._doc_user_id = value;
	this.userDataChanged777(this);
}
Doc.prototype.getDocDataList = function() {
	return this._doc_dataList;
}
Doc.prototype.setDocDataList = function(value) {
	this._doc_dataList = value;
	this.userDataChanged777(this);
}
Unit.prototype.getDocDataListItem = function(key) {
	return this.key;
}
Unit.prototype.setDocDataListItem = function(key, value) { /*без разницы заменить или добавить*/
	this._doc_dataList.key = value;
	this.userDataChanged777(this);
}

Unit.prototype.viewingUserChanged = function() {
	Server.prototype.synchronizeAllData();
}

/*ФУНКЦИЯ ADDDOC ПРОВЕРЯЕТ ПО ID ЕСТЬ ЛИ DOC,
	ЕСЛИ ЕСТЬ ТО ВЫЗЫВАЕТСЯ ФУНКЦИЯ ADDDOCDATAITEM, КОТОРАЯ ДОБАВЛЯЕТ/ОБНОВЛЯЕТ ПОЛЕ
	ЕСЛИ НЕТ, ТО ДОБАВЛЯЕТ НОВЫЙ DOC*/
/*ЕЩЕ БЫ ХОРОШО В НЕЙ ПРОВЕРКУ НОВИЗНЫ ИНФЫ СДЕЛАТЬ ИЛИ ВООБЩЕ ОТДАВАТЬ МЕРДЖИТЬ ЮЗЕРУ*/
/* ------ /Unit ------ */


/* ---------------Server--------------- */
var Server = function() {} /*синглтон*/

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

Server.prototype.getAllData = function() {
	/*временная логика для оффлайн*/
	if (isStorageSupport) {
		if ((isLoginDone === "true") || (isLoginDone === true)) {
			var userListOnServer = localStorage.getItem("userListOnServer");
			if (userListOnServer && (userListOnServer !== "null")) {
				var old_level = loged_in_user.getLevel();
				if ((isAdmin === "true") || (isAdmin === true) || (isModer === "true") || (isModer === true)) { Unit.prototype.userList.splice(0); }
				JSON.parse(userListOnServer, function(key, value) {
					 if (this._typeofObj === "Unit") {
					 	var temp_unit = new Unit(this);
					 	if (temp_unit.getId() === loged_in_user.getId()) {
					 		localStorage.setItem("loged_in_user_data", JSON.stringify(loged_in_user));
					 		viewing_user = loged_in_user;
					 		console.log("loged_in_user");
					 		console.log(loged_in_user);
					 		console.log("viewing_user");
					 		console.log(viewing_user);
					 		console.log("c server объективизирован unit");
					 		if ((isUser === "true") || (isUser === true)) {
					 			myLocalStorage.prototype.synchronizeAllData(temp_unit);
					 			return 1;
					 		}
					 	}
					 	if ((isAdmin === "true") || (isAdmin === true) || (isModer === "true") || (isModer === true)) {
						 	Unit.prototype.userList.push(temp_unit);
						 	console.log("c server создан распарсенный unit в список");
						 	myLocalStorage.prototype.synchronizeAllData(temp_unit);
						 	console.log("c server синхронизирован unit в localList");
						}
					}
				});
				if (loged_in_user.getLevel() === "admin") { isAdmin = true; isModer = false; isUser = false; }
				else if (loged_in_user.getLevel() === "moder")  { isAdmin = false; isModer = true; isUser = false; }
				else { isAdmin = false; isModer = false; isUser = true; }
				localStorage.setItem("isAdmin", isAdmin);
				localStorage.setItem("isModer", isModer);
				localStorage.setItem("isUser", isUser);
				if (old_level !== loged_in_user.getLevel()) { Server.prototype.getAllData(); console.log("Уровень доступа был изменен. Данные с server будут получены заново."); }
			} else throw new Error();

		} else { /* if Temp */ console.log("By working with temporary data, synchronizing with server is not supported."); throw new Error();	}
	} else { console.log("LocalStorage is not supported."); throw new Error(); }
	/*/временная логика для оффлайн*/
}

Server.prototype.synchronizeAllData = function() { /* на сервере, конечно, необходима проверка по новизне данных, чтоб грамотно мерджить, для этого, вероятно, потребуется записывать доп. поля с кэшем, который будет сравниваться. если проверка пройдена, все норм, если нет, сохранять в темп-дата и отправлять мерджинг пользователю или вовсе админу */
	if ((isAdmin === "true") || (isAdmin === true) || (isModer === "true") || (isModer === true)) {
		/*Server.prototype._synchronizeUserData();*/ /*синхронизация по умолчанию просматриваемого юзера*/
		/*можно синхронизировать не полностью, чтоб не перезаписывать весь список, а только изменять или добавлять данные одного пользователя, НО тогда нужно обновлять после каждого внесенного изменения*/
		if ((there_is_unsynchronized_data_on_local === "true") || (there_is_unsynchronized_data_on_local === true)) {
			Server.prototype.setAllUnitsFromLocal();
			there_is_unsynchronized_data_on_local = false;
			localStorage.setItem("there_is_unsynchronized_data_on_local", there_is_unsynchronized_data_on_local);
		}
	} else if ((isLoginDone === "true") || (isLoginDone === true)) {
		if ((there_is_unsynchronized_data_on_local === "true") || (there_is_unsynchronized_data_on_local === true)) {
			Server.prototype._synchronizeUserData(); /*синхронизация просматриваемого юзера*/
			there_is_unsynchronized_data_on_local = false;
			localStorage.setItem("there_is_unsynchronized_data_on_local", there_is_unsynchronized_data_on_local);
		}
	} else { /* if Temp */
		console.log("By working with temporary data, synchronizing with server is not supported.");
	}
};

Server.prototype.setAllUnitsFromLocal = function() {
	/*временная логика для оффлайн*/
	if (isStorageSupport) {
		localStorage.setItem("userListOnServer", localStorage.getItem("userListOnLocal"));
	} else { console.log("LocalStorage is not supported."); }
	/*временная логика для оффлайн*/
}

Server.prototype._synchronizeUserData = function(synth_user) {  /*не для Temp*/
	/*временная логика для оффлайн*/
	if (isStorageSupport) {
		if ((arguments.length === 0) || (!arguments[0])) {
			var synth_user = viewing_user;
		}
		var userListOnServer = localStorage.getItem("userListOnServer");
		if (userListOnServer && (userListOnServer !== "null")) { /*не первый юзер*/
			console.log("не первый юзер");
			var userListOnServer_parsed = JSON.parse(userListOnServer);
			for (var i = 0; i < userListOnServer_parsed.length; i++) {
				if (userListOnServer_parsed[i]._id === synth_user._id) { userListOnServer_parsed.splice(i, 1); }
			}
			userListOnServer_parsed.push(synth_user);
			localStorage.setItem("userListOnServer", JSON.stringify(userListOnServer_parsed));
		} else { /*первый юзер*/
			console.log("первый юзер");
			var temp_arr = new Array();
			temp_arr.push(synth_user);
			localStorage.setItem("userListOnServer", JSON.stringify(temp_arr));
		}
	} else { console.log("LocalStorage is not supported."); }
	/*/временная логика для оффлайн*/

	/*найти по логину
	если найден - перезаписать
	если не найден - добавить нового*/
};

Server.prototype.logInCurrUnit = function(curr_login, curr_password) {
	/*временная логика для оффлайн*/
	if (isStorageSupport) { /*если юзер вводил какие-то данные, то мы забираем эти данные и к ним добавляем новые РЕАЛИЗОВАТЬ С ПОМОЩЬЮ ФУНКЦИЙ ADDDOC ADDDOCDATAITEM пока что просто зануляю все*/
		/*ЗАдАВАТЬ ВОПРОС, СОХРАНИТЬ ЛИ ВРЕМЕННЫЕ ДАННЫЕ, КОТОРЫЕ БЫЛИ ВВЕДЕНЫ ДО ВХОДА?? ИЛИ ВХОДИТЬ В СТАРЫЙ АКК БЕЗ НОВЫХ ДАННЫХ*/
		if ((there_is_unsynchronized_data_on_local === "true") || (there_is_unsynchronized_data_on_local === true)) {
			there_is_unsynchronized_data_on_local = false;
			localStorage.setItem("there_is_unsynchronized_data_on_local", there_is_unsynchronized_data_on_local);
			localStorage.getItem("temp_user_data", null);
		}
		var userListOnServer = localStorage.getItem("userListOnServer");
		if (userListOnServer && (userListOnServer !== "null")) {
			JSON.parse(userListOnServer, function(key, value) {
				if ((this._typeofObj === "Unit") && (this._login === curr_login) && (this._password === curr_password)) {

					loged_in_user = new Unit(this);

					console.log("login succesful");
					isLoginDone = true;
					localStorage.setItem("isLoginDone", true);

					Server.prototype.getAllData();

					location.reload();
					
					return 1;
				 }
			});
			throw new Error();
		} else throw new Error();
	} else { console.log("LocalStorage is not supported."); throw new Error(); }
	/*/временная логика для оффлайн*/
}

Server.prototype.registerNewUnit = function(temp_mail_, temp_login_, temp_password_, temp_surname_, temp_name_, temp_firstname_) {
	/*временная логика для оффлайн*/
	if (isStorageSupport) { /*если юзер вводил какие-то данные, то мы забираем эти данные и к ним добавляем новые*/
		/*ЗАдАВАТЬ ВОПРОС, СОХРАНИТЬ ЛИ ВРЕМЕННЫЕ ДАННЫЕ, КОТОРЫЕ БЫЛИ ВВЕДЕНЫ ДО РЕГИСТРАЦИИ?? ИЛИ СОЗДАТЬ НОВЫЙ ЧИСТЫЙ АККАУНТ БЕЗ ДАННЫХ*/
		var temp_unit_ = null;
		if ((there_is_unsynchronized_data_on_local === "true") || (there_is_unsynchronized_data_on_local === true)) {
			JSON.parse(localStorage.getItem("temp_user_data"), function(key, value) {
				if (this._typeofObj === "Unit") { temp_unit_ = new Unit(this); }
			});
			there_is_unsynchronized_data_on_local = false;
			localStorage.setItem("there_is_unsynchronized_data_on_local", there_is_unsynchronized_data_on_local);
			localStorage.getItem("temp_user_data", null);
			temp_unit_.setMail(temp_mail_);
			temp_unit_.setLogin(temp_login_);
			temp_unit_.setPassword(temp_password_);
			if (temp_surname_) { temp_unit_.setSurname(temp_surname_); }
			if (temp_name_) { temp_unit_.setName(temp_name_); }
			if (temp_firstname_) { temp_unit_.setFirstname(temp_firstname_); }
		} else {
			temp_unit_ = new Unit(temp_mail_, temp_login_, temp_password_, temp_surname_, temp_name_, temp_firstname_);
		}
		Server.prototype._synchronizeUserData(temp_unit_);
	} else { console.log("LocalStorage is not supported."); throw new Error(); }
	/*/временная логика для оффлайн*/
}

/* ПРОВЕРЯЯЯЯЯЯЯЯЯЯЯЯТЬ это при регистрации, еще проверять при регистрации логин */ /* это проверяется при регистрации, а также при восстановлении пароля */


Server.prototype.isUnitByMail = function(mail_value) { /* это проверяется при восстановлении пароля */
	/*временная логика для оффлайн*/
	if (isStorageSupport) {
		var userListOnServer = localStorage.getItem("userListOnServer");
		if (userListOnServer && (userListOnServer !== "null")) {
			JSON.parse(userListOnServer, function(key, value) {
				if ((this._typeofObj === "Unit") && (this._mail === mail_value)) {
					return true;
				}
			});
			return false;
		} else { throw new Error(); }
	} else { console.log("LocalStorage is not supported."); throw new Error(); }
	/*/временная логика для оффлайн*/
}

Server.prototype.setNewUnitPassByMail = function(mail_value, password_value) { /* это проверяется при восстановлении пароля */
	/*временная логика для оффлайн*/
	if (isStorageSupport) {
		var userListOnServer = localStorage.getItem("userListOnServer");
		if (userListOnServer && (userListOnServer !== "null")) {
			JSON.parse(userListOnServer, function(key, value) {
				if ((this._typeofObj === "Unit") && (this._mail === mail_value)) {
					var temp_us = new User(this);
					temp_us.setPassword(password_value);
					Server.prototype._synchronizeUserData(temp_us);
					Server.prototype.logInCurrUnit(temp_us.getLogin(), temp_us.getPassword());
				}
			});
		} else { throw new Error(); }
	} else { console.log("LocalStorage is not supported."); throw new Error(); }
	/*/временная логика для оффлайн*/
}
/* ---------------/Server--------------- */

/* ---------------myLocalStorage--------------- */
var myLocalStorage = function() {} /*синглтон*/ /*это не сервер, а именно локалка*/

myLocalStorage.prototype.getAllData = function() {
	if (isStorageSupport) {
		if ((isAdmin === "true") || (isAdmin === true) || (isModer === "true") || (isModer === true)) {

			var userListOnLocal = localStorage.getItem("userListOnLocal");
			if (userListOnLocal && (userListOnLocal !== "null")) {
				JSON.parse(userListOnLocal, function(key, value) {
					 if (this._typeofObj === "Unit") { Unit.prototype.userList.push(new Unit(this)); console.log("c local создан распарсенный unit в список");}
				});
			} else throw new Error();
			/*считали список юзеров*/

			var loged_in_user_data = localStorage.getItem("loged_in_user_data");
			if (loged_in_user_data && (loged_in_user_data !== "null")) {
				JSON.parse(loged_in_user_data, function(key, value) {
					 if (this._typeofObj === "Unit") { loged_in_user = new Unit(this); viewing_user = loged_in_user; console.log("c local объективизирован admin/moder");}
				});
			} else throw new Error();
			/*объективизировали данные админа, с которыми выполнен вход*/

		} else if ((isLoginDone === "true") || (isLoginDone === true)) {

			var loged_in_user_data = localStorage.getItem("loged_in_user_data");
			if (loged_in_user_data && (loged_in_user_data !== "null")) {
				JSON.parse(loged_in_user_data, function(key, value) {
					 if (this._typeofObj === "Unit") { loged_in_user = new Unit(this); viewing_user = loged_in_user; console.log("c local объективизирован user");}
				});
			} else throw new Error();
			/*объективизировали данные юзера, с которыми выполнен вход*/

		} else {  /* if Temp - попытка чтения одна: с temp_user */

			var temp_user_data = localStorage.getItem("temp_user_data");
			if (temp_user_data && (temp_user_data !== "null")) {
				JSON.parse(temp_user_data, function(key, value) {
					if (this._typeofObj === "Unit") { temp_user = new Unit(this); viewing_user = temp_user; console.log("c local объективизирован temp"); }
				});
			} else throw new Error();
			/*объективизировали данные temp'а, кототрые он сохранил*/
		}
	} else { console.log("LocalStorage is not supported."); throw new Error(); }
}

myLocalStorage.prototype.setAllData = function() {

	if ((isAdmin === "true") || (isAdmin === true)) {
		loged_in_user = new Unit("admin_mail0", "admin_login0", "admin_password0", "admin_surname0", "admin_name0", "admin_firstname0");
		loged_in_user.setLevel("admin");
		localStorage.setItem("loged_in_user_data", JSON.stringify(loged_in_user));
		console.log("Создан новый стартовый admin.");

		viewing_user = loged_in_user;
		console.log("login succesful");
		isLoginDone = true;
		localStorage.setItem("isLoginDone", true);
	} else if ((isModer === "true") || (isModer === true)) {
		loged_in_user = new Unit("moder_mail0", "moder_login0", "moder_password0", "moder_surname0", "moder_name0", "moder_firstname0");
		loged_in_user.setLevel("moder");
		localStorage.setItem("loged_in_user_data", JSON.stringify(loged_in_user));
		console.log("Создан новый стартовый moder.");

		viewing_user = loged_in_user;
		console.log("login succesful");
		isLoginDone = true;
		localStorage.setItem("isLoginDone", true);
	} else if ((isLoginDone === "true") || (isLoginDone === true)) {
		loged_in_user = new Unit("user_mail0", "user_login0", "user_password0", "user_surname0", "user_name0", "user_firstname0");
		localStorage.setItem("loged_in_user_data", JSON.stringify(loged_in_user));
		console.log("Создан новый стартовый user.");

		viewing_user = loged_in_user;
		console.log("login succesful");
		isLoginDone = true;
		localStorage.setItem("isLoginDone", true);
	} else {  /* if Temp*/
		temp_user = new Unit();
		localStorage.setItem("temp_user_data", JSON.stringify(temp_user));
		console.log("Создан новый стартовый temp-user.");
		viewing_user = temp_user;
	}

 	if (viewing_user.getLevel() === "admin") { isAdmin = true; isModer = false; isUser = false; }
 	else if (viewing_user.getLevel() === "moder")  { isAdmin = false; isModer = true; isUser = false; }
	else { isAdmin = false; isModer = false; isUser = true; }

	localStorage.setItem("isAdmin", isAdmin);
	localStorage.setItem("isModer", isModer);
	localStorage.setItem("isUser", isUser);

	myLocalStorage.prototype.synchronizeAllData();
	there_is_unsynchronized_data_on_local = true;
	localStorage.setItem("there_is_unsynchronized_data_on_local", there_is_unsynchronized_data_on_local);
	Server.prototype.synchronizeAllData();
	/*location.reload();*/
}

myLocalStorage.prototype.synchronizeAllData = function(synth_user) { /*это не сервер, а именно локалка*/
	if ((isAdmin === "true") || (isAdmin === true) || (isModer === "true") || (isModer === true)) {
		myLocalStorage.prototype._synchronizeUserData(synth_user);
		/*синхронизируем не полностью, чтоб не перезаписывать весь список, а только изменять или добавлять данные одного пользователя*/
		/*myLocalStorage.prototype.setAllUnitsFromList(Unit.prototype.userList);*/
		try {
			if (loged_in_user.getId() === synth_user.getId()) { /*если событие синхронизации произошло при работе с акком самого админа, нужно засинхронить его акк еще и отдельно в хранилище. при работе с чужими акками в локалстораге меняется только лист в целом*/
				loged_in_user = synth_user;
				if (isStorageSupport) {
					localStorage.setItem("loged_in_user_data", JSON.stringify(loged_in_user));
				} else { console.log("LocalStorage is not supported."); }
			}
		} catch (error) {}
	} else if ((isLoginDone === "true") || (isLoginDone === true)) { /* if User */
		try {
			if (loged_in_user.getId() === synth_user.getId()) {
				loged_in_user = synth_user;
			}
		} catch (error) {}
		myLocalStorage.prototype._synchronizeUserData(loged_in_user);/*синхроним юзера в общий список*/

		if (isStorageSupport) { /*синхроним юзера еще и отдельно*/
			localStorage.setItem("loged_in_user_data", JSON.stringify(loged_in_user));
		} else { console.log("LocalStorage is not supported."); }
	} else { /* if Temp */
		if (isStorageSupport) {/*синхроним temp только отдельно*/
			try {
				if (temp_user.getId() === synth_user.getId()) {
					temp_user = synth_user;
				}
			} catch (error) {}
			localStorage.setItem("temp_user_data", JSON.stringify(temp_user));
		} else { console.log("LocalStorage is not supported."); }
	}
};

myLocalStorage.prototype._synchronizeUserData = function(synth_user) { /*не для Temp! */
	if ((arguments.length === 0) || (!arguments[0])) {
		var synth_user = viewing_user;
	}
	if (isStorageSupport) {
		var userListOnLocal = localStorage.getItem("userListOnLocal");
		if (userListOnLocal && (userListOnLocal !== "null")) { /*не первый юзер*/
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

myLocalStorage.prototype.logOut = function() {
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
	viewing_user = null;
	loged_in_user = null;
	localStorage.setItem("loged_in_user_data", null);
	temp_user = null;
	localStorage.setItem("temp_user_data", null);
	there_is_unsynchronized_data_on_local = false;
	localStorage.setItem("there_is_unsynchronized_data_on_local", false);
	location.reload();
	/*setTimeout(function() {
		}, 6000);*/
}

/* ---------------/myLocalStorage--------------- */

/* хард очистка всего и вся */
if (isFirstAdminLoading === "true") {
	localStorage.clear();
	localStorage.setItem("nextIdOnServer", 0);
	isFirstAdminLoading = false;
	localStorage.setItem("isFirstAdminLoading", isFirstAdminLoading);
}

/* iniziaisation */
/* в самом начале пытаться загрузить свежие данные с сервера. если не получилось, попытаться всять из локалки. если не получилось, создать нового юзера */

try {
	var err = 0;
	try {
		myLocalStorage.prototype.getAllData(); /*при первой загрузке все будет пустым и создастся пустой темп, при остальных данные бурут подгружаться из хранилища*/
	} catch (error) { console.log(error);
		console.log("Данных из локального хранилища не получено."); err++; }
	if ((there_is_unsynchronized_data_on_local === "true") || (there_is_unsynchronized_data_on_local === true)) { /*если есть несинхроненные данные, попытаться их засинхронить*/
		Server.prototype.synchronizeAllData();
	}
	/*в любом случае попытаться забрать с сервера свежачок*/
	try {
		Server.prototype.getAllData();
		console.log("localStorage.getItem(userListOnLocal)");
		console.log(localStorage.getItem("userListOnLocal"));
	} catch (error) { console.log(error); console.log("Данных от сервера не получено."); err++; }
	if (err > 1) { throw new Error(); } /*если безуспешны и локальное хранилище, и сервер, то отработаем по нулевому варианту*/ /*если хоть один ответил, то можно нормально работать*/
} catch (error) { /* new Local */ /* создание новой базы приложения в зависимости от того, кто инициализирует приложение */
	myLocalStorage.prototype.setAllData();
}

/*var un1 = new Unit("mail", "login", "password", "surname", "name", "firstname");
un1.setLevel("moder");
var un2 = new Unit("mail", "login", "password", "surname", "name", "firstname");
un2.setLogin("второй");*/


/*Server.prototype.synchronizeAllData();*/

try {
console.log(viewing_user.userList);
} catch (error) {}
console.log(localStorage.getItem("userListOnLocal"));
console.log(localStorage.getItem("userListOnServer"));

/* /iniziaisation */



/*register = new Unit(mail, login...) = addNewUnit(user)
login = new Unit(obj) =  logInCurrUnit(curr_login, curr_password)
								ifAdmin setAdmin
								ifUser setUser*/

