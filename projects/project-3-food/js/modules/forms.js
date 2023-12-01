import { openingModal, closingModal } from './modal';
import { postData } from '../services/services';

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

    openingModal('.modal', modalTimerID);

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
      closingModal('.modal');
      originalModalDialog.classList.add('show');
      originalModalDialog.classList.remove('hide');
    }, 5000);
  }
}

export default forms;