/* eslint-disable no-console */
import {debounce, shuffleArray} from './util.js';
import {renderPhotos} from './render.js';

const RANDOM_FILTER_IMG_COUNT = 10;
const TIMEOUT_DELAY = 500;
const imgFilters = document.querySelector('.img-filters');
const filetersForm = document.querySelector('.img-filters__form');

const addFilters = (photos) => {
  imgFilters.classList.remove('img-filters--inactive');

  const setFilter = debounce((evt) => {
    const currentFilterButton = evt.target.closest('.img-filters__button');
    if (currentFilterButton) {
      filetersForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      currentFilterButton.classList.add('img-filters__button--active');
      if (currentFilterButton.id === 'filter-default') {
        renderPhotos(photos.slice());
      }
      else if (currentFilterButton.id === 'filter-random') {
        renderPhotos(shuffleArray(photos.slice()).slice(0, RANDOM_FILTER_IMG_COUNT));
      }
      else {
        renderPhotos(photos.slice().sort((photo1, photo2) => photo2.comments.length - photo1.comments.length));
      }
    }
  }, TIMEOUT_DELAY);

  filetersForm.addEventListener('click', setFilter);
};

export {addFilters};
