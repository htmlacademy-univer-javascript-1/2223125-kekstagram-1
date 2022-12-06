/* eslint-disable no-console */
import {isCorrectLength} from './util.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadPreview = uploadForm.querySelector('.img-upload__preview').querySelector('img');
const imgSize = uploadOverlay.querySelector('.scale__control--value');
const imgEffectLevel = uploadOverlay.querySelector('.effect-level__value');
const imgHashtagsElement = uploadOverlay.querySelector('.text__hashtags');
const imgCommentElement = uploadOverlay.querySelector('.text__description');
const uploadCancelButton = uploadOverlay.querySelector('.img-upload__cancel');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'form__error'
}, false);

uploadFile.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  const file = uploadFile.files[0];
  const reader = new FileReader();
  reader.onload = (evt) => {
    uploadPreview.src = evt.target.result;
  };
  reader.readAsDataURL(file);

  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      evt.stopPropagation();
      uploadOverlay.classList.add('hidden');
      body.classList.remove('modal-open');
      uploadPreview.src = 'img/upload-default-image.jpg';
      imgSize.value = '55%';
      imgEffectLevel.value = '';
      imgHashtagsElement.value = '';
      imgCommentElement.value = '';
    }
  });
});

uploadCancelButton.addEventListener('click', () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadPreview.src = 'img/upload-default-image.jpg';
  imgSize.value = '55%';
  imgEffectLevel.value = '';
  imgHashtagsElement.value = '';
  imgCommentElement.value = '';

  document.removeEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      evt.stopPropagation();
      uploadOverlay.classList.add('hidden');
      body.classList.remove('modal-open');
      uploadPreview.src = 'img/upload-default-image.jpg';
      imgSize.value = '55%';
      imgEffectLevel.value = '';
      imgHashtagsElement.value = '';
      imgCommentElement.value = '';
    }
  });
});

imgHashtagsElement.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
});
imgCommentElement.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
});

const validateHashtag = (hashtag) => {
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1, 19}$/;
  return re.test(hashtag);
};

const IsCorrectHashtagsNumber = function(list) {
  return  length(list) <= 5;
};

pristine.addValidator(imgHashtagsElement, IsCorrectHashtagsNumber(imgHashtagsElement.value.split(' ')), 'Количество хэш-тегов не должно быть больше 5');
for (const hashtag of imgHashtagsElement.value.split(' ')) {
  pristine.addValidator(imgHashtagsElement, validateHashtag(hashtag), 'Хэш-тег некорректен');
}

pristine.addValidator(imgCommentElement, isCorrectLength(imgCommentElement.value), 'Длина комментария должна быть не больше 140 символов');

uploadForm.addEventListener('submit', (evt) => {
  pristine.validate();
  evt.preventDefault();
});
