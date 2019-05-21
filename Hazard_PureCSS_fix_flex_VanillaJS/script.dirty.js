/*localStorage.setItem("isStorageSupport", true);*/

function cycl_with_Timeout(mseconds, max_count, cycled_function) {
	var i = 0;
	function recurs_cycl() {
		cycled_function();
		setTimeout(function() {
			i++;
			if (i < max_count) { recurs_cycl(); }
		}, mseconds);
	}
	recurs_cycl();
}

function cycl_with_Timeout(mseconds, max_count, cycled_function, args) {
	var i = 0;
	function recurs_cycl() {
		cycled_function(args);
		setTimeout(function() {
			i++;
			if (i < max_count) { recurs_cycl(); }
		}, mseconds);
	}
	recurs_cycl();
}

var isStorageSupport = false;
try {
	localStorage.setItem("isStorageSupport", true);
	isStorageSupport = localStorage.getItem("isStorageSupport");
	console.log("LocalStorage - ", isStorageSupport);
	console.log(localStorage);
} catch (error) {
	console.log("LocalStorage is not supported");
}

var isLoginDone = false;
if (isStorageSupport === "true") {
	isLoginDone = localStorage.getItem("isLoginDone");
}

var login_from_storage = null; 
if (isStorageSupport === "true") {
	if (isLoginDone === "true") {
		login_from_storage = localStorage.getItem("login");
	}
}

var isAdmin = false;
var isModer = false;
var isUser = true; /*чек проверяется при отображении объектов ТОЛЬКО для юзеров (типа списка их доков в навигации, рекламы какой-то, ...)*/

/*var navigation__user_itemsList = new Array();
navigation__user_itemsList[0] = "0";
navigation__user_itemsList[1] = "1";
navigation__user_itemsList[2] = "2";*/ /*в этот лист будут обавляться только заголовки и адреса на оценки рисков пользователя (без сгенерированных доков)*/
/*только в юзере, но не в админе и не в модере*/

/*ВОЗМОЖНО В ЭТИ ЛИСТЫ НУЖНО ВКЛЮЧИТЬ И САМИ ДАННЫЕ ДОКОВ, КОТОРЫЕ БУДУТ ВСТАВЛЯТЬСЯ КУДА НАДО ПРИ ПЕРЕХОДЕ ПО ССЫЛКЕ (типа двумерный массив с соответствующими каждой ячейке данными)*/

/*var user_itemsList = new Array();*/ /*в этот лист добавляются все доки юзера, в том числе сгенерированные и т.п. (название + ссыль)*/
/* необходимо во всех аккаунтах, поскольку на странице профиля отображаются*/

/*var user_namesList = new Array();*/ /* имена юзеров со ссз */
var user_itemsList = new Array();
if (isUser) {
	if (isStorageSupport === "true") {
		if (isLoginDone) {
			user_itemsList = localStorage.getItem("user_itemsList");
		}
	}
}
var userList = new Array();
if (isAdmin || isModer) {
	if (isStorageSupport === "true") {
		if (isLoginDone) {
			userList = localStorage.getItem("userList");
		}
	}
}
var curr_user_itemsList = new Array();
if (isStorageSupport === "true") {
	if (isLoginDone) {
		curr_user_itemsList = localStorage.getItem("curr_user_itemsList");
	}
}

/* ------ log in ------ */
try {
	var user_login = document.querySelector(".main-header-navigation__user-login");
	var entrance = document.querySelector(".entrance");
	if (isLoginDone !== "true") {
		var modal_overlay = document.querySelector(".modal-overlay");
		var entrance__close = entrance.querySelector(".entrance__close");
		var entrance__form = entrance.querySelector(".entrance__form");
		var entrance__login = entrance.querySelector(".entrance__login");
		var entrance__password = entrance.querySelector(".entrance__password");

		user_login.addEventListener("click", function function_name(event) {
			event.preventDefault();
			entrance.classList.remove("visually-hidden");
			modal_overlay.classList.remove("visually-hidden");
			entrance__login.focus();
			if (login_from_storage) {
				entrance__login.value = login_from_storage;
				entrance__password.focus();
			}
		});
		modal_overlay.addEventListener("click", function function_name(event) {
			event.preventDefault();
			entrance.classList.add("visually-hidden");
			modal_overlay.classList.add("visually-hidden");
		});
		entrance__close.addEventListener("click", function function_name(event) {
			event.preventDefault();
			entrance.classList.add("visually-hidden");
			modal_overlay.classList.add("visually-hidden");
		});
		window.addEventListener("keydown", function function_name(event) {
			if ((event.key === "Escape") && !entrance.classList.contains("visually-hidden")) {
				event.preventDefault();
				entrance.classList.add("visually-hidden");
				modal_overlay.classList.add("visually-hidden");
			}
		});
		entrance__login.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				entrance__password.focus();
			}
		});
		entrance__form.addEventListener("submit", function function_name(event) {
			entrance__login.classList.remove("bad-input");
			entrance__password.classList.remove("bad-input");
			if (!entrance__password.value) {
				event.preventDefault();
				console.log(entrance__password.value);
				console.log("Введите корректный пароль");
				entrance__password.classList.add("bad-input");
				entrance__password.focus();
			}
			if (!entrance__login.value) {
				event.preventDefault();
				console.log(entrance__login.value);
				console.log("Введите корректный логин");
				entrance__login.classList.add("bad-input");
				entrance__login.focus();
			}
			if (entrance__login.value && entrance__password.value && (isStorageSupport === "true")) {
				localStorage.setItem("login", entrance__login.value);
				localStorage.setItem("isLoginDone", true);
				isLoginDone = true;
				/*user_itemsList = серверная работа, пока что вытаскиваем с userList по логину, если это юзерский;*/
				/*userList = серверная работа, пока что вытаскиваем с userList по логину, если это юзерский;*/
				/*if (isUser) { user_itemsList;
				curr_user_itemsList = user_itemsList; }
				if (isAdmin || isModer) { userList;
				curr_user_itemsList = ...; }*/
				
			}
		});

		/* - main-nav log in - */
		try {
			var main_nav_user_login = document.querySelector(".main-navigation__user-login");
			main_nav_user_login.addEventListener("click", function function_name(event) {
				event.preventDefault();
				entrance.classList.remove("visually-hidden");
				modal_overlay.classList.remove("visually-hidden");
				entrance__login.focus();
				if (login_from_storage) {
					entrance__login.value = login_from_storage;
					entrance__password.focus();
				}
			});
		} catch { console.log("main-nav log in works not"); }
		/* - /main-nav log in - */
	} else {
		/*отдельно работать с окном входа в ордере*/
		/*подумать, где надо еще отработать*/

		/* - header-user-nav loged in - */
		/* create loged in elements */
		var main_header_navigation__user_item_1 = document.createElement('li');
		main_header_navigation__user_item_1.className = "main-header-navigation__user-item";
		var new_main_header_navigation__user_logout = document.createElement('a');
		new_main_header_navigation__user_logout.className = "main-header-navigation__user-logout";
		new_main_header_navigation__user_logout.href = "#";
		new_main_header_navigation__user_logout.innerHTML = "Выход";
		new_main_header_navigation__user_logout.addEventListener("click", function function_name(event) {
			event.preventDefault();
			localStorage.setItem("isLoginDone", false);
			isLoginDone = false;
			user_itemsList = null;
			localStorage.setItem("user_itemsList", null);
			curr_user_itemsList = null;
			localStorage.setItem("curr_user_itemsList", null);
			location.reload();
		});
				
		main_header_navigation__user_item_1.appendChild(new_main_header_navigation__user_logout);

		var main_header_navigation__user_item_2 = document.createElement('li');
		main_header_navigation__user_item_2.className = "main-header-navigation__user-item";
		var new_main_header_navigation__user_profile = document.createElement('a');
		new_main_header_navigation__user_profile.href = "user.dirty.html";
		new_main_header_navigation__user_profile.innerHTML = "Профиль";
		main_header_navigation__user_item_2.appendChild(new_main_header_navigation__user_profile);

		/*var new_main_header_navigation__user_itemsList = liшки...
		в navigation (нет у админа с модером) (можно админу с модером потом добавить парсинг с текущего юзера из общего массива)
    парсится с user_itemsList if (isMainDoc = true) {
        .innerHTML = .title;
        .href = .url_to_open;
        .setAttribute('index', i);
    }*/

		/* /create loged in elements */

		/* delete loged out elements */
		var main_header_navigation__user_list = document.querySelector(".main-header-navigation__user-list");
		main_header_navigation__user_itemsList = main_header_navigation__user_list.querySelectorAll('li');
		main_header_navigation__user_itemsList = Array.prototype.slice.call(main_header_navigation__user_itemsList);
		for (var i = 0; i < main_header_navigation__user_itemsList.length; i++) {
			main_header_navigation__user_list.removeChild(main_header_navigation__user_itemsList[i]);
		}
		/* /delete loged out elements */

		/* append loged in elements */
		/*for (var i = 0; i < new_main_header_navigation__user_itemsList.length; i++) {
			main_header_navigation__user_list.appendChild(new_main_header_navigation__user_itemsList[i]);
		}*/ /*(нет у админа с модером) (можно админу с модером потом добавить парсинг с текущего юзера из общего массива)*/
		main_header_navigation__user_list.appendChild(main_header_navigation__user_item_2);
		main_header_navigation__user_list.appendChild(main_header_navigation__user_item_1);
		/* /append loged in elements */
		/* - /header-user-nav loged in - */

		/* - main-nav loged in - */
		try {
			/* create loged in elements */
			var dup_main_header_navigation__user_item_1 = main_header_navigation__user_item_1.cloneNode(true);
			dup_main_header_navigation__user_item_1.className = "main-navigation__user-item";

			dup_main_header_navigation__user_item_1.addEventListener("click", function function_name(event) {
				event.preventDefault();
				localStorage.setItem("isLoginDone", false);
				isLoginDone = false;
				user_itemsList = null;
				localStorage.setItem("user_itemsList", null);
				curr_user_itemsList = null;
				localStorage.setItem("curr_user_itemsList", null);
				location.reload();
			});

			var dup_main_header_navigation__user_item_2 = main_header_navigation__user_item_2.cloneNode(true);
			dup_main_header_navigation__user_item_2.className = "main-navigation__user-item";

			/* /create loged in elements */

			/* delete loged out elements */
			var main_navigation__user_list = document.querySelector(".main-navigation__user-list");
			main_navigation__user_itemsList = main_navigation__user_list.querySelectorAll('li');
			main_navigation__user_itemsList = Array.prototype.slice.call(main_navigation__user_itemsList);
			for (var i = 0; i < main_navigation__user_itemsList.length; i++) {
				main_navigation__user_list.removeChild(main_navigation__user_itemsList[i]);
			}
			/* /delete loged out elements */

			/* append loged in elements */
			main_navigation__user_list.appendChild(dup_main_header_navigation__user_item_2);
			main_navigation__user_list.appendChild(dup_main_header_navigation__user_item_1);
			/* /append loged in elements */
		} catch { console.log("main-nav loged in works not"); }
		/* - /main-nav loged in - */
	}
} catch { console.log("Log in works not"); }
/* ------ /log in ------ */

