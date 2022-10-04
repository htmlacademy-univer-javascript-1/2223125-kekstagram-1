function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function IsCorrectLength(string, maxLength) {
  return string.length <= maxLength;
}

getRandomPositiveInteger(1, 2);
IsCorrectLength('abc');

//id - число от 1 до 25
//url - сторка вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25
//description - строка, описание фотографии
//likes - число от 15 до 200
//comments - массив объектов

//структура комментария:
//id - число
//avatar - строка вида img/avatar-{{случайное число от 1 до 6}}.svg
//message - одно или два предложения из списка:

//Всё отлично!
//В целом всё неплохо. Но не всё.
//Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
//Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
//Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
//Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!

//name - имя из списка

const PHOTO_DESCRIPTIONS_COUNT = 25;

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
    id: getRandomPositiveInteger(1, 25),
    url: `photos/${getRandomPositiveInteger(1, 25)}.jpg`,
    description: '',
    likes: getRandomPositiveInteger(15, 200),
    comments: createComment(),
  };
};

const photoDescriptions = Array.from({length: PHOTO_DESCRIPTIONS_COUNT}, createPhotoDescription());

console.log(photoDescriptions);
