import {renderPhotos} from './render.js';
import {setUserFormSubmit} from './util-upload-form.js';
import { getData } from './api.js';
import {showAlert} from './util.js';
import { addFilters } from './filters.js';

getData((photos) => {
  addFilters(photos);
  return renderPhotos(photos);
}, showAlert);
setUserFormSubmit();
