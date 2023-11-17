'use strict';
// * === Tabs === * \\

const tabs = document.querySelectorAll('.tabheader__item'),
  tabsContent = document.querySelectorAll('.tabcontent'),
  tabsParent = document.querySelector('.tabcontainer');

function hideTabContent() {
  tabsContent.forEach((content) => {
    content.classList.add('hide');
    content.classList.remove('show', 'fade');
  });

  tabs.forEach((tab) => tab.classList.remove('tabheader__item_active'));
}

function showTabContent(index = 0) {
  tabsContent[index].classList.add('show', 'fade');
  tabsContent[index].classList.remove('hide');
  tabs[index].classList.add('tabheader__item_active');
}

tabsParent.addEventListener('click', (evt) => {
  const target = evt.target;

  if (target && target.classList.contains('tabheader__item')) {
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

// * === Timer === * \\

const DEADLINE = '2023-12-31';

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
setTimer('.timer', DEADLINE);

// * === Classes === * \\

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

// * == getData == * \\

// FIXME: Вернуть, если не хотим использовать axios.
const getData = async (url) => {
  const result = await fetch(url);

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  return await result.json();
};

// FIXME: Можно вернуть, если не хотим использовать axios.
getData('http://localhost:3000/menu').then((data) =>
  data.forEach(({ img, altimg, title, descr, price }) =>
    new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
  )
);

// * *==* *** *==* * //
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
// * *==* *** *==* * //
// FIXME: Comment if don't need to use axios lib.
// eslint-disable-next-line no-undef
/* axios.get('http://localhost:3000/menu').then((response) => {
  response.data.forEach(({ img, altimg, title, descr, price }) =>
    new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
  );
}); */

// * == Modal == * \\

const modalTriggers = document.querySelectorAll('[data-modal]'),
  modal = document.querySelector('.modal');

const closingModal = () => {
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
};
const openingModal = () => {
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  clearInterval(modalTimerID);
};

modalTriggers.forEach((trigger) =>
  trigger.addEventListener('click', () => openingModal())
);

modal.addEventListener('click', (evt) => {
  if (evt.target === modal || evt.target.getAttribute('data-close') === '') {
    closingModal();
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.code === 'Escape' && modal.classList.contains('show')) {
    closingModal();
  }
});

// FIXME: Сильно увеличил время, чтобы не мешало разработке.
const modalTimerID = setTimeout(openingModal, 500000);

const showModalByScroll = () => {
  if (
    window.scrollY + document.documentElement.clientHeight >=
    document.documentElement.scrollHeight - 1
  ) {
    openingModal();
    window.removeEventListener('scroll', showModalByScroll);
  }
};

window.addEventListener('scroll', showModalByScroll);

// * == postData == * \\

const postData = async (url, data) => {
  const result = await fetch(url, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=utf-8' },
    body: data,
  });

  return await result.json();
};

// * === Forms === * \\

const forms = document.querySelectorAll('form');

const message = {
  loading: 'img/form/spinner.svg',
  success: 'Спасибо! Скоро мы с вами свяжемся!',
  failure: 'Упс, кажется что-то пошло не так! Попробуйте снова!',
};

const bindPostData = (form) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const statusMessage = document.createElement('img');

    statusMessage.src = message.loading;

    statusMessage.classList.add('loading');
    form.insertAdjacentElement('beforeend', statusMessage);

    const formData = new FormData(form);

    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    postData('http://localhost:3000/requests', json)
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

  openingModal();

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
    closingModal();
    originalModalDialog.classList.add('show');
    originalModalDialog.classList.remove('hide');
  }, 5000);
}

// * === Делаем slider-карусель своими руками === * \\

const slider = document.querySelector('.offer__slider'),
  slidesWrapper = slider.querySelector('.offer__slider-wrapper'),
  slidesField = slidesWrapper.querySelector('.offer__slider-inner'),
  sliderImages = slidesWrapper.querySelectorAll('.offer__slide'),
  prevSlideBtn = slider.querySelector('.offer__slider-prev'),
  nextSlideBtn = slider.querySelector('.offer__slider-next'),
  currentSlideCounter = slider.querySelector('#current'),
  totalSlidesCounter = slider.querySelector('#total'),
  width = window.getComputedStyle(slidesWrapper).width;

