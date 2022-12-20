import {hideIfEsc} from './util-upload-form.js';

const ALERT_SHOW_TIME = 5000;

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isCorrectLength = (string, maxLength = 140) => string.length <= maxLength;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showSuccessMessage = () => {
  const success = document.querySelector('#success').content.cloneNode(true);

  const closeModal = (evt) => {
    if (evt.keyCode === 27) {
      document.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', closeModal);
      document.querySelector('.success').remove();
    } else if (evt.type === 'click') {
      const successInner = evt.target.closest('.success__inner');
      const successButton = evt.target.closest('.success__button');

      if ((successInner && successButton) || (!successInner && !successButton)) {
        document.removeEventListener('click', closeModal);
        document.removeEventListener('keydown', closeModal);
        document.querySelector('.success').remove();
      }
    }
  };
  document.removeEventListener('keydown', hideIfEsc);
  document.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
  document.body.append(success);
};

const showErrorMessage = () => {
  const error = document.querySelector('#error').content.cloneNode(true);

  const closeModal = (evt) => {
    if (evt.keyCode === 27) {
      document.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', closeModal);
      document.querySelector('.error').remove();
      document.addEventListener('keydown', hideIfEsc);
      document.querySelector('.img-upload__form').classList.remove('hidden');
    } else if (evt.type === 'click') {
      const errorInner = evt.target.closest('.error__inner');
      const errorButton = evt.target.closest('.error__button');

      if ((errorInner && errorButton) || (!errorInner && !errorButton)) {
        document.removeEventListener('click', closeModal);
        document.removeEventListener('keydown', closeModal);
        document.querySelector('.error').remove();
        document.addEventListener('keydown', hideIfEsc);
        document.querySelector('.img-upload__form').classList.remove('hidden');
      }
    }
  };
  document.querySelector('.img-upload__form').classList.add('hidden');
  document.removeEventListener('keydown', hideIfEsc);
  document.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
  document.body.append(error);
};

const debounce = (callback, timeoutDelay = 500) =>{
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export {getRandomPositiveInteger, isCorrectLength, showAlert, showSuccessMessage, showErrorMessage, debounce, shuffleArray};
