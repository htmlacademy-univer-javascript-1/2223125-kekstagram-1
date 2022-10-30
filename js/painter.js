import {PhotoDescriptions} from './data.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture');

for (const photoDescription of PhotoDescriptions) {
  const photo = pictureTemplate.cloneNode(true);
  const image = photo.querySelector('.picture__img');
  const likes = photo.querySelector('.picture__likes');
  const comments = photo.querySelector('.picture__comments');
  image.src = photoDescription.url;
  likes.textContent = photoDescription.likes;
  comments.textContent = photoDescription.comments;

  pictures.appendChild(photo);
}
