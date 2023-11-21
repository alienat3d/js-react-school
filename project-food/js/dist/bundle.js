/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// * Можно заметить, что в калькуляторе очень много разных селекторов и параметров. Да и калькуляторы очень редко похожи друг на друга, вряд ли придётся его переиспользовать, скорее всего проще будет переписать, используя этот за основу. Потому оставим его как есть.
function calc() {
  const result = document.querySelector('.calculating__result > span'),
    inputHeight = document.querySelector('#height'),
    inputWeight = document.querySelector('#weight'),
    inputAge = document.querySelector('#age');

  let gender, height, weight, age, ratio;

  if (localStorage.getItem('gender')) {
    gender = localStorage.getItem('gender');
  } else {
    gender = 'female';
    localStorage.setItem('gender', 'female');
  }
  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }
  if (localStorage.getItem('height')) {
    height = localStorage.getItem('height');
    inputHeight.value = height;
  }
  if (localStorage.getItem('weight')) {
    weight = localStorage.getItem('weight');
    inputWeight.value = weight;
  }
  if (localStorage.getItem('age')) {
    age = localStorage.getItem('age');
    inputAge.value = age;
  }

  const calcTotal = () => {
    if (!gender || !height || !weight || !age || !ratio) {
      result.innerHTML = '<img class="calculating__no-data-img" src="./img/calc/no-data.gif" />';
      return;
    }

    if (gender === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  };

  const getStaticInfo = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
      element.addEventListener('click', (evt) => {
        if (evt.target.getAttribute('data-ratio')) {
          ratio = +evt.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +evt.target.getAttribute('data-ratio'));
        } else {
          gender = evt.target.getAttribute('id');
          localStorage.setItem('gender', evt.target.getAttribute('id'));
        }

        elements.forEach(element => {
          element.classList.remove(activeClass);
        });

        evt.target.classList.add(activeClass);

        calcTotal();
      });
    });
  };

  const getDynamicInfo = (selector) => {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
      if (input.value.match(/\D/g || 0)) {
        input.classList.add('input-error');
      } else {
        input.classList.remove('input-error');
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          localStorage.setItem('height', +input.value);
          break;
        case 'weight':
          weight = +input.value;
          localStorage.setItem('weight', +input.value);
          break;
        case 'age':
          age = +input.value;
          localStorage.setItem('age', +input.value);
          break;
      }

      calcTotal();
    });
  };

  const initLocalSettings = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
      element.classList.remove(activeClass);

      if (element.getAttribute('id') === localStorage.getItem('gender')) {
        element.classList.add(activeClass);
      }
      if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        element.classList.add(activeClass);
      }
    });

    calcTotal();
  };

  getStaticInfo('#gender div', 'calculating__choose-item_active');
  getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');
  getDynamicInfo('#height');
  getDynamicInfo('#weight');
  getDynamicInfo('#age');
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
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
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
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
  }

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/menu').then((data) =>
    data.forEach(({ img, altimg, title, descr, price }) =>
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
    )
  );

  // * *==*  *==* * //
  // ? Доп. вариант динамического создания карточек с меню.
  /* getData('http://localhost:3000/menu').then((data) => createCard(data));
  
  data.forEach(({ img, altimg, title, descr, price }) => {
    const element = document.createElement('div');
  
    element.classList.add('menu__item');
  
    element.innerHTML = `
        <img src=${img} alt=${altimg}>
        <h3 class="menu__item-subtitle">${title}</h3>
        <div class="menu__item-descr">${descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total">
            <span>${price * 98}</span> ₽/день
          </div>
        </div>
      `;
  
    document.querySelector('.menu .container').append(element);
  }); */

  // * *==*  *==* * //
  // FIXME: Comment if don't need to use axios lib.
  // eslint-disable-next-line no-undef
  /* axios.get('http://localhost:3000/menu').then((response) => {
    response.data.forEach(({ img, altimg, title, descr, price }) =>
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
    );
  }); */
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerID) {
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Упс, кажется что-то пошло не так! Попробуйте снова!',
  };

  const bindPostData = (form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      let statusMessage = document.createElement('img');

      statusMessage.src = message.loading;

      statusMessage.classList.add('loading');

      form.insertAdjacentElement('beforeend', statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  };

  forms.forEach((form) => bindPostData(form));

  function showThanksModal(message) {
    const originalModalDialog = document.querySelector('.modal__dialog');

    originalModalDialog.classList.add('hide');

    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openingModal)('.modal', modalTimerID);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closingModal)('.modal');
      originalModalDialog.classList.add('show');
      originalModalDialog.classList.remove('hide');
    }, 5000);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closingModal: () => (/* binding */ closingModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openingModal: () => (/* binding */ openingModal)
/* harmony export */ });
const closingModal = (modalSelector) => {
  const modal = document.querySelector(modalSelector);
  
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
};
// * 2.0 Если модуль openingModal() работает с "modalTimerID", то вероятно нам требуется его получить в качестве аргумента.
// * 2.1 Т.к. это понадобится не в каждом случае, то мы предупредительно напишем условие, что если этот ID был передан или вообще существует, то только в таком случае будем запускать clearInterval().
const openingModal = (modalSelector, modalTimerID) => {
  const modal = document.querySelector(modalSelector);
  
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  console.log(modalTimerID);
  if (modalTimerID) {
    clearInterval(modalTimerID);
  }
};
// * 1.0 Для того, чтобы функция была гибкой и универсальной создадим два аргумента и на их место при вызове будем ставить нужные нам классы и атрибуты уже в main.js.
// 2.2 Т.к. в функции modal() у нас также вызываются функции openingModal() & closingModal(), то в modal() также надо передать ID таймера (modalTimerID), который будет создаваться. Его мы будет передавать внутри функции modal() везде, где будет вызываться openingModal().
// ? 2.3 Но откуда же будет приходить этот ID таймера в modalTimerID? Предполагаем, что раз он будет использоваться здесь в нескольких местах, а также будет использоваться и в forms.js, то удобнее всего его будет создавать в глобальном файле main.js.
function modal(triggerSelector, modalSelector, modalTimerID) {
  const modalTriggers = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);
  // * 1.1 Обратим внимание, что т.к. функцию нужно запускать не сразу, а только по клику, то перед ней необходима стрелочная callback-функция.
  modalTriggers.forEach((trigger) =>
    trigger.addEventListener('click', () => openingModal(modalSelector, modalTimerID))
  );

  modal.addEventListener('click', (evt) => {
    if (evt.target === modal || evt.target.getAttribute('data-close') === '') {
      closingModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape' && modal.classList.contains('show')) {
      closingModal(modalSelector);
    }
  });

  const showModalByScroll = () => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openingModal(modalSelector, modalTimerID);
      window.removeEventListener('scroll', showModalByScroll);
    }
  };

  window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);