/* ------ slider ------ */
	var slider = null;
	var button_previousList = document.querySelectorAll(".button-previous");
	var button_nextList = document.querySelectorAll(".button-next");
	var pagination__itemListAll = document.querySelectorAll(".pagination__item");
	var slider__itemList = new Array();
	var pagination__itemList = new Array();
	var slider__active_idx = null;
	var slider__item__active = null;

/*здесь должна быть расстановка visually-hidden по умолчанию*/

	function setSlider(fire) {
		slider = fire.closest(".slider");
		slider__itemList = slider.querySelectorAll(".slider__item");
		pagination__itemList = slider.querySelectorAll(".pagination__item");
		pagination__itemList.forEach(function callback(element, index, array) {
			if (index > slider__itemList.length - 1) { return; }
			if (element.classList.contains("pagination__item--active")) {
				slider__active_idx = index; 
				slider__item__active = slider__itemList.item(slider__active_idx);
				return;
			}
		});
	}

	function slider__previous_slide(){

		var old_active = slider__item__active;
		old_active.classList.add("slider_item_right_out");
		pagination__itemList.item(slider__active_idx).classList.remove("pagination__item--active");

		var slider__new_active_idx = null;

		if (slider__active_idx != 0) {
			slider__new_active_idx = slider__active_idx - 1;
		} else {
			slider__new_active_idx = slider__itemList.length - 1;
		}
		
		slider__itemList.item(slider__new_active_idx).classList.add("slider__item--active");
		slider__itemList.item(slider__new_active_idx).classList.add("slider_item_left_in");
		pagination__itemList.item(slider__new_active_idx).classList.add("pagination__item--active");
		setTimeout(function() {
			slider__itemList.item(slider__new_active_idx).classList.remove("slider_item_left_in");
		}, 285);

		setTimeout(function() {
			old_active.classList.remove("slider_item_right_out");
			old_active.classList.remove("slider__item--active"); /*возможно зесь лучше пользоваться добавлением/убиранием visually-hidden для более простой стилизации в css*/
		}, 285);
	}
	for (var i = 0; i < button_previousList.length; i++) {
		button_previousList.item(i).addEventListener("click", function function_name(event) {
			event.preventDefault();
			setSlider(event.target);
			slider__previous_slide();
		});
	}

	function slider__next_slide(){

		var old_active = slider__item__active;
		old_active.classList.add("slider_item_left_out");
		pagination__itemList.item(slider__active_idx).classList.remove("pagination__item--active");

		var slider__new_active_idx = null;

		if (slider__active_idx != slider__itemList.length - 1) {
			slider__new_active_idx = slider__active_idx + 1;
		} else {
			slider__new_active_idx = 0;
		}

		slider__itemList.item(slider__new_active_idx).classList.add("slider__item--active");
		slider__itemList.item(slider__new_active_idx).classList.add("slider_item_right_in");
		pagination__itemList.item(slider__new_active_idx).classList.add("pagination__item--active");
		setTimeout(function() {
			slider__itemList.item(slider__new_active_idx).classList.remove("slider_item_right_in");
		}, 285);

		setTimeout(function() {
			old_active.classList.remove("slider_item_left_out");
			old_active.classList.remove("slider__item--active"); /*возможно зесь лучше пользоваться добавлением/убиранием visually-hidden для более простой стилизации в css*/
		}, 285);
	}
	for (var i = 0; i < button_nextList.length; i++) {
		button_nextList.item(i).addEventListener("click", function function_name(event) {
			event.preventDefault();
			setSlider(event.target);
			slider__next_slide();
		});
	}

	var slider__clicked_idx = null;
	function set_sl_nd_prev_from_pag(fire){
		slider__previous_slide();
		setSlider(fire);
	}
	function set_sl_nd_next_from_pag(fire){
		slider__next_slide();
		setSlider(fire);
	}
	pagination__itemListAll.forEach(function callback(element, index, array) {
		element.addEventListener("click", function function_name(event) {
			event.preventDefault();
			setSlider(event.target);
			pagination__itemList.forEach(function callback(element, index, array) {
				if (index > slider__itemList.length - 1) { return; }
				if (element == event.target) {
					slider__clicked_idx = index;
					return;
				}
			});
			if ((slider__clicked_idx - slider__active_idx) > 0) {
			    var count_of_steps_to_go = slider__clicked_idx - slider__active_idx;
			    console.log(count_of_steps_to_go);
			    cycl_with_Timeout(286, count_of_steps_to_go, set_sl_nd_next_from_pag, event.target);
			} else if ((slider__clicked_idx - slider__active_idx) < 0) {
			    var count_of_steps_to_go = slider__active_idx - slider__clicked_idx;
			    cycl_with_Timeout(286, count_of_steps_to_go, set_sl_nd_prev_from_pag, event.target);
			}
		});
	});
/* ------ /slider ------ */


/* ------ special slider news ------ *//*
var news = document.querySelector(".news");
var news__button_previous = news.querySelector(".news .button-previous");
var news__button_next = news.querySelector(".news .button-next");
var news__itemList = news.querySelectorAll(".news__item");
var news__pagination__itemList = news.querySelectorAll(".pagination__item");
var news__active_idx = 0;

function refresh_pagination() {
	news.querySelector(".pagination__item--active").classList.remove("pagination__item--active");
	news__pagination__itemList.item(news__active_idx).classList.add("pagination__item--active");
}

news__button_previous.addEventListener("click", function function_name(event) {
	event.preventDefault();
	news__itemList.item(news__active_idx).classList.remove("news__item--active")
	if (news__active_idx != 0) {
		news__itemList.item(news__active_idx - 1).classList.add("news__item--active");
		news__active_idx--;
	} else {
		news__itemList.item(news__itemList.length - 1).classList.add("news__item--active");
		news__active_idx = news__itemList.length - 1;
	}
	refresh_pagination();
});

news__button_next.addEventListener("click", function function_name(event) {
	event.preventDefault();
	news__itemList.item(news__active_idx).classList.remove("news__item--active")
	if (news__active_idx != news__itemList.length - 1) {
		news__itemList.item(news__active_idx + 1).classList.add("news__item--active");
		news__active_idx++;
	} else {
		news__itemList.item(0).classList.add("news__item--active");
		news__active_idx = 0;
	}
	refresh_pagination();
});
for (var i = 0; i <= news__pagination__itemList.length - 1; i++) {
	news__pagination__itemList.item(i).addEventListener("click", function function_name(event) {
		event.preventDefault();
		news__itemList.item(news__active_idx).classList.remove("news__item--active");
		for (var j = 0; j <= news__pagination__itemList.length - 1; j++) {
			if (event.target == news__pagination__itemList.item(j)) {
				news__itemList.item(j).classList.add("news__item--active");
				news__active_idx = j;
				refresh_pagination();
				break;
			}
		}
	})
}*/
/* ------ /special slider news ------ */