let slideIndex = 1,
  offset = 0;

// 11.2 Создадим также обёртку для всех наших "dots", чтобы потом её стилизовать. Также добавим её в слайдер методом append().
const indicators = document.createElement('ol'),
  dots = [];

indicators.classList.add('carousel-indicators');

slider.append(indicators);

const settingActiveDot = () => {
  dots.forEach(dot => dot.style.opacity = '0.5');
  dots[slideIndex - 1].style.opacity = 1;
};

const addingZero = (element, number) => {
  if (sliderImages.length < 10) {
    element.textContent = `0${number}`;
  } else {
    element.textContent = number;
  }
};

const getDigitsOnly = (str) => +str.replace(/\D/g, '');

// * 11.3.0 Теперь, основываясь на количестве слайдов нужно создать количество "dots" для слайдера. Воспользуемся здесь для разнообразия самым обычным циклом, который давно уже не использовали. 
// 11.3.1 Мы зададим, что наш цикл закончится тогда, когда закончатся слайды (index < slides.length).
// 11.3.2 А ещё нам нужно установить какой-то атрибут методом setAttribute(), чтобы связать точки со слайдами. Другими словами мы каждой точке установим уникальный дата-атрибут с нумерацией, начиная с 1.
// 11.3.3 Добавляем каждую точку с append() в общий блок с "dots".

