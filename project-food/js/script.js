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
    (days = Math.floor(time / (1000 * 60 * 60 * 24))),
    (hours = Math.floor((time / (1000 * 60 * 60)) % 24)),
    (minutes = Math.floor((time / (1000 * 60)) % 60)),
    (seconds = Math.floor((time / 1000) % 60));
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

new MenuCard(
  'img/tabs/vegy.jpg',
  'vegy',
  'Меню “Фитнес”',
  'Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  7.5,
  '.menu .container',
  'menu__item',
  'test-class' // todo Этот класс можно удалить, создан для примера работы rest-оператора
).render();
new MenuCard(
  'img/tabs/elite.jpg',
  'elite',
  'Меню “Премиум”',
  'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  15,
  '.menu .container'
).render();
new MenuCard(
  'img/tabs/post.jpg',
  'post',
  'Меню “Постное”',
  'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  11,
  '.menu .container'
).render();

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

// todo 5.0.0 До этого мы привязывали [см. forms.js] к каждой форме одинаковые действия, но в реальности они могут сильно отличаться. Может поменяться например URL, на который мы ссылаемся. (Например, одна форма ведёт на server.php, другая на какой-нибудь mail.php и т.д.)
// ? 5.0.1 Также от сервера могут приходить данные в разных форматах и соответственно использоваться разные заголовки и т.д. Поэтому всегда есть смысл выносить функционал общения с сервером в отдельные функции.
// 5.0.2 Для того, чтобы сделать функцию универсальный используем атрибуты url (собственно сам путь к серверу, с которым мы хотим взаимодействовать) и data (тело с данными, которые мы будем отправлять).
// 5.0.3 Мы могли бы позже также внести тип данных в качестве атрибута, но пока оставим его JSON.
// 5.0.4 Теперь, когда мы вернём промис "result", то сразу обработаем его как JSON-формат. Кстати, возвращаем мы промис, чтобы можно было по цепочке then() его дальше обработать, как мы делали раньше.
// ! 5.0.5 Но, важное замечание, здесь можно наделать ошибок, если забыть, что всё это у нас будет асинхронная функция и она не будет ждать остальные части кода. Так как fetch() даёт нам только промис, т.е. буквально "обещание" отдать какие-то данные, когда их получит. Но когда это произойдёт не понятно. Далее создаётся переменная result и туда сперва помещается промис из которого ещё ничего не вернулось и потому ниже при обработки её методом json() может возникнуть ошибка.
// * 5.0.6 Поэтому нам необходимо предусмотреть механизм, который будет нам превращать асинхронный код в синхронный. Ну или хотя бы его подобие, чтобы он сперва дожидался ответа сервера. Причём нужно сделать это в двух местах: там где отправляет и там где получает данные.
// * 5.0.7 "Async \ Await" - именно для подобных задач и был придуман этот оператор "async"\"await".
// 5.0.8 Сперва мы запишем "async" перед какой-то функцией, обозначив, что внутри функции будет асинхронный код.
// 5.0.9 Далее мы ставим его парный оператор "await" и его мы уже ставим перед теми операциями, которые нам необходимо дождаться.
// 5.0.10 Теперь, когда запустится код, оператор "async" сигнализирует JS ориентироваться на парные операторы "await" и ожидать сперва выполнения кода, который последует за ним, прежде, чем переходить к следующим частям кода.
// 5.0.11 И здесь наш асинхронный кусок кода начинает быть похожим на синхронный (хотя на самом деле он не блокирует код дальше, а просто JS будет ожидать окончание запроса (по умолчанию 30 сек.) и потом пропустит работу скрипта дальше).
// 5.0.12 Во втором случае мы также не знаем насколько большой объект нам придёт на обработку JSON в JS-объект и нам нужно также подождать его обработку.
// todo 5.0.13 Теперь, когда функция готова импортируем её в forms.js
// todo 5.0.14 Не забываем прописать атрибуты url & data в скобках и всё, можно удалять старую часть кода (пока закомментируем для наглядности).
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

    /*     const object = {};

    formData.forEach(function (value, key) {
      object[key] = value;
    }); */
    // * *==* *** *==* * //
    // ? 6.0.0 Кстати, есть более элегантный способ преобразить formData в JSON. Для этого используются методы, которые появились сравнительно не так давно.
    // 6.0.1 Сперва, как и прежде указываем метод stringify(), однако дальше с formData всё немного иначе. У него есть специальный метод entries() - он возвращает массив собственных перечисляемых свойств указанного объекта. [Более подробно с примером см. 39-entries.js]
    // 6.1.0 Итак, когда мы обратимся к formData через метод entries(), то мы получим данные в формате матрицы (массив с массивами).
    // 6.1.1 Далее превращаем этот массив обратно в объект. И здесь нам поможет метод fromEntries().
    // 6.1.2 Итак подытожим, что здесь происходит: мы сперва превращаем formData в массив массивов методом entries(), чтобы можно было с ней работать, потом трансформируем обратно в JS-объект методом fromEntries() и в итоге превращаем JS-объект в JSON при помощи stringify().
    const json = JSON.stringify(Object.fromEntries(formData.entries()));
    console.log(json);
    // * *==* *** *==* * //
    // todo 5.0.0 До этого мы привязывали к каждой форме одинаковые действия, но в реальности они могут сильно отличаться. Может поменяться например URL, на который мы ссылаемся. (Например, одна форма ведёт на server.php, другая на какой-нибудь mail.php и т.д.)
    // ? 5.0.1 Также от сервера могут приходить данные в разных форматах и соответственно использоваться разные заголовки и т.д. Поэтому всегда есть смысл выносить функционал общения с сервером в отдельные функции.
    //
    /*  fetch('server.php', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=utf-8' },
        body: JSON.stringify(object),
      }) */
    // * 5.1 Кстати, т.к. у нас теперь запущен JSON-server, то обращаться мы можем уже не к server.php, а к базе данных JSON и URL, который был создан при помощи этого сервера.
    // 5.3 Теперь все запросы будут записываться в специальном массиве в базе данных (файл db.json), которые мы можем потом как-то дальше использовать.
    // postData('http://localhost:3000/requests', JSON.stringify(object))
    // 6.2 Дальше мы просто отправляем этот json на сервер.
    postData('http://localhost:3000/requests', json)
      .then((data) => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      })
      .catch(() => {
        showThanksModal(message.failure);
      })
      // todo Вообще-то .finally() должно было работать, но с ним почему-то не работает "gulp build"
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
