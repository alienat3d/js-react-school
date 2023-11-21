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

export default modal;
// Т.к. эти две функции ниже также используются в формах, то вынесем их за пределы modal и экспортируем отдельно.
export { openingModal };
export { closingModal };