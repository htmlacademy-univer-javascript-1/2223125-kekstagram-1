import {getRandomPositiveInteger} from './util.js';

const PHOTO_DESCRIPTIONS_COUNT = 25;

const DESCRIPTION = [
  'Отдых на озере',
  'Указатель направления пляжа',
  'Голубая морская вода, омывающая камни',
  'Девушка с фотоаппаратом на пляже',
  'Рисовые человечки принимаю ванну в супе',
  'Чёрный спорткар',
  'Клубничка',
  'Морс',
  'Кукурузник пролетает на пляжем',
  'Выкатная полка для обуви',
  'Кривой забор',
  'Audi',
  'Нарезанные овощи',
  'Кото-суши',
  'Тапочки, в которых никогда не мёрзнут ноги',
  'Самолёт пролетает высоко на горами',
  'Выступление хора с музыкантами',
  'Рэтро-кар',
  'Тапочки, которые помогут не запнуться ночью',
  'Египецкий отель',
  'Курочка с овощами',
  'Закат на фоне моря',
  'Краб',
  'Концерт Майка Шиноды',
  'Гиппопотам недоволен тем, что уазик плывёт быстрее него',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAME = [
  'Артём',
  'Даниил',
  'Варвара',
  'Георгий',
  'Софья',
  'Фёдор',
  'Мария',
  'Александра',
  'Илья',
  'Андрей'
];

let id = 0;
let url = 0;

const getId = function() {
  id += 1;
  return id;
};

const getUrl = function() {
  url += 1;
  return `photos/${url}.jpg`;
};

const createComment = function() {
  return {
    id: getRandomPositiveInteger(1, 1000),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: MESSAGE[getRandomPositiveInteger(0, MESSAGE.length - 1)],
    name : NAME[getRandomPositiveInteger(0, NAME.length - 1)],
  };
};

const createPhotoDescription = function() {
  return {
    id: getId(),
    url: getUrl(),
    description: DESCRIPTION[this.id - 1],
    likes: getRandomPositiveInteger(15, 200),
    comments: createComment(),
  };
};

const createPhotoDescriptions = () => Array.from({length: PHOTO_DESCRIPTIONS_COUNT}, createPhotoDescription());
export {createPhotoDescriptions};
