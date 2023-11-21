const closingModal = (modalSelector) => {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
};

const openingModal = (modalSelector, modalTimerID) => {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  if (modalTimerID) {
    clearInterval(modalTimerID);
  }
};

function modal(triggerSelector, modalSelector, modalTimerID) {
  const modalTriggers = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

  modalTriggers.forEach(trigger =>
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
export { openingModal };
export { closingModal };