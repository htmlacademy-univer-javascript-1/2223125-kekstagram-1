import {createPhotoDescriptions} from './data.js';
import {openBigPhoto} from './fullScreen.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture');

const renderPhotos = () => {
  const newListFragment = document.createDocumentFragment();

  for (const photoDescription of createPhotoDescriptions()) {
    const photo = pictureTemplate.cloneNode(true);
    const photoContent = photo.content;
    const image = photoContent.querySelector('.picture__img');
    const likes = photoContent.querySelector('.picture__likes');
    const comments = photoContent.querySelector('.picture__comments');
    image.src = photoDescription.url;
    likes.textContent = photoDescription.likes;
    comments.textContent = photoDescription.comments[0];

    photo.addEventListener('click', () => {
      openBigPhoto(photo);
    });

    newListFragment.appendChild(photo);
  }

  picturesContainerElement.appendChild(newListFragment);
};

export {renderPhotos};