/* ------ register ------ */
try {
	var register__form = document.querySelector(".register__form");
	var register__mail = register__form.querySelector(".register__mail");
	var register__login = register__form.querySelector(".register__login");
	var register__password = register__form.querySelector(".register__password");
	var register__password_repeat = register__form.querySelector(".register__password-repeat");

	register__mail.focus();

	register__mail.addEventListener("keydown", function function_name(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			register__login.focus();
		}
	});
	register__login.addEventListener("keydown", function function_name(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			register__password.focus();
		}
	});
	register__password.addEventListener("keydown", function function_name(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			register__password_repeat.focus();
		}
	});
	register__form.addEventListener("submit", function function_name(event) {
		register__mail.classList.remove("bad-input");
		register__login.classList.remove("bad-input");
		register__password.classList.remove("bad-input");
		register__password_repeat.classList.remove("bad-input");
		if (!register__password_repeat.value) {
			event.preventDefault();
			console.log(register__password_repeat.value);
			console.log("Введите корректный повторный пароль");
			register__password_repeat.classList.add("bad-input");
			register__password_repeat.focus();
		}
		if (!register__password.value) {
			event.preventDefault();
			console.log(register__password.value);
			console.log("Введите корректный пароль");
			register__password.classList.add("bad-input");
			register__password.focus();
		}
		if (!register__login.value) {
			event.preventDefault();
			console.log(register__login.value);
			console.log("Введите корректный логин");
			register__login.classList.add("bad-input");
			register__login.focus();
		}
		if (!register__mail.value) {
			event.preventDefault();
			console.log(register__mail.value);
			console.log("Введите корректный адрес электронной почты");
			register__mail.classList.add("bad-input");
			register__mail.focus();
		}
		if (register__password_repeat.value && register__password.value && register__login.value && register__mail.value && (isStorageSupport === "true")) {
			localStorage.setItem("login", register__login.value);
		}
	});

} catch {console.log("Register works not");}

/* ------ /register ------ */

/* ------ restore ------ */
try {
	var restore = document.querySelector(".restore");
	var restore_letter__form = document.querySelector(".restore-letter__form");
	var restore_letter__mail = restore_letter__form.querySelector(".restore-letter__mail");
	var restore_new_password__form = document.querySelector(".restore-new-password__form");
	var restore_new_password__password = restore_new_password__form.querySelector(".restore-new-password__password");
	var restore_new_password__password_repeat = restore_new_password__form.querySelector(".restore-new-password__password-repeat");

	var isFromMail = false;

	if (!isFromMail) {
		restore.classList.remove("isFromMail");
		restore_letter__mail.focus();
		if (login_from_storage) {
			restore_letter__mail.value = login_from_storage;
		}
		restore_letter__form.addEventListener("submit", function function_name(event) {
			restore_letter__mail.classList.remove("bad-input");
			if (!restore_letter__mail.value) {
				event.preventDefault();
				console.log(restore_letter__mail.value);
				console.log("Введите корректный адрес электронной почты");
				restore_letter__mail.classList.add("bad-input");
				restore_letter__mail.focus();
			} else {
				/*localStorage.setItem("login", register__login.value);*/
			}
		});
	} else {
		restore.classList.add("isFromMail");
		restore_new_password__password.focus();
		restore_new_password__password.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				restore_new_password__password_repeat.focus();
			}
		});
		restore_new_password__form.addEventListener("submit", function function_name(event) {
			restore_new_password__password.classList.remove("bad-input");
			restore_new_password__password_repeat.classList.remove("bad-input");
			if (!restore_new_password__password_repeat.value) {
				event.preventDefault();
				console.log(restore_new_password__password_repeat.value);
				console.log("Введите корректный повторный пароль");
				restore_new_password__password_repeat.classList.add("bad-input");
				restore_new_password__password_repeat.focus();
			}
			if (!restore_new_password__password.value) {
				event.preventDefault();
				console.log(restore_new_password__password.value);
				console.log("Введите корректный пароль");
				restore_new_password__password.classList.add("bad-input");
				restore_new_password__password.focus();
			}
			if (restore_new_password__password_repeat.value && restore_new_password__password.value) {
				/*localStorage.setItem("login", register__login.value);*/
			}
		});
	}
} catch {console.log("Restore works not");}
/* ------ /restore ------ */

/* ------ user--moder ------ */
try {
	var user__moder__markList = document.querySelectorAll(".user--moder__mark");
	var user__moder__marks_conteiner = null;
	var anyNodeIsCreated = false;
	var newButton = null;
	var mark__planned = null;
	var mark__in_process = null;
	var mark__done = null;

	function user__moder__mark_event(curr_event) {
		curr_event.preventDefault();
		anyNodeIsCreated = false;
		user__moder__marks_conteiner = curr_event.target.closest(".user--moder__marks-conteiner");
		try {
			mark__planned = user__moder__marks_conteiner.querySelector(".mark__planned");
			if (!mark__planned) {
				anyNodeIsCreated = true;
				newButton = document.createElement('button');
				newButton.className = "user--moder__mark mark__planned";
				newButton.setAttribute('type', 'button');
				newButton.setAttribute('title', 'Запланировано');
				newButton.innerHTML = "<b>❊</b><span class='visually-hidden'>Запланировано</span>";
				user__moder__marks_conteiner.appendChild(newButton);
				newButton.addEventListener("click", user__moder__mark_event);
			}
		} catch { console.log("Error by mark__planned"); }
		try {
			mark__in_process = user__moder__marks_conteiner.querySelector(".mark__in-process");
			if (!mark__in_process) {
				anyNodeIsCreated = true;
				newButton = document.createElement('button');
				newButton.className = "user--moder__mark mark__in-process";
				newButton.setAttribute('type', 'button');
				newButton.setAttribute('title', 'В процессе');
				newButton.innerHTML = "<b>⇝</b><span class='visually-hidden'>В процессе</span>";
				user__moder__marks_conteiner.appendChild(newButton);
				newButton.addEventListener("click", user__moder__mark_event);
			}
		} catch { console.log("Error by mark__in-process"); }
		try {
			mark__done = user__moder__marks_conteiner.querySelector(".mark__done");
			if (!mark__done) {
				anyNodeIsCreated = true;
				newButton = document.createElement('button');
				newButton.className = "user--moder__mark mark__done";
				newButton.setAttribute('type', 'button');
				newButton.setAttribute('title', 'Сделано');
				newButton.innerHTML = "<b>✓</b><span class='visually-hidden'>Сделано</span>";
				user__moder__marks_conteiner.appendChild(newButton);
				newButton.addEventListener("click", user__moder__mark_event);
			}
		} catch { console.log("Error by mark__done"); }
		if (!anyNodeIsCreated) {
			if (curr_event.target.closest(".user--moder__mark") != mark__planned) {user__moder__marks_conteiner.removeChild(mark__planned);}
			if (curr_event.target.closest(".user--moder__mark") != mark__in_process) {user__moder__marks_conteiner.removeChild(mark__in_process);}
			if (curr_event.target.closest(".user--moder__mark") != mark__done) {user__moder__marks_conteiner.removeChild(mark__done);}
		}		
	}

	for (var i = 0; i < user__moder__markList.length; i++) {
		user__moder__markList.item(i).addEventListener("click", function function_name(event) { user__moder__mark_event(event); }); }
} catch {console.log("User--moder works not");}
/* ------ /user--moder ------ */

