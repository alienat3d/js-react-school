function modal() {
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
  const modalTimerID = setTimeout(openingModal, 50000);

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
}

module.exports = modal;