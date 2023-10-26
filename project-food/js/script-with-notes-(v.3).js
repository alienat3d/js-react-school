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
/* const getData = async (url) => {
  const result = await fetch(url);
  
  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  return await result.json();
}; */

// FIXME: Можно вернуть, если не хотим использовать axios.
/* getData('http://localhost:3000/menu').then((data) =>
  data.forEach(({ img, altimg, title, descr, price }) =>
    new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
  )
); */

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
// eslint-disable-next-line no-undef
axios.get('http://localhost:3000/menu').then((response) => {
  response.data.forEach(({ img, altimg, title, descr, price }) =>
    new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
  );
});

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
// * 10.0.0 Теперь мы сделаем более продвинутый слайдер-карусель.
// 10.1.0 Для начала нам нужна в HTML дополнительная обёртка (.offer__slider-inner), делается это для того, чтобы эта обёртка была как бы "окошком", через которое мы видим текущий слайд. Слово "окошко" было выбрано не просто так, дело в том, что у нас также есть родительская обёртка (.offer__slider-wrapper) и ей мы назначим CSS-свойство "overflow: hidden;" — значит всё, что не подходит под размеры этой обёртки будет скрываться. Ну а следующий блок (.offer__slider-wrapper), который обернёт все слайды будет в виде карусели и займёт столько места, сколько у нас слайдов в ширину, если поставить их рядом друг с другом. Например, если у нас 4 слайда, то он будет занимать 400% от ширины одного слайда.
// 10.1.1 И когда мы будем нажимать кнопки предыдущего и следующего слайда, то слайды будут просто сдвигаться влево или вправо. Происходить это будет при помощи свойства "translate".
// 10.2 Нам понадобятся переменные для главной обёртки и внутренней slidesWrapper & slidesField.
// * 10.3 а также width — которая будет хранить ширину окошка, видимой области слайдера. Её мы получим через метод глобального объекта window getComputedStyle(). Внутрь этого метода поместим тот блок, чью ширину мы хотим получить, т.е. slidesWrapper. Ну и чтобы получить из объекта со всеми CSS-стилями элемента именно ширину укажем ".width".
const slidesWrapper = document.querySelector('.offer__slider-wrapper'),
  slidesField = slidesWrapper.querySelector('.offer__slider-inner'),
  sliderImages = slidesWrapper.querySelectorAll('.offer__slide'),
  prevSlideBtn = document.querySelector('.offer__slider-prev'),
  nextSlideBtn = document.querySelector('.offer__slider-next'),
  currentSlideCounter = document.querySelector('#current'),
  totalSlidesCounter = document.querySelector('#total'),
  width = window.getComputedStyle(slidesWrapper).width;

let slideIndex = 1,
  offset = 0;
// 10.10.0 Ровно, как и в предыдущем слайдере (см. script-with-notes-(v.2).js) нам нужно сделать проверку, что если слайдов у нас меньше 10, то нам нужно подставлять 0 перед значением, а если 10 или более просто записывать их количество соответственно.
// 10.10.1 Однако нам также нужно учесть и обозначение текущего номера слайда.
// 10.10.2 Также и при клике на кнопках, листающих слайдер, нужно учесть изменение значения slideIndex. (см. ниже)
if (sliderImages.length < 10) {
  totalSlidesCounter.textContent = `0${sliderImages.length}`;
  currentSlideCounter.textContent = `0${slideIndex}`;
} else {
  totalSlidesCounter.textContent = sliderImages.length;
  currentSlideCounter.textContent = slideIndex;
}

// 10.4 Установим ширину внутренней обёртке равно 100% * кол-во всех слайдов. Не забудем конкатенировать и знак "%", т.к. мы устанавливаем CSS свойство, где это будет необходимо.
slidesField.style.width = 100 * sliderImages.length + '%';

// 10.5 Слайды, которые будут помещаться внутрь могут быть разной ширины, если она где-то не зафиксирована. Поэтому продумаем и это и каждому из слайдов установим фиксированную ширину, как у нашего окошка.
sliderImages.forEach((slide) => (slide.style.width = width));

// todo 10.6 Следующим шагом будет добавить стиль (_offer.scss) "display: flex;" нашей обёртке slidesField, чтобы все слайды выстроились в одну строчку. А также добавим свойство "transition" для плавного передвижения слайдов.

