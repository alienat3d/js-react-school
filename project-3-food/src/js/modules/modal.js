const modalFunc = () => {
  // 1.1 Сперва нам нужно найти в вёрстке триггеры, которые будут вызывать наше модальное окно. Триггеры это такие элементы на странице, которые запускают выполнение какого-то JS кода.
  // 1.2 У них могут быть абсолютно разные классы или даже теги, поэтому частенько, чтобы пометить, что эти элементы у нас вызывают одно и то же действие, им назначаются какие-то определённые data-атрибуты. Например здесь логично будет всем триггером для модального окна дать атрибут "data-modal".
  // 1.3 Похожая система будет также и с обратной ситуацией, когда нам нужно будет закрывать модальное окно. Этому элементу повесим data-close.
  const modalTriggers = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseButton = modal.querySelector('.modal__close');

  // ? Тут также допустимо использование toggle.
  // 1.5.1 Следуя DRY, мы заметили, что придётся снова повторить кусочек кода для закрытия модального окна, поэтому лучше вынести его в отдельную функцию.
  const closingModal = () => {
    // modal.classList.toggle('show'); // - Вариант с toggle.
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Не забываем после закрытие модального окна восстанавливать скролл на странице.
  };

  modalTriggers.forEach((trigger) =>
    trigger.addEventListener('click', () => {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden'; // Чтобы отключать возможность скролла при активном модальном окне.
    })
  );
  // 1.5.2 Заметим, что здесь мы сократили запись.
  modalCloseButton.addEventListener('click', () => closingModal());

  // 1.4 Пропишем функционал, чтобы можно было закрывать модальное окно по клику вне самого окна. Внутри проверим, если event.target (куда кликнул пользователь) строго не совпадает с областью модального окна, то мы закрываем окно.
  modal.addEventListener('click', (evt) => {
    if (evt.target === modal) {
      closingModal();
    }
  });
  // ! А вот такой код считается плохой практикой и может не везде работать. К тому же мы нарушаем логику и читабельность кода другими разработчиками:
  /* modal.addEventListener('click', () => {
    if (event.target === modal) {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }); */
  // 1.5.1 Также нам нужен функционал, который будет закрывать модальное окно, если на клавиатуре будет нажата клавиша "Escape". Здесь нам понадобится событие keydown. 
  // 1.5.2 А также продумает такой момент, чтобы браузер реагировал на клавишу Escape и запускал наш код, только когда модальное окно у нас открыто.
  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape' && modal.classList.contains('show')) {
      closingModal();
    }
  });
};

export default modalFunc;

// |===:===:===:===>
/** links:
 *  https://www.toptal.com/developers/keycode
 * */