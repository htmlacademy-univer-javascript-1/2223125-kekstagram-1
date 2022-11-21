import {isCorrectLength} from './util.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.getElementById('upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadPreview = uploadForm.querySelector('.img-upload__preview');
const imgSize = uploadOverlay.querySelector('.scale__control--value');
const imgEffectLevel = uploadOverlay.querySelector('.effect-level__value');
const imgHashtagsElement = uploadOverlay.querySelector('.text__hashtags');
let imgHashtagsList = imgHashtagsElement.value.split();
const imgCommentElement = uploadOverlay.querySelector('.text__description');
const uploadCancelButton = uploadOverlay.querySelector('.img-upload__cancel');
const submitButton = uploadOverlay.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
}, false);

uploadFile.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadPreview.img.src = this.files[0].src;

  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      evt.stopPropagation();
      uploadOverlay.classList.add('hidden');
      body.classList.remove('modal-open');
      uploadPreview.img.src = 'img/upload-default-image.jpg';
      imgSize.value = '55%';
      imgEffectLevel.value = '';
      imgHashtagsList.value = '';
      imgCommentElement.value = '';
    }
  });
});

uploadCancelButton.addEventListener('click', () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadPreview.img.src = 'img/upload-default-image.jpg';
  imgSize.value = '55%';
  imgEffectLevel.value = '';
  imgHashtagsList = [];
  imgCommentElement.value = '';

  document.removeEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      evt.stopPropagation();
      uploadOverlay.classList.add('hidden');
      body.classList.remove('modal-open');
      uploadPreview.img.src = 'img/upload-default-image.jpg';
      imgSize.value = '55%';
      imgEffectLevel.value = '';
      imgHashtagsList.value = '';
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
  const re = /^#[A-Za-zА-Яа-яЁё0-9]$/;
  return re.test(hashtag);
};

pristine.addValidator(imgHashtagsList, (list) => length(list) <= 5, 'Количество хэш-тегов не должно быть больше 5');

for (const hashtag of imgHashtagsList.split()) {
  pristine.addValidator(hashtag, validateHashtag, 'Хэш-тег некорректен');
}

pristine.addValidator(imgCommentElement.value, isCorrectLength, 'Длина комментария должна быть не больше 140 символов');

submitButton.onclick = (evt) => {
  evt.preventDefault();
  pristine.validate();
};
