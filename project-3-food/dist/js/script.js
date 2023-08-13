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

Object(_modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__["tabsFunc"])();

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/*! exports provided: tabsFunc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabsFunc", function() { return tabsFunc; });
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

/***/ })

/******/ });
//# sourceMappingURL=script.js.map