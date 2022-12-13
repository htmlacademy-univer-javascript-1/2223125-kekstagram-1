/* eslint-disable no-console */
import {isCorrectLength} from './util.js';

const EFFECTS = {
  chrome: {
    filterName: 'grayscale',
    units: '',
    settings: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
    }
  },
  sepia: {
    filterName: 'sepia',
    units: '',
    settings: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
    }
  },
  marvin: {
    filterName: 'invert',
    units: '%',
    settings: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
    }
  },
  phobos: {
    filterName: 'blur',
    units: 'px',
    settings: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
    }
  },
  heat: {
    filterName: 'brightness',
    units: '',
    settings: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
    }
  }
};

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadPreview = uploadForm.querySelector('.img-upload__preview').querySelector('img');
const imgEffectLevel = uploadOverlay.querySelector('.effect-level__value');
const imgHashtagsElement = uploadOverlay.querySelector('.text__hashtags');
const imgCommentElement = uploadOverlay.querySelector('.text__description');
const uploadCancelButton = uploadOverlay.querySelector('.img-upload__cancel');
const decreaseImgSizeButton = uploadOverlay.querySelector('.scale__control--smaller');
const increaseImgSizeButton = uploadOverlay.querySelector('.scale__control--bigger');
const imgSizeElement = uploadOverlay.querySelector('.scale__control--value');
const effectsList = uploadOverlay.querySelector('.effects__list');
const sliderFieldset = uploadOverlay.querySelector('.img-upload__effect-level');
const slider = uploadOverlay.querySelector('.effect-level__slider');
const effectLevelElement = uploadOverlay.querySelector('.effect-level__value');
let flagForSlider = true;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const resetForm = function() {
  uploadPreview.src = 'img/upload-default-image.jpg';
  imgSizeElement.value = '100%';
  imgEffectLevel.value = '';
  imgHashtagsElement.value = '';
  imgCommentElement.value = '';
  uploadPreview.style.transform =  'scale(1)';
  uploadPreview.style.filter = 'none';
  sliderFieldset.classList.add('hidden');
};

const hideForm = function() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  resetForm();
};

const hideIfEsc = (evt) => {
  if (evt.keyCode === 27) {
    hideForm();
    document.removeEventListener('keydown', hideIfEsc);
  }
};

uploadFile.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  const file = uploadFile.files[0];
  const reader = new FileReader();
  reader.onload = (evt) => {
    uploadPreview.src = evt.target.result;
  };
  reader.readAsDataURL(file);

  document.addEventListener('keydown', hideIfEsc);
});

uploadCancelButton.addEventListener('click', () => {
  hideForm();
  document.removeEventListener('keydown', hideIfEsc);
});

decreaseImgSizeButton.addEventListener('click', () => {
  let imgSize = Number(imgSizeElement.value.slice(0, imgSizeElement.value.length - 1));
  if (imgSize > 25) {
    imgSize -= 25;
    imgSizeElement.value = String(imgSize) + String('%');
  }
  uploadPreview.style.transform = `scale(${imgSize / 100})`;
});

increaseImgSizeButton.addEventListener('click', () => {
  let imgSize = Number(imgSizeElement.value.slice(0, imgSizeElement.value.length - 1));
  if (imgSize < 100) {
    imgSize += 25;
    imgSizeElement.value = String(imgSize) + String('%');
  }
  uploadPreview.style.transform = `scale(${imgSize / 100})`;
});

effectsList.addEventListener('click', (evt) => {
  console.log(uploadPreview.getAttribute('style'));
  if (flagForSlider) {
    noUiSlider.create(slider, {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
    });
    flagForSlider = false;
  }

  const effectsItem = evt.target.closest('.effects__item');
  if (effectsItem) {
    const filter = effectsItem.querySelector('.effects__radio').value;
    if (uploadPreview.classList.length !== 0) {
      uploadPreview.classList.remove(uploadPreview.classList[0]);
    }
    if (filter === 'none') {
      uploadPreview.style.filter = 'none';
      sliderFieldset.classList.add('hidden');
    }
    else {
      uploadPreview.classList.add(`effects__preview--${filter}`);
      sliderFieldset.classList.remove('hidden');
      slider.noUiSlider.updateOptions(EFFECTS[filter].settings);
      slider.noUiSlider.on('update', () => {
        effectLevelElement.value = slider.noUiSlider.get();
        uploadPreview.style.filter = `${EFFECTS[filter].filterName}(${effectLevelElement.value}${EFFECTS[filter].units})`;
      });
    }
  }
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
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  return re.test(hashtag);
};

const validateHashtags = function() {
  let flag = true;
  for (const hashtag of imgHashtagsElement.value.split(' ')) {
    if (hashtag) {
      flag = validateHashtag(hashtag);
    }
  }
  return flag;
};

const isCorrectHatagsNumber = function() {
  return imgHashtagsElement.value.split(' ').length <= 5;
};

const isThereNoRepeats = function() {
  const hashtagsList = imgHashtagsElement.value.split(' ');
  const hashtagsSet = new Set(hashtagsList);
  return (hashtagsList.length === hashtagsSet.size);
};


const isCorrectCommentLenght = function() {
  return isCorrectLength(imgCommentElement.value);
};

pristine.addValidator(imgHashtagsElement, isCorrectHatagsNumber, 'Количество хэш-тегов не должно быть больше 5');
pristine.addValidator(imgHashtagsElement, validateHashtags, 'Хэш-тег некорректен');
pristine.addValidator(imgHashtagsElement, isThereNoRepeats, 'Хэш-теги не должны повторяться');
pristine.addValidator(imgCommentElement, isCorrectCommentLenght, 'Длина комментария должна быть не больше 140 символов');

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate([imgHashtagsElement, imgCommentElement])) {
    evt.preventDefault();
  }
});
