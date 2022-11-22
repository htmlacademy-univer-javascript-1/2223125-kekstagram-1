import {PhotoDescriptions} from './data.js';
import {openBigPhoto} from './fullScreen.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture');

const renderPhotos = () => {
  const newListFragment = document.createDocumentFragment();

  for (const photoDescription of PhotoDescriptions) {
    const photo = pictureTemplate.cloneNode(true);
    const image = photo.querySelector('.picture__img');
    const likes = photo.querySelector('.picture__likes');
    const comments = photo.querySelector('.picture__comments');
    image.src = photoDescription.url;
    likes.textContent = photoDescription.likes;
    comments.textContent = photoDescription.comments;

    photo.addEventListener('click', () => {
      openBigPhoto(photo);
    });

    newListFragment.appendChild(photo);
  }

  picturesContainerElement.appendChild(newListFragment);
};

export {renderPhotos};
