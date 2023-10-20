/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs.js */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_timer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer.js */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_classes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/classes.js */ "./src/js/modules/classes.js");
/* harmony import */ var _modules_forms_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms.js */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_modal_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal.js */ "./src/js/modules/modal.js");





Object(_modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
Object(_modules_timer_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
Object(_modules_classes_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
Object(_modules_forms_js__WEBPACK_IMPORTED_MODULE_3__["default"])();

/***/ }),

/***/ "./src/js/modules/classes.js":
/*!***********************************!*\
  !*** ./src/js/modules/classes.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const classesFunc = () => {
  // 1.0 Прежде, чем создавать наш шаблон рассмотрим нашу вёрстку, что нам необходимо для карточки товара: src для картинки, также alt для неё, название title, текст описания, и цена.
  // 1.1.0 Также запишем и метод конвертации валют, т.к. предполагается, что в будущем в нашей БД цена будет указана в $, а нам нужно в ₽.
  // 1.1.1 Итак, когда наш экземпляр будет создан, то нам из БД будет переданно какое-то число, которое отображает цену в $ и перед тем, как её отрисовать на странице её нужно будет конвертировать в ₽. Для этого нам нужен курс валют exchangeRate. В будущем можно сделать, чтобы он приходил динамически, но пока запишем статическое значение.
  // 1.1.2 Далее вызываем этот метод внутри конструктора, чтобы цена конвертировалась автоматически.
  // 1.2 Создаём в методе render() элемент, в который помещаем вёрстку карточки, дополненную теми данными, что приходят как аргументы и поместить этот элемент на страницу.
  // 1.3.0 Также нам нужно будет помещать элемент куда-то на страницу, а значит нужно получить родителя, например с классом ".container" (или другого). Для этого добавим ещё один аргумент "parentSelector".
  // 1.3.1 Соответственно нужно будет получить элемент со страницы куда будем пушать этот элемент. Мы добавим его в конструкторе, хотя сделать это можно было и в render(), но разницы особой нет. И через метод querySelector() получим его. Теперь у нас будет в свойстве parent лежать конкретный DOM-элемент родителя, в который будет помещаться наш экземпляр-элемент.
  // 1.3.2 С помощью append() помещаем наш новый элемент внутрь родительского.
  // 2.0.1 Также не забываем добавить его в свойства и что с ним нужно будет работать как с массивом.
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.RURexchangeRate = 98;
      this.convertToRUR();
    }

    convertToRUR() {
      this.price = +this.price * this.RURexchangeRate;
    } // * [1.2] *
    // * 2.0.0 Поработаем над улучшением динамического создания карточек. Мы могли бы присваивать CSS-класс нашему div’у, чтобы не плодить лишние теги, но также пойти дальше и с помощью rest-оператора позаботиться о возможных дополнительных классах, кастомизирующих наши последующие карточки. Для этого вернёмся к параметрам constructor [Ln 11] и используем rest-оператор.


    render() {
      const element = document.createElement('div'); // 2.0.2 Теперь, т.к. classes у нас массив, то нужно будет перебрать его как массив, вытащить каждое название CSS-класса и назначить создаваемому div’у.
      // 2.0.3 В итоге просто добавим последним свойством при создании экземпляра карточки необходимые классы. (см. ниже)
      // 2.0.4 Всё вроде бы хорошо, да только если забыть прописать CSS-класс "menu__item", то вёрстка у нас ломается. Можно себя от этого обезопасить условием. И так как если даже CSS-класс, который должен добавляться при создании экземпляра карточки не найден, то rest-оператор всё равно создаст пустой массив. Поэтому надо проверять именно длину массива. И если она будет равна 0, т.е. ни один из классов не передали, то ставим дефолтный класс.
      // 2.0.5 И запишем чуть более грамотно и запишем его в свойства, а то вдруг он нам ещё где-то понадобится. Таким образом ставим дефолтный CSS-класс, который запишем в свойство element и передадим его в качестве добавления класса в метод add().
      // 2.0.6 Но если у нас всё таки есть хотя бы один класс, то добавляем классы из массива созданного rest-оператором.

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total">
            <span>${this.price}</span> ₽/день
          </div>
        </div>
      `;
      this.parent.append(element);
    }

  } // 1.4.0 Итак, теперь, когда шаблон готом, можно приступить к созданию элементов. Можно было бы делать, как в предыдущем уроке по классам:

  /*   const div = new MenuCard();
  div.render(); */
  // 1.4.1 Однако, если мы хотим использовать что-то лишь один раз, то мы могли бы использовать следующий синтаксис. Таким образом он сработает раз и тут же удалится (на него нет ссылок), т.к. мы не присваиваем его никакой переменной.
  // 1.4.2 Далее передаём аргументы, как и прежде в уроке про классы. Т.к. здесь аргументов много, то отформатируем для лучшей читабельности на несколько строк.
  // ? 1.4.3 Здесь особое внимание ссылки на картинки и alt-атрибуты передаём прямо с "", ибо так правильнее.


  new MenuCard('img/tabs/vegy.jpg', 'vegy', 'Меню “Фитнес”', 'Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 7.5, '.menu .container', 'menu__item', 'test-class' // todo Этот класс можно удалить, создан для примера работы rest-оператора
  ).render(); // 1.5 Создадим ещё две подобные карточки:

  new MenuCard('img/tabs/elite.jpg', 'elite', 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 15, '.menu .container').render();
  new MenuCard('img/tabs/post.jpg', 'post', 'Меню “Постное”', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 11, '.menu .container').render(); // * 3.0 Работаем с NPM-пакетом JSON-server и локальной БД db.json
  // 3.1.0 В then() мы укажем, что мы берём ответ сервера "data" и превратим в обычный объект, с которым можно работать.

  fetch('http://localhost:3000/menu').then(data => data.json()).then(result => console.log(result)); // * 3.2.0 Но зачем же мы тогда устанавливали JSON-server, если мы могли бы просто пользоваться db.json для отображения данных? Дело в том, что тут нам пригодится массив "requests", куда мы будем записывать данные. Для этого нам нужна будет уже поддержка POST-запросов. И чтобы правильно их организовать в JSON-файле нам понадобится пакет JSON-server.
};

