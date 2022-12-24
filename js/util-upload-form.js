import {sendData} from './api.js';
import {isCorrectLength, showSuccessMessage, showErrorMessage} from './util.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
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
const imgHashtags = uploadOverlay.querySelector('.text__hashtags');
const imgComment = uploadOverlay.querySelector('.text__description');
const uploadCancelButton = uploadOverlay.querySelector('.img-upload__cancel');
const decreaseImgSizeButton = uploadOverlay.querySelector('.scale__control--smaller');
const increaseImgSizeButton = uploadOverlay.querySelector('.scale__control--bigger');
const imgSize = uploadOverlay.querySelector('.scale__control--value');
const effectsList = uploadOverlay.querySelector('.effects__list');
const sliderFieldset = uploadOverlay.querySelector('.img-upload__effect-level');
const slider = uploadOverlay.querySelector('.effect-level__slider');
const effectLevel = uploadOverlay.querySelector('.effect-level__value');
const submitButton = uploadOverlay.querySelector('.img-upload__submit');
let flagForSlider = true;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const resetForm = function() {
  uploadFile.value = '';
  uploadPreview.src = 'img/upload-default-image.jpg';
  imgSize.value = '100%';
  imgEffectLevel.value = '';
  imgHashtags.value = '';
  imgComment.value = '';
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
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    uploadPreview.src = URL.createObjectURL(file);
  }
  document.addEventListener('keydown', hideIfEsc);
});

uploadCancelButton.addEventListener('click', () => {
  hideForm();
  document.removeEventListener('keydown', hideIfEsc);
});

decreaseImgSizeButton.addEventListener('click', () => {
  let currentImgSize = Number(imgSize.value.slice(0, imgSize.value.length - 1));
  if (currentImgSize > 25) {
    currentImgSize -= 25;
    imgSize.value = `${currentImgSize}%`;
  }
  uploadPreview.style.transform = `scale(${currentImgSize / 100})`;
});

increaseImgSizeButton.addEventListener('click', () => {
  let currentImgSize = Number(imgSize.value.slice(0, imgSize.value.length - 1));
  if (currentImgSize < 100) {
    currentImgSize += 25;
    imgSize.value = `${currentImgSize}%`;
  }
  uploadPreview.style.transform = `scale(${currentImgSize / 100})`;
});

effectsList.addEventListener('click', (evt) => {
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
        effectLevel.value = slider.noUiSlider.get();
        uploadPreview.style.filter = `${EFFECTS[filter].filterName}(${effectLevel.value}${EFFECTS[filter].units})`;
      });
    }
  }
});

imgHashtags.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
});
imgComment.addEventListener('keydown', (evt) => {
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
  for (const hashtag of imgHashtags.value.split(' ')) {
    if (hashtag) {
      flag = validateHashtag(hashtag);
    }
  }
  return flag;
};

const isCorrectHatagsNumber = function() {
  return imgHashtags.value.split(' ').length <= 5;
};

const isThereNoRepeats = function() {
  const hashtagsList = imgHashtags.value.split(' ');
  const hashtagsSet = new Set(hashtagsList);
  return (hashtagsList.length === hashtagsSet.size);
};


const isCorrectCommentLenght = function() {
  return isCorrectLength(imgComment.value);
};

pristine.addValidator(imgHashtags, isCorrectHatagsNumber, 'Количество хэш-тегов не должно быть больше 5');
pristine.addValidator(imgHashtags, validateHashtags, 'Хэш-тег некорректен');
pristine.addValidator(imgHashtags, isThereNoRepeats, 'Хэш-теги не должны повторяться');
pristine.addValidator(imgComment, isCorrectCommentLenght, 'Длина комментария должна быть не больше 140 символов');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate([imgHashtags, imgComment])) {
      blockSubmitButton();
      sendData(
        () => {
          hideForm();
          unblockSubmitButton();
          showSuccessMessage();
        },
        () => {
          showErrorMessage();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit, hideIfEsc};
