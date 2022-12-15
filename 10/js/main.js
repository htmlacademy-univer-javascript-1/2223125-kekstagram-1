import {renderPhotos} from './render.js';
import {setUserFormSubmit} from './util-upload-form.js';
import { getData } from './api.js';
import {showAlert} from './util.js';

getData((photos) => renderPhotos(photos), showAlert);

setUserFormSubmit();