// 10.7 Теперь, чтобы сдвигать наши слайды, используем свойство translate. Чтобы корректно сдвигать слайды нам нужен какой-то ориентир, например отступ, чтобы знать, насколько мы уже сдвинули вправо или влево. Для этого создадим новую переменную offset.
// 10.8.0 Назначаем обработчики события для передвижения слайдов. Тут понадобится чуточку математики. Прежде всего, когда пользователь кликнет на кнопку "стрелка вправо", то слайд должен сдвинуться влево. Чтобы сдвинуть элемент влево, то используем отрицательное значение translate по горизонтальной оси X.
// 10.8.1 Однако нам также пригодится механизм изменения offset и его проверки. Поэтому, когда мы двигаем слайдер влево, то нам нужно предусмотреть его поведение, когда он достигнет самого крайнего правого своего края. В этом случае нам нужно возвращать слайде в начальное положение. Т.е. translateX возвращаем в 0.
// 10.8.2 Но только в переменной у нас лежит какое-то значение в строковом виде данных (например "500px"), а нам нужно числовое для расчётов и обрезать "px". И здесь есть как минимум два варианта решения этой задачи: 1) поработать с ней, как со строкой и обрезать ненужные нам "px"; 2) использовать регулярные выражения, и он был бы лаконичнее, но т.к. эту темы мы пока на текущий момент не прошли, то воспользуемся первым способом.
// 10.8.3 Поставим унарный +, чтобы превратить в числовой тип данных и применим метод строк slice(), который обрезает определённую часть строки и мы укажем в нём, что нам нужна строка с 0 и два последних символа не должны включаться. Теперь у нас останется только число, которое уже нормально рассчитается по формуле.
// 10.8.4 Если же это не последний слайд, то добавляем смещение во второй части условия после else. Проще говоря, когда мы кликнем стрелку вправо, то к offset будет прибавляться ещё одна ширина 1 слайда и таким образом он будет смещаться влево.
nextSlideBtn.addEventListener('click', () => {
  if (
    offset ===
    +width.slice(0, width.length - 2) * (sliderImages.length - 1)
  ) {
    offset = 0;
  } else {
    offset += +width.slice(0, width.length - 2);
  }

  slidesField.style.transform = `translateX(-${offset}px)`;
  // 10.10.3 Итак, создадим условие, что если slideIndex сравнялся с количеством всех слайдов (т.е. находится на последнем из них), то присвоим ему 1. Ну а если ещё не сравнялся, то прибавим единицу.
  if (slideIndex === sliderImages.length) {
    slideIndex = 1;
  } else {
    slideIndex++;
  }
  // 10.10.4 Теперь запишем значение slideIndex в наш блок отображения текущего слайда.
  if (sliderImages.length < 10) {
    currentSlideCounter.textContent = `0${slideIndex}`;
  } else {
    currentSlideCounter.textContent = slideIndex;
  }
});

prevSlideBtn.addEventListener('click', () => {
  if (offset === 0) {
    offset = +width.slice(0, width.length - 2) * (sliderImages.length - 1);
  } else {
    offset -= +width.slice(0, width.length - 2);
  }

  slidesField.style.transform = `translateX(-${offset}px)`;
  // 10.9 Тоже самое сделаем и для кнопки слайдера "стрелка влево", только с обратной логикой.
  if (slideIndex === 1) {
    slideIndex = sliderImages.length;
  } else {
    slideIndex--;
  }

  if (sliderImages.length < 10) {
    currentSlideCounter.textContent = `0${slideIndex}`;
  } else {
    currentSlideCounter.textContent = slideIndex;
  }
});

/* const showSlide = (n) => {
  if (n > sliderImages.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = sliderImages.length;
  }

  sliderImages.forEach((element) => element.classList.add('hide'));

  sliderImages[slideIndex - 1].classList.remove('hide');

  if (sliderImages.length < 10) {
    currentSlideCounter.textContent = `0${slideIndex}`;
  } else {
    currentSlideCounter.textContent = slideIndex;
  }
};

showSlide(slideIndex);

const changeSlide = n => showSlide((slideIndex += n));

prevSlideBtn.addEventListener('click', () => changeSlide(-1));

nextSlideBtn.addEventListener('click', () => changeSlide(1));

if (sliderImages.length < 10) {
  totalSlidesCounter.textContent = `0${sliderImages.length}`;
} else {
  totalSlidesCounter.textContent = sliderImages.length;
} */
