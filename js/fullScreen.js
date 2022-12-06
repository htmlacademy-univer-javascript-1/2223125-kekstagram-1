/* eslint-disable no-console */
const bigPictureSection = document.querySelector('.big-picture');
const img = bigPictureSection.querySelector('.big-picture__img').querySelector('img');
const likes = bigPictureSection.querySelector('.likes-count');
const description = bigPictureSection.querySelector('.social__caption');
const commentsCount = bigPictureSection.querySelector('.comments-count');
const commentsList = bigPictureSection.querySelector('.social__comments');
const currentCommentsCount = bigPictureSection.querySelector('.current-comments-count');
const loadCommentsButton = bigPictureSection.querySelector('.social__comments-loader');

const addComment = (photo) => {
  const currentComment = photo.comments[Number(currentCommentsCount.textContent)];
  commentsList.insertAdjacentHTML('beforeend', `
  <li class="social__comment">
    <img class="social__picture" src="${currentComment.avatar}" alt="${currentComment.name}" width="35" height="35">
    <p class="social__text">"${currentComment.message}"</p>
  </li>`);
  currentCommentsCount.textContent = Number(currentCommentsCount.textContent) + 1;
};

const loadFiveComments = (photo) => {
  for (let i = 0; i < 5; i++) {
    if (Number(currentCommentsCount.textContent) < Number(commentsCount.textContent)) {
      addComment(photo);
    }
    else {
      loadCommentsButton.classList.add('hidden');
      break;
    }
  }
};

const openBigPhoto = (photo) => {
  bigPictureSection.classList.remove('hidden');

  loadFiveComments(photo);

  loadCommentsButton.onclick = () => {
    loadFiveComments(photo);
  };

  img.src = photo.url;
  likes.textContent = photo.likes;
  description.textContent = photo.description;

  document.querySelector('body').classList.add('modal-open');

  const closeButton = bigPictureSection.querySelector('.big-picture__cancel');
  closeButton.addEventListener('click', () => {
    bigPictureSection.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      bigPictureSection.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
    }
  });
};

export {openBigPhoto};
