const bigPictureSection = document.querySelector('.big-picture');
const url = bigPictureSection.querySelector('.big-picture_img');
const likes = bigPictureSection.querySelector('.likes-count');
const description = bigPictureSection.querySelector('.social__caption');
const commentsCount = bigPictureSection.querySelector('.comments-count');
const commentsList = bigPictureSection.querySelector('.social__comments');
const currentCommentsCount = bigPictureSection.querySelector('.current-comments-count');
const loadCommentsButton = bigPictureSection.querySelector('.social__comments-loader');


const commentsListElement = commentsList.querySelector('.social__comment');

const addComment = (photo) => {
  const comment = commentsListElement.cloneNode(true);
  comment.src = photo.comments.avatar;
  comment.alt = photo.comments.name;
  comment.querySelector('.social_text').textContent = photo.comments.message;
  commentsList.appendChild(comment);
  currentCommentsCount.value++;
};

const loadFiveComments = (photo) => {
  for (let i = 0; i < 5; i++) {
    if (currentCommentsCount.value < commentsCount.value) {
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

  url.src = photo.url;
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