// Т.к. эти две функции ниже также используются в формах, то вынесем их за пределы modal и экспортируем отдельно.



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// * Здесь, пользуясь примером других популярных библиотек-слайдеров, мы будем использовать деструктуризацию, передавать объект с настройками.
/* 
container = slider;
slide = sliderImages;
prevBtn = prevSlideBtn;
nextBtn = nextSlideBtn;
totalCounter = totalSlidesCounter;
currentCounter = currentSlideCounter;
wrapper = slidesWrapper;
field = slidesField;
*/
// ? В слайдерах может быть огромное количество параметров. Ещё могут передаваться настройки автопереключения, свайпа, драга и пр.
// * Теперь, когда мы использовали деструктуризацию, то в файле main.js мы можем в объекте настроек записывать все настройки в виде свойств-значений в абсолютно любом порядке.
function slider({container, slide, prevBtn, nextBtn, totalCounter, currentCounter, wrapper, field}) {
  const slider = document.querySelector(container),
    slidesWrapper = slider.querySelector(wrapper),
    slidesField = slidesWrapper.querySelector(field),
    sliderImages = slidesWrapper.querySelectorAll(slide),
    prevSlideBtn = slider.querySelector(prevBtn),
    nextSlideBtn = slider.querySelector(nextBtn),
    currentSlideCounter = slider.querySelector(currentCounter),
    totalSlidesCounter = slider.querySelector(totalCounter),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1,
    offset = 0;

  const indicators = document.createElement('ol'),
    dots = [];

  indicators.classList.add('carousel-indicators');

  slider.append(indicators);

  const settingActiveDot = () => {
    dots.forEach(dot => dot.style.opacity = '0.5');
    dots[slideIndex - 1].style.opacity = 1;
  };

  const addingZero = (element, number) => {
    if (sliderImages.length < 10) { element.textContent = `0${number}`; }
    else { element.textContent = number; }
  };

  const getDigitsOnly = (str) => +str.replace(/\D/g, '');

  for (let index = 0; index < sliderImages.length; index++) {
    const dot = document.createElement('li');

    dot.classList.add('dot');
    dot.setAttribute('data-slide-to', index + 1);

    if (index === 0) { dot.style.opacity = 1; }

    indicators.append(dot);
    dots.push(dot);
  }

  addingZero(totalSlidesCounter, sliderImages.length);
  addingZero(currentSlideCounter, slideIndex);

  if (sliderImages.length < 10) {
    totalSlidesCounter.textContent = `0${sliderImages.length}`;
    currentSlideCounter.textContent = `0${slideIndex}`;
  } else {
    totalSlidesCounter.textContent = sliderImages.length;
    currentSlideCounter.textContent = slideIndex;
  }

  slidesField.style.width = 100 * sliderImages.length + '%';

  sliderImages.forEach((slide) => (slide.style.width = width));

  nextSlideBtn.addEventListener('click', () => {
    if (offset === getDigitsOnly(width) * (sliderImages.length - 1)) {
      offset = 0;
    } else {
      offset += getDigitsOnly(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === sliderImages.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    addingZero(currentSlideCounter, slideIndex);
    settingActiveDot();

    dots.forEach(dot => {
      dot.addEventListener('click', (evt) => {
        const slideTo = evt.target.getAttribute('data-slide-to');
        slideIndex = slideTo;
        offset = getDigitsOnly(width) * (slideTo - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;
        addingZero(currentSlideCounter, slideIndex);
        settingActiveDot();
      });
    });
  });
  prevSlideBtn.addEventListener('click', () => {
    if (offset === 0) {
      offset = getDigitsOnly(width) * (sliderImages.length - 1);
    } else {
      offset -= getDigitsOnly(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === 1) {
      slideIndex = sliderImages.length;
    } else {
      slideIndex--;
    }

    addingZero(currentSlideCounter, slideIndex);
    settingActiveDot();
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach((content) => {
      content.classList.add('hide');
      content.classList.remove('show', 'fade');
    });

    tabs.forEach((tab) => tab.classList.remove(activeClass));
  }

  function showTabContent(index = 0) {
    tabsContent[index].classList.add('show', 'fade');
    tabsContent[index].classList.remove('hide');
    tabs[index].classList.add(activeClass);
  }

  tabsParent.addEventListener('click', (evt) => {
    const target = evt.target;

    // Чтобы не было ошибки нужно не забыть убрать точку методом slice(1).
    // if (target && target.classList.contains('tabheader__item')) {
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((tab, index) => {
        if (target == tab) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });

  hideTabContent();
  showTabContent();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {

  const getTimeRemaining = (endTime) => {
    let days, hours, minutes, seconds;
    const time = Date.parse(endTime) - Date.parse(new Date());

    if (time <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      (days = Math.floor(time / (1000 * 60 * 60 * 24))), (hours = Math.floor((time / (1000 * 60 * 60)) % 24)), (minutes = Math.floor((time / (1000 * 60)) % 60)), (seconds = Math.floor((time / 1000) % 60));
    }

    return {
      total: time,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  };

  const addZero = (num) => {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  const setTimer = (selector, endTime) => {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds');

    const updateTimer = () => {
      const time = getTimeRemaining(endTime);

      days.textContent = addZero(time.days);
      hours.textContent = addZero(time.hours);
      minutes.textContent = addZero(time.minutes);
      seconds.textContent = addZero(time.seconds);

      if (time.total <= 0) {
        clearInterval(timeInterval);
      }
    };

    updateTimer();

    const timeInterval = setInterval(updateTimer, 1000);
  };

  getTimeRemaining();
  setTimer(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getData: () => (/* binding */ getData),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const result = await fetch(url, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=utf-8' },
    body: data,
  });

  return await result.json();
};

const getData = async (url) => {
  const result = await fetch(url);

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  return await result.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









// FIXME: Сильно увеличил время, чтобы не мешало разработке.
const modalTimerID = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openingModal)('.modal', modalTimerID), 50000);

(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabcontainer', 'tabheader__item_active');
(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerID);
(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2023-12-31');
(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
(0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerID);
(0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
  container: '.offer__slider',
  nextBtn: '.offer__slider-next',
  prevBtn: '.offer__slider-prev',
  field: '.offer__slider-inner',
  slide: '.offer__slide',
  totalCounter: '#total',
  currentCounter: '#current',
  wrapper: '.offer__slider-wrapper',
});
(0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map