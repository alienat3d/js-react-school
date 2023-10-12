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
/* harmony import */ var _modules_modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal.js */ "./src/js/modules/modal.js");



Object(_modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
Object(_modules_timer_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
Object(_modules_modal_js__WEBPACK_IMPORTED_MODULE_2__["default"])();

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const modalFunc = () => {
  // 1.1 Сперва нам нужно найти в вёрстке триггеры, которые будут вызывать наше модальное окно. Триггеры это такие элементы на странице, которые запускают выполнение какого-то JS кода.
  // 1.2 У них могут быть абсолютно разные классы или даже теги, поэтому частенько, чтобы пометить, что эти элементы у нас вызывают одно и то же действие, им назначаются какие-то определённые data-атрибуты. Например здесь логично будет всем триггером для модального окна дать атрибут "data-modal".
  // 1.3 Похожая система будет также и с обратной ситуацией, когда нам нужно будет закрывать модальное окно. Этому элементу повесим data-close.
  const modalTriggers = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseButton = modal.querySelector('.modal__close'); // ? Тут также допустимо использование toggle.
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

    clearInterval(modalTimerID);
  };

  modalTriggers.forEach(trigger => trigger.addEventListener('click', () => openingModal())); // 1.5.2 Заметим, что здесь мы сократили запись.

  modalCloseButton.addEventListener('click', () => closingModal()); // 1.4 Пропишем функционал, чтобы можно было закрывать модальное окно по клику вне самого окна. Внутри проверим, если event.target (куда кликнул пользователь) строго не совпадает с областью модального окна, то мы закрываем окно.

  modal.addEventListener('click', evt => {
    if (evt.target === modal) {
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

  const modalTimerID = setTimeout(openingModal, 10000); // 2.4 Далее реализуем функционал, что если пользователь доскроллит страницу до конца, то мы покажем ему модальное окно. Вспомним те метрики, что мы изучили в "4-10-document-and-window", именно они нам сейчас для этой задачи пригодятся.
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

  window.addEventListener('scroll', showModalByScroll);
};

/* harmony default export */ __webpack_exports__["default"] = (modalFunc); // |===:===:===:===>

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