/* ------ evaluation ------ */
try {
/* full-screen */
var evaluation__full_screenList = document.querySelectorAll(".evaluation__full-screen");
var modal_overlay = document.querySelector(".modal-overlay");
var evaluation_with_tools_wrapper = null;

evaluation__full_screenList.forEach(function callback(element, index, array) {
	element.addEventListener("click", function function_name(argument) {
		event.preventDefault();
		evaluation_with_tools_wrapper = event.target.closest(".evaluation-with-tools-wrapper");
		evaluation_with_tools_wrapper.classList.toggle("evaluation-with-tools-wrapper--full-screen");
		modal_overlay.classList.toggle("visually-hidden");
	});
});


modal_overlay.addEventListener("click", function function_name(event) {
	event.preventDefault();
	modal_overlay.classList.add("visually-hidden");
	try {
		evaluation_with_tools_wrapper.classList.remove("evaluation-with-tools-wrapper--full-screen");
	} catch {}
});
/* /full-screen */

/* change-view */
var evaluationAsTable = true; /* c локальным хранилищем работать */

var evaluation__item__tableList = document.querySelectorAll(".evaluation__table");
evaluation__item__tableList = Array.prototype.slice.call(evaluation__item__tableList);
for (var i = 0; i < evaluation__item__tableList.length; i++) {
	evaluation__item__tableList[i] = evaluation__item__tableList[i].closest(".evaluation__item");
}
var evaluation__modelList = document.querySelectorAll(".evaluation__model"); /*element of model-drag-n-drop нужно ли?? */
var evaluation__item__modelList = Array.prototype.slice.call(evaluation__modelList);
for (var i = 0; i < evaluation__item__modelList.length; i++) {
	evaluation__item__modelList[i] = evaluation__item__modelList[i].closest(".evaluation__item");
}

function refreshEvaluationView() {
	if (evaluationAsTable) {
		evaluation__item__tableList.forEach(function callback(element, index, array) {
			element.classList.add("evaluation__item--active");
		});
		evaluation__item__modelList.forEach(function callback(element, index, array) {
			element.classList.remove("evaluation__item--active");
		});
	} else {
		evaluation__item__modelList.forEach(function callback(element, index, array) {
			element.classList.add("evaluation__item--active");
		});
		evaluation__item__tableList.forEach(function callback(element, index, array) {
			element.classList.remove("evaluation__item--active");
		});
	}
}
refreshEvaluationView();

var evaluation__changeList = document.querySelectorAll(".evaluation__change");
evaluation__changeList.forEach(function callback(element, index, array) {
	element.addEventListener("click", function function_name(event) {
		event.preventDefault();
		evaluationAsTable = !evaluationAsTable;
		refreshEvaluationView();
	});
});
/* /change-view */

/* model-drag-n-drop */
function addModel_item__mark_event(element){
	var old_cursor_Y = null;
	var old_cursor_X = null;
	var new_cursor_Y = null;
	var new_cursor_X = null;
	element.addEventListener("dragstart", function function_name(event) {
		event.preventDefault();
	});
	element.addEventListener("mousedown", function function_name(event) {
		event.preventDefault();
		old_cursor_Y = event.pageY;
		old_cursor_X = event.pageX;
		function model_item_mark_mouse_move(event1) {
			event1.preventDefault();
			new_cursor_Y = event1.pageY;
			new_cursor_X = event1.pageX;
			element.style.top = element.offsetTop + (new_cursor_Y - old_cursor_Y) + "px";
			element.style.left = element.offsetLeft + (new_cursor_X - old_cursor_X) + "px";
			old_cursor_Y = new_cursor_Y;
			old_cursor_X = new_cursor_X;
			try {
				if (element.offsetTop < 0 || element.offsetLeft < 0 || element.offsetTop > element.parentNode.getBoundingClientRect().height || element.offsetLeft > element.parentNode.getBoundingClientRect().width) {
					element.style.backgroundColor = "red";
				} else { element.style.backgroundColor = "#f39c12"; }
			} catch {"catch by element deleting-backgroundColor"};
			function model_item_mark_mouse_up(event2) {
				event2.preventDefault();
				element.removeEventListener("mousemove", model_item_mark_mouse_move);
				document.removeEventListener("mouseup", model_item_mark_mouse_up);
				try {
					if (element.offsetTop < 0 || element.offsetLeft < 0 || element.offsetTop > element.parentNode.getBoundingClientRect().height || element.offsetLeft > element.parentNode.getBoundingClientRect().width) {
						element.parentNode.removeChild(element);
					}
				} catch {"catch by element deleting"};
			}
			document.addEventListener("mouseup", model_item_mark_mouse_up);
		}
		element.addEventListener("mousemove", model_item_mark_mouse_move);
	});
};

evaluation__modelList.forEach(function callback(element, index, array) {
	element.querySelectorAll(".model-item__mark").forEach(function callback(element1, index1, array1) {
		addModel_item__mark_event(element1);
	});
});
/* /model-drag-n-drop */

/* model-new-mark */
var model_chips_wrapperList = document.querySelectorAll(".model-chips-wrapper");
model_chips_wrapperList.forEach(function callback(element, index, array) {
	element.querySelectorAll(".model-chip__mark").forEach(function callback(element1, index1, array1) {
		element1.addEventListener("click", function function_name(event) {
			event.preventDefault();
			var new_model_mark = document.createElement('button');
			new_model_mark.className = "mark-button model-item__mark";
			new_model_mark.setAttribute('type', 'button');
			new_model_mark.setAttribute('title', 'Выход');
			new_model_mark.style.top = 0;
			new_model_mark.style.left = 0;
			if (element1.classList.contains("model-chip__area")) {
				new_model_mark.classList.add("model-item__area");
				new_model_mark.innerHTML = "У<span class='visually-hidden'>Участок/оборудование</span>";
			}
			if (element1.classList.contains("model-chip__out")) {
				new_model_mark.classList.add("model-item__out");
				new_model_mark.innerHTML = "В<span class='visually-hidden'>Выход</span>";
			}
			element.closest(".evaluation__item").querySelector(".slider__item--active").appendChild(new_model_mark);
			addModel_item__mark_event(new_model_mark);
			new_model_mark.addEventListener("mouseover", model_item_mark_mouse_over);
		});
	});
});
/* /model-new-mark */

/* places-info-conteiner */
function model_item_mark_mouse_over(event) {
	event.preventDefault();
	var new_places_info_conteiner = document.createElement('div');
	new_places_info_conteiner.className = "places-info-conteiner";
	var new_places_info_title = document.createElement('div');
	new_places_info_title.className = "places-info__item places-info__title evaluation__note";
	/*--------------- это динамически из localStorage*/
	new_places_info_title.innerHTML = "Универсальный пресс производства сыра";
	/*---------------*/
	var new_image_edit__watch = document.createElement('button');
	new_image_edit__watch.className = "mark-button image-edit__mark image-edit__watch evaluation-image__anchor";
	new_image_edit__watch.setAttribute('type', 'button');
	new_image_edit__watch.setAttribute('title', 'Просмотреть фото');
	new_image_edit__watch.innerHTML = "<b>о</b><span class='visually-hidden'>Просмотреть фото</span>";

	var new_image_edit_change__file_input = document.createElement('input');
	new_image_edit_change__file_input.className = "image-edit-change__file-input visually-hidden";
	new_image_edit_change__file_input.setAttribute('type', 'file');
	new_image_edit_change__file_input.setAttribute('multiple', 'multiple');
	new_image_edit_change__file_input.setAttribute('accept', 'image/*');

	var new_image_edit__new = document.createElement('button');
	new_image_edit__new.className = "mark-button image-edit__mark image-edit__new";
	new_image_edit__new.setAttribute('type', 'button');
	new_image_edit__new.setAttribute('title', 'Добавить фото');
	new_image_edit__new.innerHTML = "<b>+</b><span class='visually-hidden'>Добавить фото</span>";
	new_image_edit__new.addEventListener("mousedown", image_edit__newEvent);

	var new_image_edit__change = document.createElement('button');
	new_image_edit__change.className = "mark-button image-edit__mark image-edit-change__button";
	new_image_edit__change.setAttribute('type', 'button');
	new_image_edit__change.setAttribute('title', 'Поменять фото');
	new_image_edit__change.innerHTML = "<b>/</b><span class='visually-hidden'>Поменять фото</span>";
	new_image_edit__change.addEventListener("mousedown", image_edit_change__buttonEvent);

	var new_image_edit__delete = document.createElement('button');
	new_image_edit__delete.className = "mark-button image-edit__mark image-edit__delete";
	new_image_edit__delete.setAttribute('type', 'button');
	new_image_edit__delete.setAttribute('title', 'Удалить фото');
	new_image_edit__delete.innerHTML = "<b>✘</b><span class='visually-hidden'>Удалить фото</span>";
	new_image_edit__delete.addEventListener("mousedown", image_edit__deleteEvent);

	var new_br = document.createElement('br');

	var new_places_info__image = document.createElement('button');
	new_places_info__image.className = "places-info__item places-info__image evaluation__image";
	new_places_info__image.setAttribute('type', 'button');
	new_places_info__image.innerHTML = "<span class='visually-hidden'>Изображение участка/оборудования</span>";

	/*--------------- это динамически из localStorage base64*/
	var new_places_info__image__img = document.createElement('img');
	new_places_info__image__img.setAttribute('src', 'img/places-edit__image-1.jpg');
	new_places_info__image__img.setAttribute('alt', 'Изображение участка/оборудования');
	/*--------------*/
	new_places_info_conteiner.appendChild(new_places_info_title);
	new_places_info_conteiner.appendChild(new_image_edit__watch);
	new_places_info_conteiner.appendChild(new_image_edit_change__file_input);
	new_places_info_conteiner.appendChild(new_image_edit__new);
	new_places_info_conteiner.appendChild(new_image_edit__change);
	new_places_info_conteiner.appendChild(new_image_edit__delete);
	new_places_info_conteiner.appendChild(new_br);
	new_places_info__image.appendChild(new_places_info__image__img);
	new_places_info_conteiner.appendChild(new_places_info__image);

	event.target.classList.add("evaluation-note__anchor");
	new_places_info_conteiner.style.top = event.target.offsetTop + "px";
	new_places_info_conteiner.style.left = event.target.offsetLeft + 24 + "px";
	event.target.parentNode.insertBefore(new_places_info_conteiner, event.target.nextSibling);
	
	function model_item_mark_mouse_out(event2) {
		if ((event2.relatedTarget != new_places_info_conteiner) && (event2.relatedTarget != event.target) && !event2.relatedTarget.parentNode.classList.contains("places-info-conteiner") && !event2.relatedTarget.parentNode.parentNode.classList.contains("places-info-conteiner")) {
			new_places_info_conteiner.parentNode.removeChild(new_places_info_conteiner);
			event.target.removeEventListener("mouseout", model_item_mark_mouse_out);
			new_places_info_conteiner.removeEventListener("mouseout", model_item_mark_mouse_out);
		}
	}
	event.target.addEventListener("mouseout", model_item_mark_mouse_out);
	new_places_info_conteiner.addEventListener("mouseout", model_item_mark_mouse_out);
}

evaluation__modelList.forEach(function callback(element, index, array) {
	element.querySelectorAll(".model-item__mark").forEach(function callback(element1, index1, array1) {
		element1.addEventListener("mouseover", model_item_mark_mouse_over);
	});
});
/* /places-info-conteiner */

/* tr-bottom-new-row-button */
function ev_table_new_row_bottom(event) {
	event.preventDefault();
	var tbody = event.target.closest("tbody");
	var event_row = event.target.closest("tr");

	var exmpl_row = null;
	if (event_row.querySelector("td.td-with-new-row-button") && (tbody.querySelector("tr") != event_row)) { /*если event_row - строка-кнопка и она идет не первой после заголовка*/
		exmpl_row = event_row.previousElementSibling;
	} else if (event_row.querySelector("td.td-with-new-row-button")) {
		exmpl_row = event_row.nextElementSibling;
	} else { exmpl_row = event_row; }

	var key_row_paste_before_me = null;
	if (event_row.querySelector("td.td-with-new-row-button")) {
		key_row_paste_before_me = event_row;
	} else {
		try { key_row_paste_before_me = event_row.nextElementSibling; } catch {}
	}

	var exmpl_row_tdsList = exmpl_row.querySelectorAll("td");
	var new_row = document.createElement('tr');

	var new_td_first = document.createElement('td');
	new_td_first.className = "td-with-edit-row-button";
	new_td_first.innerHTML = "<div><div class='tr-left-highlight-row-button-conteiner'></div></div>";
	var new_tr_left_highlight_row_button = document.createElement('button');
	new_tr_left_highlight_row_button.className = "tr-left-highlight-row-button";
	new_tr_left_highlight_row_button.setAttribute('type', 'button');
	new_tr_left_highlight_row_button.setAttribute('title', 'Выделить строку');
	new_tr_left_highlight_row_button.innerHTML = "<span class='visually-hidden'>Выделить строку</span>";
	new_td_first.firstChild.firstChild.appendChild(new_tr_left_highlight_row_button);
	new_row.appendChild(new_td_first);
	new_tr_left_highlight_row_button.addEventListener("click", tr_left_highlight_row_button_event);

	for (var i = 1; i < exmpl_row_tdsList.length; i++) {
		var new_td = document.createElement('td');
		new_td.className = exmpl_row_tdsList.item(i).className;
		new_td.innerHTML = exmpl_row_tdsList.item(i).innerHTML;
		new_row.appendChild(new_td);
		new_td.addEventListener("click", td_editing_conteinerEvent);
	}
/*
	if (!event_row.querySelector("td.td-with-new-row-button")) {
	console.log("check");
		event_row.parentNode.insertBefore(new_row, event_row.nextSibling);
	} else { event_row.parentNode.insertBefore(new_row, event_row.nextSibling.nextSibling); }
*/

	event_row.parentNode.insertBefore(new_row, key_row_paste_before_me);

	var tr_with_td_with_new_row_button = document.createElement('tr');
	tr_with_td_with_new_row_button.innerHTML = "<td class='td-with-new-row-button' colspan='9999'><button class='tr-bottom-new-row-button' title='Вставить новую строку' type='button'><span class='visually-hidden'>Вставить новую строку</span></button></td>";

	new_row.parentNode.insertBefore(tr_with_td_with_new_row_button, new_row);

	tr_with_td_with_new_row_button.querySelector(".tr-bottom-new-row-button").addEventListener("click", ev_table_new_row_bottom);

	new_row.querySelectorAll(".control-measures-edit-conteiner .control-measures-edit__watch").forEach(function callback(element, index, array)
		{ element.addEventListener("mousedown", control_measures_edit__watchEvent); });

	new_row.querySelectorAll(".image-edit__new").forEach(function callback(element, index, array)
		{ element.addEventListener("mousedown", image_edit__newEvent); });

	new_row.querySelectorAll(".image-edit-change__button").forEach(function callback(element, index, array)
		{ element.addEventListener("mousedown", image_edit_change__buttonEvent); });

	new_row.querySelectorAll(".image-edit__delete").forEach(function callback(element, index, array)
		{ element.addEventListener("mousedown", image_edit__deleteEvent); });

}
var tr_bottom_new_row_buttonList = document.querySelectorAll(".tr-bottom-new-row-button");
tr_bottom_new_row_buttonList.forEach(function callback(element, index, array) {
	element.addEventListener("click", ev_table_new_row_bottom);
});
/* /tr-bottom-new-row-button */

/* tr-left-highlight-row-button */
var tr_left_highlight_row_buttonList = document.querySelectorAll(".tr-left-highlight-row-button");
function tr_left_highlight_row_button_event(event) {
	event.preventDefault();
	evnt_tr = event.target.closest("tr");
	evnt_tr.classList.add("tr-highlighted");
	evnt_tr.querySelector(".tr-left-highlight-row-button-conteiner").classList.add("tr-left-highlight-row-button-conteiner--hidden");

	var new_tr_left_edit_row_buttons_conteiner = document.createElement('div');
	new_tr_left_edit_row_buttons_conteiner.className = "tr-left-edit-row-buttons-conteiner";
	new_tr_left_edit_row_buttons_conteiner.innerHTML = "<button class='edit-row__item edit-row__duplicate' title='Дублировать строку' type='button'>❏<span class='visually-hidden'>Дублировать строку</span></button><button class='edit-row__item edit-row__delete' title='Удалить строку' type='button'>✘<span class='visually-hidden'>Удалить строку</span></button><button class='edit-row__item edit-row__new' title='Вставить пустую строку' type='button'>+<span class='visually-hidden'>Вставить пустую строку</span></button>";
	evnt_tr.querySelector("td div").appendChild(new_tr_left_edit_row_buttons_conteiner);
	evnt_tr.querySelectorAll(".edit-row__item").forEach(function callback(element, index, array) { element.style.height = evnt_tr.getBoundingClientRect().height/3 + "px" });

	new_tr_left_edit_row_buttons_conteiner.querySelector(".edit-row__duplicate").addEventListener("mousedown", ev_table_new_row_bottom);
	new_tr_left_edit_row_buttons_conteiner.querySelector(".edit-row__new").addEventListener("mousedown", ev_table_new_row_bottom);

	function tr_left_highlight_row_button_event_reset(event1) { /*добавить conditable к заголовкам итемов ev_model*/
		evnt_tr.classList.remove("tr-highlighted");
		evnt_tr.querySelector(".tr-left-highlight-row-button-conteiner").classList.remove("tr-left-highlight-row-button-conteiner--hidden");
		evnt_tr.querySelector("td div").removeChild(new_tr_left_edit_row_buttons_conteiner);
		document.removeEventListener("mouseup", tr_left_highlight_row_button_event_reset);
	}
	document.addEventListener("mouseup", tr_left_highlight_row_button_event_reset);

	new_tr_left_edit_row_buttons_conteiner.querySelector(".edit-row__delete").addEventListener("mouseup", function function_name(event2) {
		var tr_deleting = event2.target.closest("tr");
		var tr_bottom_new_row_button_deleting = tr_deleting.previousElementSibling;
		tr_deleting.parentNode.removeChild(tr_deleting);
		tr_bottom_new_row_button_deleting.parentNode.removeChild(tr_bottom_new_row_button_deleting);
	});
}
tr_left_highlight_row_buttonList.forEach(function callback(element, index, array) {
	element.addEventListener("click", tr_left_highlight_row_button_event);
});
/* /tr-left-highlight-row-button */

/* td-editing-conteiner */
custom_td_content_wrap = document.querySelectorAll("td .custom-th-td-content-wrapper");
custom_tdList = Array.prototype.slice.call(custom_td_content_wrap);
custom_tdList.forEach(function callback(element, index, array) {
	array[index] = element.closest("td"); });

var new_td_editing_conteinerIsDone = false;
function td_editing_conteinerEvent(event) {
	if (!new_td_editing_conteinerIsDone) {
		event.preventDefault();
		var td_with_editing_conteiner_at_the_moment = event.target.closest("td");
		td_with_editing_conteiner_at_the_moment.classList.add("td-with-editing-conteiner-at-the-moment");
		var key_div_paste_into_me = td_with_editing_conteiner_at_the_moment.querySelector(".custom-th-td-content-wrapper");
		var tr_with_editing_conteiner = td_with_editing_conteiner_at_the_moment.closest("tr");
		var td_with_editing_conteiner_at_the_rowList = tr_with_editing_conteiner.querySelectorAll("td > div");
		td_with_editing_conteiner_at_the_rowList.forEach(function callback(element, index, array) {
			element.classList.add("td-with-editing-conteiner-at-the-row");
		});

		var new_td_editing_conteiner = document.createElement('div');
		new_td_editing_conteiner.className = "td-editing-conteiner";
		new_td_editing_conteiner.setAttribute('contenteditable', 'false');

		var td_edit__right = document.createElement('button');
		td_edit__right.className = "mark-button td-edit__mark td-edit__right";
		td_edit__right.setAttribute('type', 'button');
		td_edit__right.setAttribute('title', 'Метка верно');
		td_edit__right.innerHTML = "<span class='visually-hidden'>Метка верно</span>✓";

		var td_edit__wrong = document.createElement('button');
		td_edit__wrong.className = "mark-button td-edit__mark td-edit__wrong";
		td_edit__wrong.setAttribute('type', 'button');
		td_edit__wrong.setAttribute('title', 'Метка неверно');
		td_edit__wrong.innerHTML = "<span class='visually-hidden'>Метка неверно</span>✘";

		var td_edit__eliminated = document.createElement('button');
		td_edit__eliminated.className = "mark-button td-edit__mark td-edit__eliminated";
		td_edit__eliminated.setAttribute('type', 'button');
		td_edit__eliminated.setAttribute('title', 'Метка устранено');
		td_edit__eliminated.innerHTML = "<span class='visually-hidden'>Метка устранено</span>У";

		var td_edit__accepted = document.createElement('button');
		td_edit__accepted.className = "mark-button td-edit__mark td-edit__accepted";
		td_edit__accepted.setAttribute('type', 'button');
		td_edit__accepted.setAttribute('title', 'Метка мера принята');
		td_edit__accepted.innerHTML = "<span class='visually-hidden'>Метка мера принята</span>П";

		var td_edit__not_accepted = document.createElement('button');
		td_edit__not_accepted.className = "mark-button td-edit__mark td-edit__not-accepted";
		td_edit__not_accepted.setAttribute('type', 'button');
		td_edit__not_accepted.setAttribute('title', 'Метка мера не принята');
		td_edit__not_accepted.innerHTML = "<span class='visually-hidden'>Метка мера не принята</span>нП";

		var td_edit__not_accepted_note = document.createElement('button');
		td_edit__not_accepted_note.className = "mark-button td-edit__mark td-edit__not-accepted-note visually-hidden";
		td_edit__not_accepted_note.setAttribute('type', 'button');
		td_edit__not_accepted_note.setAttribute('title', 'Сделать примечание с пометкой \'Причина непринятия меры\'');
		td_edit__not_accepted_note.innerHTML = "<span class='visually-hidden'>Сделать примечание с пометкой \'Причина непринятия меры\'</span>*?";

		var td_edit__versions = document.createElement('button');
		td_edit__versions.className = "mark-button td-edit__mark td-edit__versions disabled";
		td_edit__versions.setAttribute('type', 'button');
		td_edit__versions.setAttribute('title', 'Показать предыдущие версии ячейки');
		td_edit__versions.innerHTML = "<span class='visually-hidden'>Показать предыдущие версии ячейки</span>В";

		var td_edit__note = document.createElement('button');
		td_edit__note.className = "mark-button td-edit__mark td-edit__note";
		td_edit__note.setAttribute('type', 'button');
		td_edit__note.setAttribute('title', 'Сделать примечание');
		td_edit__note.innerHTML = "<span class='visually-hidden'>Сделать примечание</span>*";

		new_td_editing_conteiner.appendChild(td_edit__right);
		new_td_editing_conteiner.appendChild(td_edit__wrong);
		new_td_editing_conteiner.appendChild(td_edit__eliminated);
		new_td_editing_conteiner.appendChild(td_edit__accepted);
		new_td_editing_conteiner.appendChild(td_edit__not_accepted);
		new_td_editing_conteiner.appendChild(td_edit__not_accepted_note);
		new_td_editing_conteiner.appendChild(td_edit__versions);
		new_td_editing_conteiner.appendChild(td_edit__note);

		setTimeout(function() { key_div_paste_into_me.appendChild(new_td_editing_conteiner); }, 300);
	
		new_td_editing_conteinerIsDone = true;

		function td_editing_conteinerEvent_reset(event1) {
			if (new_td_editing_conteinerIsDone) {
				try {
					td_with_editing_conteiner_at_the_moment.classList.remove("td-with-editing-conteiner-at-the-moment");
					td_with_editing_conteiner_at_the_rowList.forEach(function callback(element, index, array) {
						element.classList.remove("td-with-editing-conteiner-at-the-row");
					});
					key_div_paste_into_me.removeChild(new_td_editing_conteiner);
					new_td_editing_conteinerIsDone = false;
/*					td_with_editing_conteiner_at_the_moment.removeEventListener("blur", td_editing_conteinerEvent_reset);
*/					document.removeEventListener("mousedown", edit_td_mousedown);
				} catch {}
			}
		}

/*		key_div_paste_into_me.addEventListener("blur", td_editing_conteinerEvent_reset);
*/ /* не робит норм */
		function edit_td_mousedown(event1) {
			td_with_edit_elementsList = td_with_editing_conteiner_at_the_moment.getElementsByTagName('*');
			click_is_out_of_edit_td = true;
			if (td_with_editing_conteiner_at_the_moment == event1.target) {
				click_is_out_of_edit_td = false;
			} else {
				for (var i = 0; i < td_with_edit_elementsList.length; i++) {
					if (td_with_edit_elementsList.item(i) == event1.target) {click_is_out_of_edit_td = false;
						break;
					}
				}
			}
			if (click_is_out_of_edit_td) {
				td_editing_conteinerEvent_reset(event1);
				return;
			}
			
			function chip__markEvent(event) {
				event.preventDefault();
				try {
					event.target.closest(".chip__mark").parentNode.removeChild(event.target.closest(".chip__mark"));
				} catch {}
			}
			document.querySelectorAll(".td-chips-conteiner .chip__mark").forEach(function callback(element, index, array) {
				element.addEventListener("dblclick", chip__markEvent);
			})

			var td_chips_conteiner = td_with_editing_conteiner_at_the_moment.querySelector(".td-chips-conteiner");

			if (event1.target == td_edit__right) {

				var chip__right = document.createElement('button');
				chip__right.className = "mark-button chip__mark chip__right";
				chip__right.setAttribute('type', 'button');
				chip__right.setAttribute('title', 'Метка верно');
				chip__right.innerHTML = "<span class='visually-hidden'>Метка верно</span>✓";
				td_chips_conteiner.appendChild(chip__right);
				chip__right.addEventListener("dblclick", chip__markEvent);

			} else if (event1.target == td_edit__wrong) {

				var chip__wrong = document.createElement('button');
				chip__wrong.className = "mark-button chip__mark chip__wrong";
				chip__wrong.setAttribute('type', 'button');
				chip__wrong.setAttribute('title', 'Метка неверно');
				chip__wrong.innerHTML = "<span class='visually-hidden'>Метка неверно</span>✘";
				td_chips_conteiner.appendChild(chip__wrong);
				chip__wrong.addEventListener("dblclick", chip__markEvent);

			} else if (event1.target == td_edit__eliminated) {

				var chip__eliminated = document.createElement('button');
				chip__eliminated.className = "mark-button chip__mark chip__eliminated";
				chip__eliminated.setAttribute('type', 'button');
				chip__eliminated.setAttribute('title', 'Метка устранено');
				chip__eliminated.innerHTML = "<span class='visually-hidden'>Метка устранено</span>У";
				td_chips_conteiner.appendChild(chip__eliminated);
				chip__eliminated.addEventListener("dblclick", chip__markEvent);
				
			} else if (event1.target == td_edit__accepted) {

				var chip__accepted = document.createElement('button');
				chip__accepted.className = "mark-button chip__mark chip__accepted";
				chip__accepted.setAttribute('type', 'button');
				chip__accepted.setAttribute('title', 'Метка мера принята');
				chip__accepted.innerHTML = "<span class='visually-hidden'>Метка мера принята</span>П";
				td_chips_conteiner.appendChild(chip__accepted);
				chip__accepted.addEventListener("dblclick", chip__markEvent);
				
			} else if (event1.target == td_edit__not_accepted) {

				var chip__not_accepted = document.createElement('button');
				chip__not_accepted.className = "mark-button chip__mark chip__not-accepted";
				chip__not_accepted.setAttribute('type', 'button');
				chip__not_accepted.setAttribute('title', 'Метка мера не принята');
				chip__not_accepted.innerHTML = "<span class='visually-hidden'>Метка мера не принята</span>нП";
				td_chips_conteiner.appendChild(chip__not_accepted);
				chip__not_accepted.addEventListener("dblclick", chip__markEvent);

				td_edit__not_accepted_note.classList.remove("visually-hidden");
				
			} else if (event1.target == td_edit__not_accepted_note) {

				var chip__note = document.createElement('button');
				chip__note.className = "mark-button chip__mark chip__note evaluation-note__anchor";
				chip__note.setAttribute('type', 'button');
				chip__note.setAttribute('title', 'Примечание');
				chip__note.innerHTML = "<span class='visually-hidden'>Примечание</span>*";
				td_chips_conteiner.appendChild(chip__note);
				chip__note.addEventListener("dblclick", chip__markEvent);

				var chip__note_content = document.createElement('div');
				chip__note_content.className = "chip__note-content evaluation__note";
				chip__note_content.innerHTML = "Мера не принята, т.к. ";
				td_chips_conteiner.appendChild(chip__note_content);

				td_edit__not_accepted_note.classList.add("visually-hidden");

			} else if (event1.target == td_edit__versions) {


			} else if (event1.target == td_edit__note) {

				var chip__note = document.createElement('button');
				chip__note.className = "mark-button chip__mark chip__note evaluation-note__anchor";
				chip__note.setAttribute('type', 'button');
				chip__note.setAttribute('title', 'Примечание');
				chip__note.innerHTML = "<span class='visually-hidden'>Примечание</span>*";
				td_chips_conteiner.appendChild(chip__note);
				chip__note.addEventListener("dblclick", chip__markEvent);

				var chip__note_content = document.createElement('div');
				chip__note_content.className = "chip__note-content evaluation__note";
				chip__note_content.innerHTML = "Примечание с замечанием или пожеланием";
				td_chips_conteiner.appendChild(chip__note_content);

			}
		}
		document.addEventListener("mousedown", edit_td_mousedown);
	}
}
custom_tdList.forEach(function callback(element, index, array) {
	element.addEventListener("mouseup", td_editing_conteinerEvent);
});
/*custom_td_content_wrap.forEach(function callback(element, index, array) {
	element.addEventListener("focus", td_editing_conteinerEvent);
});*/
/* /td-editing-conteiner */

/* control-measures-edit-conteiner */
var control_measures_edit__watchList = document.querySelectorAll(".control-measures-edit-conteiner .control-measures-edit__watch");
function control_measures_edit__watchEvent(event) {
	event.target.closest(".evaluation__control-measures").classList.toggle("evaluation__control-measures--tall");
}
control_measures_edit__watchList.forEach(function callback(element, index, array)
	{ element.addEventListener("mousedown", control_measures_edit__watchEvent); });
/* /control-measures-edit-conteiner */

/* evaluation__image */

/*full*/
/*/full*/

/*new*/
var image_edit__newList = document.querySelectorAll(".image-edit__new");
function image_edit__newEvent(event) {
	event.preventDefault();
	var curr_file_input = event.target.parentNode.parentNode.querySelector(".image-edit-change__file-input");
	console.log(event.target.parentNode.parentNode.querySelector(".image-edit-change__file-input"));
	console.log(event.target.parentNode);
	console.log(event.target);
	curr_file_input.click();
/* очень странно работает с потоками и случается страшный баг, который копит количество произошедших событий и каждое последующее событие выполняет столько раз, сколько событий уже было выполнено */
/*			.addEventListener("change",    */
	curr_file_input.onchange = function function_name(event1) {
		console.log(this.files);
		var files = this.files;
		if (!files.length) {
			console.log("No imgs loaded");
		} else {
			var key_wrap_for_img = curr_file_input.parentNode.parentNode.querySelector(".evaluation__image");
			window.URL = window.URL || window.webkitURL;
			for (let i = 0; i < files.length; i++) {
				var new_img = document.createElement("img");
				new_img.src = window.URL.createObjectURL(files[i]);
				new_img.setAttribute('alt', 'Изображение участка/оборудования');
				new_img.addEventListener("load", function function_name() {
					console.log("Load img successful");
					window.URL.revokeObjectURL(new_img.src);
				});
				key_wrap_for_img.appendChild(new_img);
			}
		}
	}
}
image_edit__newList.forEach(function callback(element, index, array)
	{ element.addEventListener("mousedown", image_edit__newEvent); });
/*/new*/

/*change*/
var image_edit_change__buttonList = document.querySelectorAll(".image-edit-change__button");
function image_edit_change__buttonEvent(event) {
	event.preventDefault();
	var curr_file_input = event.target.parentNode.parentNode.querySelector(".image-edit-change__file-input");
	curr_file_input.click();
/* очень странно работает с потоками и случается страшный баг, который копит количество произошедших событий и каждое последующее событие выполняет столько раз, сколько событий уже было выполнено */
/*			.addEventListener("change",    */
	curr_file_input.onchange = function function_name(event1) {
		console.log(this.files);
		var files = this.files;
		if (!files.length) {
			console.log("No imgs loaded");
		} else {
			curr_file_input.parentNode.parentNode.querySelectorAll(".evaluation__image img").forEach(function function_name(element, index, array)
				{ element.parentNode.removeChild(element); });
			var key_wrap_for_img = curr_file_input.parentNode.parentNode.querySelector(".evaluation__image");
			window.URL = window.URL || window.webkitURL;
			for (let i = 0; i < files.length; i++) {
				var new_img = document.createElement("img");
				new_img.src = window.URL.createObjectURL(files[i]);
				new_img.setAttribute('alt', 'Изображение участка/оборудования');
				new_img.addEventListener("load", function function_name() {
					console.log("Load img successful");
					window.URL.revokeObjectURL(new_img.src);
				});
				key_wrap_for_img.appendChild(new_img);
			}
		}
	}
}
image_edit_change__buttonList.forEach(function callback(element, index, array)
	{ element.addEventListener("mousedown", image_edit_change__buttonEvent); });
/*/change*/

/*delete*/
var image_edit__deleteList = document.querySelectorAll(".image-edit__delete");
function image_edit__deleteEvent(event) {
	var img_for_deletList = event.target.parentNode.parentNode.querySelectorAll(".evaluation__image img");
	img_for_deletList.forEach(function function_name(element, index, array)
		{ element.parentNode.removeChild(element); });
}
image_edit__deleteList.forEach(function callback(element, index, array)
	{ element.addEventListener("mousedown", image_edit__deleteEvent); });
/*/delete*/

/* /evaluation__image */

/* evaluation__select */
var evaluation__selectList = document.querySelectorAll(".evaluation__select");
evaluation__selectList.forEach(function callback(element, index, array){
	element.addEventListener("change", function function_name(event){
		if (event.target.value == "Свой вариант") {
			event.target.closest(".custom-th-td-content-wrapper").querySelector(".evaluation__input").classList.remove("disabled");
		} else { event.target.closest(".custom-th-td-content-wrapper").querySelector(".evaluation__input").classList.add("disabled"); }
	});
});
/* /evaluation__select */

} catch { console.log("Evaluation works not"); }
/* ------ /evaluation ------ */

