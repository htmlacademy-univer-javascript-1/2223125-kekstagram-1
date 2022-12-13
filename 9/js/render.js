import {createPhotoDescriptions} from './data.js';
import {openBigPhoto} from './fullScreen.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const photoDescriptions = createPhotoDescriptions();

const renderPhotos = () => {
  const newListFragment = document.createDocumentFragment();

  for (let i = 0; i < photoDescriptions.length; i++) {
    const photo = pictureTemplate.cloneNode(true);
    const image = photo.querySelector('.picture__img');
    const likes = photo.querySelector('.picture__likes');
    const comments = photo.querySelector('.picture__comments');
    image.src = photoDescriptions[i].url;
    likes.textContent = photoDescriptions[i].likes;
    comments.textContent = photoDescriptions[i].comments.length;
    photo.querySelector('.picture').dataset.index = i;

    newListFragment.appendChild(photo);
  }

  document.querySelector('.pictures__title').classList.remove('visually-hidden');

  picturesContainerElement.appendChild(newListFragment);

  picturesContainerElement.addEventListener('click', (evt) => {
    const photo = evt.target.closest('.picture');
    if (photo) {
      openBigPhoto(photoDescriptions[photo.dataset.index]);
    }
  });
};

export {renderPhotos};