/* harmony default export */ __webpack_exports__["default"] = (classesFunc);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./src/js/modules/modal.js");


const formsFunc = () => {
  // * 1.0 Задача: взять несколько форм, которые есть на сайте и из них отправлять данные в файл server.php. Также мы знаем, что формы 2 и значит функционал будет повторяться.
  // 1.1 Чтобы вручную не создавать два одинаковых обработчика лучше их обернуть в функцию, которую потом просто вызывать при отправки формы.
  // ? Здесь всё ещё будет использоваться немного устаревший XmlHttpRequest, но через несколько уроков будет показан современный вариант.
  // 1.2 Сперва получим все формы.
  const forms = document.querySelectorAll('form'); // 1.3.0 Опишем функцию для отправки данных. Внутрь передадим атрибут для формы "form" (любой), на который навесим обработчик события, таким образом наша функция станет более универсальной.
  // 1.3.1 Используем событие "submit", которое срабатывает всякий раз, когда мы пытаемся отправить какую-то форму. Либо кликом по кнопке с type="submit", либо клавишей Enter, если она выделена, соответственно.
  // ? Кстати, если кнопка задана тегом <button>, то у неё автоматически стоит type="submit".
  // 1.3.2 Первым делом отменим стандартное поведение браузера.
  // 1.3.3 Создаём XMLHttpRequest. Добавляем настройки через open().
  // 1.3.4 Теперь как нам сделать так, чтобы все данные, которые пользователь ввёл в форме мы бы смогли получить в JS и отправить их на сервер? Самый простой способ подготовить для отправки такие данные из формы — использовать объект, который называется formData. Нам не всегда надо передавать в формате JSON, потому здесь рассмотрим 2 формата: 1) FormData & 2) JSON. Всё зависит от сервера и с чем работает бэкенд.
  // 1.3.5 Создадим собственно FormData и внутрь помести ту форму, из которой нам нужно собрать данные для отсылки на сервер.
  // ? Важно убедиться, что в input'ах всегда указан атрибут "name", иначе FormData не сможет его найти и взять его value, чтобы правильно сформировать объект.
  // 1.3.6 Также не забудем про заголовки. Только в отличии от JSON, Content-type у нас здесь поменялся на 'multipart/form-data'.
  // 1.3.7 С помощью send() отправим данные. Здесь у него уже есть "body" (тело объекта данных для отправки).
  // 1.3.8 Повесим обработчик события "load" (окончание загрузки) на наш запрос, сделаем проверку, что его статус - 200, т.е. "ОК".
  // ? По хорошему мы всегда должны оповещать нашего пользователя прошли ли данные на сервер успешно или они не прошли.

  /* 1.4.0 Создадим специальную переменную "message", куда запишем список тех фраз, которые мы покажем в различных ситуациях: 
        1) loading — когда запрос ещё не ушёл, но не оборвался и нет ошибки; 
        2) success — когда запрос успешно ушёл на сервер;
        3) failure - запрос не прошёл, что-то пошло не так.
  */
  // 1.4.1 Куда же мы будем помещать это сообщение? Частый приём это создание нового блока и туда мы выведем это сообщение. Т.е. динамически создаётся новый блок, который оповестит пользователя. Чаще всего он добавляется к форме. Создадим "div" при помощи createElement().
  // 1.4.2 Сперва мы отправим в "statusMessage.textContent" — "message.loading" и если у пользователя медленный интернет, то он увидит, что началась загрузка.
  // 1.4.3 При помощи append() добавим сообщение в форму.
  // 1.4.4 Также модифицируем textContent нашего statusMessage и в обработчике события "load", т.е. выведем сообщения об успехе, либо ошибке.
  // * 4.0 Чтобы вместо сообщения о загрузки вставить анимированную картинку загрузки просто впишем путь к ней свойству loading.
  // 4.1.0 Теперь нужно найти, где мы его использовали и вместо контейнера 'div' использовать 'img'.

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Упс, кажется что-то пошло не так! Попробуйте снова!'
  };

  const postData = form => {
    form.addEventListener('submit', evt => {
      evt.preventDefault(); // 4.1.1

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading; // Хотя разницы особенно нет, но как альтернативу можно использовать:
      // statusMessage.setAttribute('src', message.loading);
      // 4.1.2 Также нашей картинке загрузки понадобятся дополнительные CSS-свойства. Для записи сразу нескольких удобно использовать cssText.
      // ? 4.1.3 Конечно лучше было бы перенести эти стили в CSS-файл и добавлять класс, но для тренировки сделаем сейчас так.

      /*  statusMessage.style.cssText = `
        margin: 0 auto;
        display: block;
      `; */

      statusMessage.classList.add('loading');
      form.insertAdjacentElement('beforeend', statusMessage); // * ====== *
      // ! Когда мы используем связку XMLHttpRequest & FormData, то заголовок устанавливать не нужно. Он установится автоматически. Иначе могут быть ошибки и мы не получим на сервер данные.
      // request.setRequestHeader('Content-type', 'multipart/form-data');
      // * ====== *
      // * 1.6.0 Но что, если мы хотим отправить данные в формате JSON?
      // 1.6.1 Здесь нам уже понадобятся заголовки.

      /* request.setRequestHeader(
        'Content-type',
        'application/json; charset=utf-8'
      ); */
      // 1.6.2 Далее нам нужно объект FormData перевести в JSON.

      const formData = new FormData(form); // 1.6.3 Но просто так мы его не можем перевести в этот формат и нам нужно воспользоваться следующим распространённым приёмом: Создадим пустой объект.

      const object = {}; // 1.6.4 Переберём FormData при помощи метода forEach() и помести извлечённые из него данные в object{}.

      formData.forEach(function (value, key) {
        object[key] = value;
      }); // 1.6.5 Теперь, когда у нас собрался обычный объект, то мы можем осуществить с ним конвертацию в JSON.

      fetch('server.php', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(object)
      }).then(data => data.text()).then(data => {
        console.log(data);
        form.reset();
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        form.reset();
        showThanksModal(message.failure);
      }); // todo Вообще-то .finally() должно было работать, но с ним почему-то не работает "gulp build"

      /* .finally(() => {
          form.reset();
        }); */
      // ? Есть ещё один нюанс, связанный с бэкенд-разработкой. PHP нативно не умеет с форматом данных JSON и чаще всего такие данные будут отправляться на сервера с использованием NodeJS. Но тем не менее есть возможность поработать и в PHP-окружении с таким типом данных. (см. далее в server.php файле)

      /* request.addEventListener('load', () => {
        if (request.status === 200) {
          showThanksModal(message.success);
          form.reset(); // не забудем очистить форму, после отсылки данных на сервер
          statusMessage.remove();
        } else {
          showThanksModal(message.failure);
        }
      }); */
    });
  }; // 1.5 Берём массив со всеми формами и методом forEach() переберём их, и каждую обработаем функцией postData().


  forms.forEach(form => postData(form)); // * 2.0 Стоит задача красиво информировать пользователя об отсылки его данных в модальном окне. Для этого мы будем скрывать прежнее модальное окно и подставлять вместо него свеже созданное с другим контентом.
  // 2.1 Сперва получим модальное окно в переменную previousModalDialog.
  // 2.2 Скроем при помощи класса "hide предыдущий контент". (Именно скроем, а не удалим, ведь пользователь может снова открыть это модальное окно и тогда там должен быть показан этот контент.)
  // 2.3 Импортированная из modal.js openingModal() откроет наше новое модальное окно.
  // 2.4 Далее нам понадобится обёртка-div thanksModal и ей назначим нужные классы.
  // 2.5 Формируем вёрстку, которая будет в модальном окне с благодарностью пользователю.
  // 2.6 (см. modal.js)
  // 2.7 Теперь нужно отобразить пользователю само сообщение о статусе отправки. Его мы будем передавать как аргумент message. И этот аргумент вставляем в div.modal__title.

  function showThanksModal(message) {
    const originalModalDialog = document.querySelector('.modal__dialog');
    originalModalDialog.classList.add('hide');
    Object(_modal_js__WEBPACK_IMPORTED_MODULE_0__["openingModal"])();
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `; // 2.8 Не забудем добавить это всё в вёрстку. И т.к. в принципе это модальное окно нам нужно лишь раз, то можно обойтись без промежуточных переменных.

    document.querySelector('.modal').append(thanksModal); // * 3.0 Можно пойти ещё дальше и реализовать также функционал, что если пользователь вдруг захочет через какое-то время снова отправить форму, т.е. нам нужно, чтобы через какое-то время всё возвращалось к исходному состоянию. Блок с благодарностью исчезал, а предыдущая вёрстка формы вновь появлялась.

    setTimeout(() => {
      thanksModal.remove();
      Object(_modal_js__WEBPACK_IMPORTED_MODULE_0__["closingModal"])();
      originalModalDialog.classList.add('show');
      originalModalDialog.classList.remove('hide');
    }, 5000);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (formsFunc);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/*! exports provided: closingModal, openingModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closingModal", function() { return closingModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openingModal", function() { return openingModal; });
// 1.1 Сперва нам нужно найти в вёрстке триггеры, которые будут вызывать наше модальное окно. Триггеры это такие элементы на странице, которые запускают выполнение какого-то JS кода.
// 1.2 У них могут быть абсолютно разные классы или даже теги, поэтому частенько, чтобы пометить, что эти элементы у нас вызывают одно и то же действие, им назначаются какие-то определённые data-атрибуты. Например здесь логично будет всем триггером для модального окна дать атрибут "data-modal".
// 1.3 Похожая система будет также и с обратной ситуацией, когда нам нужно будет закрывать модальное окно. Этому элементу повесим data-close.
const modalTriggers = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'); // ? Тут также допустимо использование toggle.
// 1.5.1 Следуя DRY, мы заметили, что придётся снова повторить кусочек кода для закрытия модального окна, поэтому лучше вынести его в отдельную функцию.

const closingModal = () => {
  // modal.classList.toggle('show'); // - Вариант с toggle.
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = ''; // Не забываем после закрытие модального окна восстанавливать скролл на странице.
};
const openingModal = () => {
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden'; // Чтобы отключать возможность скролла при активном модальном окне.
  // Если модальное окно было открыто пользователем до истечения таймера, то оно больше не открывается по таймеру автоматически, чтобы не раздражать пользователя.
  // FIXME: Вернуть позже.

  clearInterval(modalTimerID);
};
modalTriggers.forEach(trigger => trigger.addEventListener('click', () => openingModal())); // 1.4 Пропишем функционал, чтобы можно было закрывать модальное окно по клику вне самого окна. Внутри проверим, если event.target (куда кликнул пользователь) строго не совпадает с областью модального окна, то мы закрываем окно.
// * 3.0 Добавим небольшое условие, чтобы в forms.js работала функция показа модального окна с благодарностью, точнее его динамически созданная кнопка закрытия окна "×". У нас уже есть, что если мы кликаем по элементу modal, то модальное окно закроется. Теперь добавим "или" у нас элемент, по которому кликнул пользователь, является кнопкой "×", т.е. имеет атрибут "data-close", то мы будем закрывать это модальное окно.
// 3.1 Теперь и в динамически созданном окне кнопка "×" будет работать.

modal.addEventListener('click', evt => {
  if (evt.target === modal || evt.target.getAttribute('data-close') === '') {
    closingModal();
  }
}); // ! А вот такой код считается плохой практикой и может не везде работать. К тому же мы нарушаем логику и читабельность кода другими разработчиками:

/* modal.addEventListener('click', () => {
    if (event.target === modal) {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }); */
// 1.5.1 Также нам нужен функционал, который будет закрывать модальное окно, если на клавиатуре будет нажата клавиша "Escape". Здесь нам понадобится событие keydown.
// 1.5.2 А также продумает такой момент, чтобы браузер реагировал на клавишу Escape и запускал наш код, только когда модальное окно у нас открыто.

document.addEventListener('keydown', evt => {
  if (evt.code === 'Escape' && modal.classList.contains('show')) {
    closingModal();
  }
}); // * 2.1 Представим, что у нас следующая задача - модальное окно должно появляться, когда пользователь долистал страницу до конца или через определённый промежуток времени.
// 2.2 Это очень частая задача на практике и потому рассмотрим её ниже.
// 2.3 Поработаем сначала со временем, зададим setTimeout, чтобы модалка вызвалась через, например 10 секунд.
// FIXME: Вернуть позже.

const modalTimerID = setTimeout(openingModal, 50000); // 2.4 Далее реализуем функционал, что если пользователь доскроллит страницу до конца, то мы покажем ему модальное окно. Вспомним те метрики, что мы изучили в "4-10-document-and-window", именно они нам сейчас для этой задачи пригодятся.
// 2.5 Чтобы отследить, что пользователь скроллит страницу мы можем использовать события 'scroll'.
// 2.6 Здесь можно использовать как вариант ещё одно специальное свойство pageYOffset - оно даёт нам информацию сколько пикселей от верхней кромки страницы пользователь отмотал вниз. Вспомним также уже изученное ранее свойство scrollHeight, которое отдаёт нам полную высоту элемента с учётом прокрутки, которая осталась сверху.
// 2.7 Чтобы рассчитать момент, когда пользователь доскроллил до конца нам пригодится простая математическая формула: возьмём свойство, отвечающее за прокрутку сверху, возьмём также свойство, отвечающее за высоту клиента, видимой его части и сравним ей с scrollHeight, т.е. с высотой полной прокрутки и видимой высотой контента. Если два этих значения будут совпадать, то значит пользователь долистал до конца.
// ? В некоторых браузерах может появляться баг, когда даже при полном скролле вниз страницы не появляется модальное окно. Это можно решить отняв 1 пиксель. Тогда модальное окно точно сработает везде.
// 2.8 Но тот факт, что окно появляется снова и снова, если мы отскроллим вверх и вернёмся тоже не совсем то, что нам нужно. Поэтому доработаем этот скрипт добавив настройки в обработчик событий после запятой, после стрелочной функции.
// ? Объект со свойством "once: true" означает, что этот обработчик сработает лишь 1 раз до перезагрузки страницы. Однако такой подход у нас не сработает, потому, что мы повесили обработчик на window, а это значит, что события происходит каждый раз, когда мы крутим колёсиком мыши. Поэтому только мы чуточку проскроллим и это событие исчезнет, но знать о нём всё же стоит, даже если здесь оно нам не подойдёт.
// 2.9.1 Однако мы могли бы удалить обработчик события сразу после того, как он выполнился. Создадим специальную функцию для этого.
// 2.9.2 Теперь внутри этой функции, после открытия впервые модального окна, удаляем обработчик события. И в скобках removeEventListener указываем чётко, что было назначено до того. Какое событие и какую функцию.
// 2.9.3 Сейчас, если пользователь доскроллил до конца страницы и увидел один раз модальное окно, сколько бы он не скроллил вверх и вниз, модалка уже не появится.

const showModalByScroll = () => {
  if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
    openingModal();
    window.removeEventListener('scroll', showModalByScroll);
  }
};

window.addEventListener('scroll', showModalByScroll); // |===:===:===:===>

/** links:
 *  https://www.toptal.com/developers/keycode
 * */

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const tabsFunc = () => {
  // 1. Получим: 1) все элементы "табы" меню, 2) контент, который к ним относится 3) и всю обёртку для использования делегирования. (А то ведь могут после нас ещё какие-то элементы меню добавиться и это необходимо учесть сразу.)
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabcontainer'); // 2. Функция скрывающая все ненужные нам табы. Переберём наш псевдо-массив через forEach().

  function hideTabContent() {
    // 2.1.1 Скроем контент у всех табов:
    // 2.1.2 Обратите внимание, что toggle() мы здесь использовать не можем, ибо начнётся неразбериха при переключении.
    tabsContent.forEach(content => {
      content.classList.add('hide');
      content.classList.remove('show', 'fade'); // не забудем также этот класс удалить, когда скрываем другие табы, чтобы в будущем эта анимация повторялась.
    }); // 2.2 Уберём у всех табов модификатор класса "_active":

    tabs.forEach(tab => {
      tab.classList.remove('tabheader__item_active');
    });
  } // 3. Функция будет показывать нам контент таба, по которому кликнул юзер.
  // 3.1.1 Здесь нужно понимать к какому элементу мы обращаемся и этот номер мы будем передавать в функцию как аргумент "index".
  // 3.1.2 Т.к. логично показывать при загрузки страницы первый слайд, то стандартным значением укажем 0, т.е. первый элемент коллекции.
  // 3.2 Не забудем добавить и класс активности.


  function showTabContent(index = 0) {
    tabsContent[index].classList.add('show', 'fade'); // при отображении также добавим анимацию fade, записанную в одноимённом классе.

    tabsContent[index].classList.remove('hide');
    tabs[index].classList.add('tabheader__item_active');
  } // 4.1 Итак, на родительский элемент нашего меню мы повесим обработчик событий, и сделаем так, что он будет распространятся по определённому условию на те его элементы, которые нам нужны.
  // ? Если мы часто используем evt.target, то можно его определить в переменную для сокращения кода.
  // 4.2 Запишем условие, что если есть evt.target, а также класс "tabheader__item", то будет происходить активация этого таба, т.е. показываться ему соответствующий контент.
  // 4.3 Чтобы это осуществить нам требуется узнать номер этого таба. И в этом поможет нам перебор. Мы переберём все табы, что лежат в tabs и сравним их индексы с тем, по которому кликнул пользователь и покажем его соответственно на странице.
  // 4.4


  tabsParent.addEventListener('click', evt => {
    const target = evt.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((tab, index) => {
        if (target == tab) {
          hideTabContent();
          showTabContent(index);
        } // Если элемент по которому юзер кликнул и элемент из коллекции tabs совпадут, то мы вызываем две функции, но в функцию, что показывает контент передаём индекс, который таба, по которому кликнули.

      });
    }
  });
  hideTabContent();
  showTabContent();
};

/* harmony default export */ __webpack_exports__["default"] = (tabsFunc);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const timerFunc = () => {
  // 1. Создадим переменную для определения какого-то дэдлайна и установим какую-то дату в виде строки.
  // ? Почему в виде строки? Да просто на практике очень часто такой функционал будет прикручен к админке, в которой менеджер или хозяин сайта сможет ввести дату, до которой должен считать наш таймер, а результат ввода будет выводится подобным значением и в виде строки.
  const DEADLINE = '2023-12-31'; // 2.1 Один из трёх столпов на котором будет держаться наш функционал это функция, которая будет определять разницу между дэдлайном и нашим текущим временем.
  // 2.2 В параметр endTime будет попадать именно значение дэдлайна, но со строкой мы конечно не сможем проводить математические операции, поэтому переведём её в числа. Используем метод Date.parse(), в котором получим количество миллисекунд, а потом вычтем текущее время в миллисекундах, также с методом Date.parse().
  // 2.3.1 Теперь эту разницу в миллисекундах нам требуется превращать в количество дней, часов, минут и секунд.
  // 2.3.2 В случае с днями всё довольно просто, нам нужно количество миллисекунд в дэдлайне разделить на количество миллисекунд в 24 часах, а также нужно будет результат округлить с помощью Math.floor(). Это округление до ближайшего целого значения. Мы берём наш timestamp делим на произведение 1000 миллисекунд 60 и 60 и 24 (так мы получаем количество миллисекунд в сутках).
  // 2.3.3 В случае с часами нам нужно разделить timestamps на количество миллисекунд в одном часе. И вот тут мы можем получить как подходящее количество часов (в пределах одних суток), так и например 100 или 1000 часов, что нам уже никак не подходит, ведь мы также считаем уже отдельно и дни. Поэтому здесь нам также понадобится модуль, оператор %, который делит что-то (в данном случае на 24) и получает остаток от деления.
  // 2.3.4 По принципу вычисления часов также находим и минуты с секундами.
  // 7 На случай, если наша дата "просрочена", т.е. раньше текущего числа, то нам следует выводить нули (или даже скрывать этот блок\выводить сообщение, что акция закончена, в зависимости от ТЗ). Но пока реализуем нули. Итак, ещё на этапе высчитывания разницы миллисекунд и занесения значения в "time", мы можем сделать проверку на отрицательное значение. И если оно будет отрицательным, то мы просто возвращаем нули. Мы даже сэкономим ресурсы пользователю и не будем рассчитывать дальнейшие временные данные, связанные с этим основным числом.

  const getTimeRemaining = endTime => {
    let days, hours, minutes, seconds;
    const time = Date.parse(endTime) - Date.parse(new Date());

    if (time <= 0) {
      // Тут мы можем вместо того, чтобы подставлять нули, например вывести какую-то вёрстку или убрать блок.
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(time / (1000 * 60 * 60 * 24)), hours = Math.floor(time / (1000 * 60 * 60) % 24), minutes = Math.floor(time / (1000 * 60) % 60), seconds = Math.floor(time / 1000 % 60);
    } // 2.4.1 Пока эти переменные существую только внутри этой функции и чтобы их вернуть в удобном виде наружу, чтобы как-то работать с полученными результатами, используем возвращение объекта.
    // 2.4.2 Первым у нас будет возвращаться свойство "total" со значением равным общему количеству оставшихся миллисекунд. Оно нам также понадобится, т.к. нам нужно точно знать, вдруг у нас таймер закончился. Ведь если он закончился, то здесь будет отрицательное значение, т.к. количество миллисекунда в текущей дате будет больше, чем установленной в дэдлайне.


    return {
      total: time,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }; // 6 Чтобы у нас подставлялся 0 к значениям < 10, нам требуется проверить их на значение и подставим 0. И хотя мы тут число превращаем в строку, но в данном случае это роли никакой не играет, т.к. эту строчку мы поместим через textContent на страницу и ошибки не будет. Но теперь значение будет модифицировано, когда нам это необходимо. Для этого создадим небольшую функцию-помощника, которая будет этим заниматься.


  const addZero = num => {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }; // 3.1 Создадим функцию, которая будет заполнять вёрстку нашего таймера, основываясь на полученных из getTimeRemaining() данных. В атрибуты нам понадобится родительский элемент (".timer") и собственно дэдлайн, который мы будем в неё передавать.
  // 3.2 Занесём в переменную timer родительский элемент таймера selector, чтобы в будущем можно создавать ещё какие-то таймеры на странице, сделаем эту функцию универсальной.


  const setTimer = (selector, endTime) => {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'); // 4.1 Третья функция будет обновлять наш таймер каждую секунду.
    // 4.2 Эта функция во-первых будет рассчитывать количество миллисекунд, которое осталось на текущий момент. (time)
    // 4.3 Помещаем данные в вёрстку безопасным способом textContent. Для этого забираем данные из переменной time, в которую был записан результатом действий функции getTimeRemaining() объект с интересующими нас данными времени.
    // 4.4 Ну и запускать эту функцию нам требуется каждую секунду. Для этого нам нужно создать переменную timeInterval и внесём в неё одноимённую конструкцию временного интервала, который будет запускать нужную нам функцию через 1 секунду.
    // 4.5 Но теперь, коли есть интервал, то нужно будет его когда-нибудь остановить. Для этого запишем условие в updateTimer(), что если в объекте time, его свойстве "total" (оставшееся количество миллисекунд до дэдлайна) <= 0, то таймер остановится.

    const updateTimer = () => {
      const time = getTimeRemaining(endTime);
      days.textContent = addZero(time.days);
      hours.textContent = addZero(time.hours);
      minutes.textContent = addZero(time.minutes);
      seconds.textContent = addZero(time.seconds);

      if (time.total <= 0) {
        clearInterval(timeInterval);
      }
    }; // 5 Чтобы не таймер не перепрыгивал через секунду со значений вбитых по умолчанию в вёрстке, а сразу появлялся с нужными значениями, то следует вызвать функцию ещё до интервала.


    updateTimer();
    const timeInterval = setInterval(updateTimer, 1000);
  };

  getTimeRemaining();
  setTimer('.timer', DEADLINE);
};

/* harmony default export */ __webpack_exports__["default"] = (timerFunc);

/***/ })

/******/ });
//# sourceMappingURL=script.js.map