/* ------ order ------ */
/* -- steps-slider -- */
try {
	var steps_slider = document.querySelector(".steps-slider");
	var steps_slider_buttons_conteinerList = steps_slider.querySelectorAll(".steps-slider-buttons-conteiner");
	var steps_slider__previousList = steps_slider.querySelectorAll(".steps-slider__previous");
	var steps_slider__nextList = steps_slider.querySelectorAll(".steps-slider__next");
	var steps_slider__itemList = steps_slider.querySelectorAll(".steps-slider__item");

	var steps_slider__pagination__itemListAll = steps_slider.querySelectorAll(".steps-slider__pagination__item");
	var steps_slider__pagination__itemList = new Array();
	var steps_slider__active_idx = null;
	
	steps_slider__pagination__itemListAll.forEach(function callback(element, index, array) {
		if (index > steps_slider__itemList.length - 1) { return; }
		if (element.classList.contains("steps-slider__pagination__item--active")) { steps_slider__active_idx = index; }
		else { steps_slider__itemList.item(index).classList.add("visually-hidden"); }
	});

	var steps_slider__item__active = steps_slider__itemList.item(steps_slider__active_idx);

	function steps_slider__previous_slide(){
		if (steps_slider__active_idx != 0) {

			var old_active = steps_slider__item__active;
			old_active.classList.add("slider_item_right_out");

			steps_slider_buttons_conteinerList.forEach(function callback(element, index, array) {
				element.querySelector(".steps-slider__pagination__item--active").classList.remove("steps-slider__pagination__item--active");
			});

			steps_slider__active_idx = steps_slider__active_idx - 1;

			steps_slider__item__active = steps_slider__itemList.item(steps_slider__active_idx);

			steps_slider__item__active.classList.remove("visually-hidden");
			steps_slider__item__active.classList.add("slider_item_left_in");

			steps_slider_buttons_conteinerList.forEach(function callback(element, index, array) {
				element.querySelectorAll(".steps-slider__pagination__item").item(steps_slider__active_idx).classList.add("steps-slider__pagination__item--active");
			});

			steps_slider__nextList.forEach(function callback(element, index, array) {
				element.classList.remove("disabled");
			});

			setTimeout(function() {
				steps_slider__item__active.classList.remove("slider_item_left_in");
			}, 285);
			setTimeout(function() {
				old_active.classList.remove("slider_item_right_out");
				old_active.classList.add("visually-hidden");
			}, 285);
		}
		if (steps_slider__active_idx == 0) {
			steps_slider__previousList.forEach(function callback(element, index, array) {
				element.classList.add("disabled");
			});
		} else {
			steps_slider__previousList.forEach(function callback(element, index, array) {
				element.classList.remove("disabled");
			});
		}
	}

	steps_slider__previousList.forEach(function callback(element, index, array) {
		element.addEventListener("click", function function_name(event) {
			event.preventDefault();
			steps_slider__previous_slide();
		});
	});

	function steps_slider__next_slide(){
		if (steps_slider__active_idx != steps_slider__itemList.length - 1) {

			var old_active = steps_slider__item__active;
			old_active.classList.add("slider_item_left_out");

			steps_slider_buttons_conteinerList.forEach(function callback(element, index, array) {
				element.querySelector(".steps-slider__pagination__item--active").classList.remove("steps-slider__pagination__item--active");
			});

			steps_slider__active_idx = steps_slider__active_idx + 1;

			steps_slider__item__active = steps_slider__itemList.item(steps_slider__active_idx);

			steps_slider__item__active.classList.remove("visually-hidden");
			steps_slider__item__active.classList.add("slider_item_right_in");

			steps_slider_buttons_conteinerList.forEach(function callback(element, index, array) {
				element.querySelectorAll(".steps-slider__pagination__item").item(steps_slider__active_idx).classList.add("steps-slider__pagination__item--active");
			});

			steps_slider__previousList.forEach(function callback(element, index, array) {
				element.classList.remove("disabled");
			});

			setTimeout(function() {
				steps_slider__item__active.classList.remove("slider_item_right_in");
			}, 285);
			setTimeout(function() {
				old_active.classList.remove("slider_item_left_out");
				old_active.classList.add("visually-hidden");
			}, 285);
		}

		if (steps_slider__active_idx == steps_slider__itemList.length - 1) {
			steps_slider__nextList.forEach(function callback(element, index, array) {
				element.classList.add("disabled");
			});
		} else {
			steps_slider__nextList.forEach(function callback(element, index, array) {
				element.classList.remove("disabled");
			});
		}
	}

	steps_slider__nextList.forEach(function callback(element, index, array) {
		element.addEventListener("click", function function_name(event) {
			event.preventDefault();
			steps_slider__next_slide();
		});
	});

	var steps_slider_buttons_conteiner = null;
	var steps_slider__clicked_idx = null;
	steps_slider__pagination__itemListAll.forEach(function callback(element, index, array) {
		element.addEventListener("click", function function_name(event) {
			event.preventDefault();
			steps_slider_buttons_conteiner = event.target.closest(".steps-slider-buttons-conteiner");
			steps_slider__pagination__itemList = steps_slider_buttons_conteiner.querySelectorAll(".steps-slider__pagination__item");
			for (var i = 0; i < steps_slider__pagination__itemList.length; i++) {
				if (steps_slider__pagination__itemList.item(i) == event.target) {
					steps_slider__clicked_idx = i;
					break;
				}
			}
			if ((steps_slider__clicked_idx - steps_slider__active_idx) > 0) {
			    var count_of_steps_to_go = steps_slider__clicked_idx - steps_slider__active_idx;
			    cycl_with_Timeout(286, count_of_steps_to_go, steps_slider__next_slide);
			} else if ((steps_slider__clicked_idx - steps_slider__active_idx) < 0) {
			    var count_of_steps_to_go = steps_slider__active_idx - steps_slider__clicked_idx;
			    cycl_with_Timeout(286, count_of_steps_to_go, steps_slider__previous_slide);
			}
		});
	});
	/* -- /steps-slider -- */

	/* -- next -- */
	document.querySelector(".introduction__next").addEventListener("click", steps_slider__next_slide);
	document.querySelector(".user-contacts__next").addEventListener("click", steps_slider__next_slide);
	document.querySelector(".pay__next").addEventListener("click", steps_slider__next_slide);
	document.querySelector(".type-of-company__next").addEventListener("click", steps_slider__next_slide);
	document.querySelector(".map-of-company-table__next").addEventListener("click", steps_slider__next_slide);
	document.querySelector(".map-of-company-model__next").addEventListener("click", steps_slider__next_slide);
	document.querySelector(".images-for-places-table__next").addEventListener("click", steps_slider__next_slide);
	document.querySelector(".images-for-places-model__next").addEventListener("click", steps_slider__next_slide);
	document.querySelector(".risks-table__next").addEventListener("click", steps_slider__next_slide);
	document.querySelector(".risks-model__next").addEventListener("click", steps_slider__next_slide);
	document.querySelector(".existing-measures-table__next").addEventListener("click", steps_slider__next_slide);
	document.querySelector(".existing-measures-model__next").addEventListener("click", steps_slider__next_slide);
	/* -- /next -- */

	/* -- submit заглушки */
	document.querySelector(".user-contacts__form").addEventListener("submit", function function_name(event) { event.preventDefault(); });
	document.querySelector(".pay__form").addEventListener("submit", function function_name(event) { event.preventDefault(); });
	document.querySelector(".type-of-company__form").addEventListener("submit", function function_name(event) { event.preventDefault(); }); 
	document.querySelectorAll(".evaluation__item").forEach(function callback(element, index, array) { element.addEventListener("submit", function function_name(event) { event.preventDefault(); }); });
	/* -- /submit заглушки */

	/* -- goto-pay -- */
	document.querySelector(".goto-pay").addEventListener("click", function function_name(event) {
		var steps_slider__target = document.querySelector(".pay");
		for (var i = 0; i < steps_slider__itemList.length; i++) {
			if (steps_slider__itemList.item(i) == steps_slider__target) { steps_slider__pagination__itemList[i].click(); }
		}
	});
	/* -- /goto-pay -- */

} catch { console.log("Order works not"); }

/* -- map-of-company__choose-conteiner --*/
try{
var map_of_company__choose_cont = document.querySelector(".map-of-company__choose-conteiner");
map_of_company__choose_cont.querySelector(".choose__add-check").addEventListener("click", function function_name(event) {
	toggle_check_on_templates_item_active();
});
document.querySelector(".choose__add-check").addEventListener("click", function function_name(event) {
	remove_check_on_templates_item_active();
});
map_of_company__choose_cont.querySelector(".choose__remove-check").addEventListener("click", function function_name(event) {
	remove_check_on_templates_item_active();
});
map_of_company__choose_cont.querySelector(".choose__add-templates-item").addEventListener("click", function function_name(event) {
	add_new_tempates_item();
});
}catch{}
/* -- /map-of-company__choose-conteiner --*/

/* ------ /order ------ */

/*после внесения новых шаблонов, названий, опасностей, работ, прерлагается внесение новых данных админу в профиле в раскрывающемся пункте списка рокументов юзера пор названием предложения к дефолтным вариантам*/
/*сделать в ордер, как в профиле рерактируемые названия цехов в модели*/