// * 11.4.0 Также нужно как-то выделить тот «dot», слайд которого сейчас мы видим. Для этого можно было бы прописать отдельный класс в CSS, но для тренировки пропишем его через JS.
// 11.4.1 Мы можем написать проверку, исходя из которой определить какая из точек должна быть сейчас активна и тогда назначить ей класс активности.
// 11.4.2 Т.к. изначально класс активности у нас равен 1, то и ориентироваться мы можем на него. Теперь у нас первый dot будет ярче остальных.
// 11.4.3 Но нам нужно, чтобы они также подсвечивались динамично, в зависимости от слайда, что мы видим. Для этого нужно все dots поместить в какую-то структуру. Для этого создадим вспомогательный пустой массив dots.
for (let index = 0; index < sliderImages.length; index++) {
  const dot = document.createElement('li');

  dot.classList.add('dot');
  dot.setAttribute('data-slide-to', index + 1);

  if (index === 0) {
    dot.style.opacity = 1;
  }

  indicators.append(dot);
  // 11.4.3 И когда мы уже добавили точки на страницу, то мы будем помещать её и в массив dots. Таким образом у нас будем ещё и массив с этими dots, с которым можно работать. Работать это будет похожим образом, как и в самом простом варианте слайдера. (см. ниже)
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

// 11.4.4 Теперь в обработчиках событий мы также работаем и с dots. Мы возьмём массив dots, переберём его при помощи forEach() и укажем, что каждой точки мы изначально установим прозрачность на значение "0.5". А вот dot с текущим индексом получит opacity = 1; .
// * 12.0 Немного модифицируем код, заменив метод slice на регулярное выражение. Такой способ более выгоден не только потому, что replace() в принципе более интуитивно понятен, чем slice(), но и мы себя обезопасили на случай, если к нам придёт какое-то значение не с 2-мя, а с 3-мя символами, например. Регулярка отсечёт всё, что не является цифрами и мы уже не привязаны здесь к количеству символов после значения.
nextSlideBtn.addEventListener('click', () => {
  if (
    offset ===
    // +width.slice(0, width.length - 2) * (sliderImages.length - 1)
    getDigitsOnly(width) * (sliderImages.length - 1)
  ) {
    offset = 0;
  } else {
    // offset += +width.slice(0, width.length - 2);
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
  // * 11.5.0 Осталось добавить функционал клика по dots для перехода на нужный слайд. Здесь нужно учесть сразу несколько факторов: 1) нам нужно менять переменную offset, 2) контролировать индикатор текущего слайды сверху, 3) устанавливать нужный slideIndex.
  // 11.5.1 Сперва переберём массив dots и каждой повесим обработчик события. Будем использовать объект события, ведь, как мы помним, у каждой из точек есть атрибут "data-slide-to", который нам надо получить и на него мы будем потом ориентироваться.
  // 11.5.2 В slideIndex запишем значение атрибута slideTo.
  // 11.5.3 Также в offset мы рассчитываем ширину, взяв прежнюю логику, но заменим sliderImages.length на slideTo.
  // 11.5.4 Также не забудем сделать и смещение слайдера при помощи transform translateX, что мы уже писали ранее.
  // 11.5.5 Не забудем также про индикатор текущего слайда и про dots.
  dots.forEach(dot => {
    dot.addEventListener('click', (evt) => {
      const slideTo = evt.target.getAttribute('data-slide-to');

      slideIndex = slideTo;

      // offset = +width.slice(0, width.length - 2) * (slideTo - 1);
      offset = getDigitsOnly(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      addingZero(currentSlideCounter, slideIndex);
      settingActiveDot();
    });
  });
});
// 11.4.5 Повторим тоже самое и для кнопки слайдера "стрелка влево".
prevSlideBtn.addEventListener('click', () => {
  if (offset === 0) {
    // offset = +width.slice(0, width.length - 2) * (sliderImages.length - 1);
    offset = getDigitsOnly(width) * (sliderImages.length - 1);
  } else {
    // offset -= +width.slice(0, width.length - 2);
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

// * 11.0 Добавим ещё одну такую популярную модификацию слайдеру «dots» (или «точки»). Точки мы будем добавлять скриптом без модификации HTML и будут расположены снизу нашего слайдера
/* 11.1 Если создать алгоритм создания "dots" на странице, то у нас будут следующие пункты:
  1) Нужно получить как элемент весь слайдер, а не только wrapper, потому что в него включаются индикаторы и другие какие-то элементы;
  2) Установить ему "position: relative;", т.к. "dots" будут в зависимости от него спозиционированны под этим слайдером.
  3) Далее создадим обёртку для "dots";
  4) При помощи цикла или метода перебора создадим количество точек, которое будет равно количеству наших слайдов;
  5) Каждой точке установим какой-то атрибут, чтобы "привязать" конкретные точки к определённым слайдам;
  6) Добавим одной из точек класс "active", чтобы понимать какой именно слайд сейчас активен;
  7) По клику по каждой из точек она будет перемещать нас на привязанный к ней слайд.
*/
// * >===== Калькулятор калорий =====< * \\
// ? Данные и формулы расчётов были взяты со страницы: https://fitseven.ru/zdorovie/metabolism/sutochnaya-norma-kaloriy
// * 13.0 Сперва создадим переменную, куда будем записывать все результаты вычислений result.
const result = document.querySelector('.calculating__result > span');
let gender = 'female', 
  height, 
  weight, 
  age, 
  ratio = '1.375';

// 13.1.0 Функция, которая будет подсчитывать конечный результат.
// 13.1.1 Здесь нужно удостовериться, что были введены все данные, ведь если какого-то значения не будет, то никакие расчёты у нас уже вестись не будут. Этот момент в калькуляторах всегда надо предусматривать. Пропишем условие, что, если хотя бы одна из переменных будет в значении false, то и функция не будет выполняться. Отправляем в результат точки и прерываем функцию ключевым словом "return".
// 13.2.1 Также учитываем, что наша формула отличается для мужчин и для женщин, поэтому нужно ориентироваться на то, какой пол выбрал пользователь и в зависимости от этого рассчитываем по одной или другой формуле.
const calcTotal = () => {
  if (!gender || !height || !weight || !age || !ratio) {
    result.innerHTML = '<img class="calculating__no-data-img" src="./img/calc/no-data.gif" />';
    // result.textContent = '... ';
    return;
  }

  if (gender === 'female') {
    result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
  } else {
    result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
  }
};

// 13.3.0 Создадим отдельную функцию для кликов по кнопкам выбора пола и активности, которая будет получать статическую информацию с этих кнопок. Нам также понадобятся атрибуты "parentSelector" для выбора блока, к которому будет применяться данная функция. И атрибут "activeClass" для назначения класса активности.
// 13.3.1 Получим элементы блока в elements.
// 13.3.2 Теперь нам необходимо отслеживать клики по родительскому элементу, который содержит все div'ы. Делегирование событий здесь будет как раз кстати. Повесим обработчик события на родительский блок и не забудем указать объект события.
// 13.3.3 Подходим к такому интересному моменту, что у нас два разных блока, с которыми будет работать данная функция (gender & ratio [пол и активность]). Они отличаются тем, из чего мы получаем информацию. Если это блок "активность", то мы обращаемся к data-атрибуту "data-ratio", а если это блок "пол", то мы обращаемся к значению id каждой из опций. Можно написать простое условие, что если у блока, на который мы кликнули, есть определённый атрибут (например data-ratio), то будет изменяться переменная ratio. А если такого атрибута нет, то берём значение id.
// 13.3.4 Итак, если пользователь кликнул по блоку, в котором есть атрибут "data-ratio", то значение этого атрибута будет записано в переменную ratio.
// 13.3.5 Ну и соответственно не найдя такого атрибута, JS будет забирать значение из id, т.к. очевидно, что пользователь кликнул по блоку выбора пола.
// 13.3.6 Также нам нужно учесть, что после клика пользователем на одну из опций, она должна окрашиваться зелёным цветом, т.е. присваиваться класс активности. Для этого используем следующую схему: сперва уберём класс активности у всех элементов, а затем добавляем только тому, по которому пользователь только что кликнул.
const getStaticInfo = (parentSelector, activeClass) => {
  const elements = document.querySelectorAll(`${parentSelector} div`);

  elements.forEach(element => {
    element.addEventListener('click', (evt) => {
      if (evt.target.getAttribute('data-ratio')) {
        ratio = +evt.target.getAttribute('data-ratio');
      } else {
        gender = evt.target.getAttribute('id');
      }

      elements.forEach(element => {
        element.classList.remove(activeClass);
      });

      evt.target.classList.add(activeClass);

      calcTotal();
    });
  });
};


// 13.4.0 Теперь наша задача создать функцию, которая будет обрабатывать каждый отдельный input, куда пользователь должен будет ввести какие-то данные для расчёта калорий.
// 13.4.1 Эта функция уже будет принимать лишь 1 аргумент — тот селектор инпута, с которым и будет работать.
// 13.4.2 Также нам нужно проверять с какой именно переменной будет работать данный инпут, т.е. в данный момент пользователь вводит свой рост, вес или возраст. Здесь уместно будет использовать конструкцию switch-case. При помощи неё можно проверить соответствие строки. У каждого из инпутов также есть свой уникальный id, поэтому, когда что-то вводится в один из инпутов, мы можем проверить его id, и есть он будет в значении "height", то мы запишем введённые пользователем данные в переменную height. Если в значении "weight" — в переменную "weight" и т.д. Таким образом, мы получим разветвлённое на 3 условие.
// 13.4.3 В switch запишем то, что мы проверяем — атрибут id инпутов. А внутри уже проверим на строку. Сперва у нас идёт "height" и если это действительно инпут с данными о росте, то берём эту переменную и записываем значение, которое ввёл пользователь. После чего останавливаем функцию оператором "break". Ну, а если это был не "height", то скрипт игнорирует и переходит к следующему case.
// 13.5 Ещё у нас есть функция calcTotal(), которая должна вызываться всякий раз, когда происходят изменения на странице.
// 13.6 Теперь займёмся валидацией. Нам нужно предусмотреть также случаи, когда пользователь ввёл в поле неправильное значение. Там нужно как-то ему об этом сообщить. Для примера сделаем красную обводку вокруг инпута. Здесь для проверки будет также удобно использовать регулярное выражение.
const getDynamicInfo = (selector) => {
  const input = document.querySelector(selector);

  input.addEventListener('input', () => {
    if (input.value.match(/\D/g || input.value === '')) {
      input.classList.add('input-error');
    } else {
      input.classList.remove('input-error');
    }

    switch (input.getAttribute('id')) {
      case 'height':
        height = +input.value;
        break;
      case 'weight':
        weight = +input.value;
        break;
      case 'age':
        age = +input.value;
        break;
    }

    calcTotal();
  });
};

getStaticInfo('#gender', 'calculating__choose-item_active');
getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');
getDynamicInfo('#height');
getDynamicInfo('#weight');
getDynamicInfo('#age');

// * 14.0.0 Поработаем с localStorage. Представим, что у нас есть задача — выбранные и введённые ранее пользователем данные должны сохраняться у него в Local Storage, чтобы ему не приходилось их вводить снова и снова при каждом заходе на сайт.