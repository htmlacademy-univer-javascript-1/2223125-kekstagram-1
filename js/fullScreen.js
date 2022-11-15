const bigPictureSection = document.querySelector('.big-picture');

function openBigPhoto(photo) {
  bigPictureSection.classList.remove('hidden');

  const url = bigPictureSection.querySelector('.big-picture_img');
  const likes = bigPictureSection.querySelector('.likes-count');
  const description = bigPictureSection.querySelector('.social__caption');
  const commentsCount = bigPictureSection.querySelector('.comments-count');
  const commentsList = bigPictureSection.querySelector('.social__comments');

  const commentsListElement = commentsList.querySelector('.social__comment');

  for (let i = 0; i < commentsCount; i++) {
    const comment = commentsListElement.cloneNode(true);
    comment.src = photo.comments.avatar;
    comment.alt = photo.comments.name;
    comment.querySelector('.social_text').textContent = photo.comments.message;
    commentsList.appendChild(comment);
  }

  url.src = photo.url;
  likes.textContent = photo.likes;
  description.textContent = photo.description;

  bigPictureSection.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureSection.querySelector('.social__comments-loader').classList.add('hidden');
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
}

export {openBigPhoto};
