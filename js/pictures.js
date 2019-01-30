var similarPhotoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture__link');

var similarPhotoList = document.querySelector('.pictures');

var photoEssence = [];

/* Получить случайное число */

var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

/* Создание массива url */

var urls = [];

var createUrls = function (i) {
    var url = 'photos/' + i + '.jpg';
    return url;
};

for (var i = 1; i <= 25; i++) {
    urls[i] = createUrls(i);
} 

/* Остальные переменные */

var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var descriptions = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
];

/* Создать случайный объект (сущность фотографии) */

var createObj = function (counter) {
    var obj = {
        'url': urls[counter],
        'likes': getRandomNumber(15, 200),
        'comments': comments[getRandomNumber(0, comments.length - 1)],
        'description': descriptions[getRandomNumber(0, descriptions.length - 1)]
    };
    return obj;
};



// Начинаем действия

similarPhotoList.classList.remove('hidden');

/* Cоздаем массив случайных готовых фотографий */

for (var i = 1; i <= 25; i++) {
    photoEssence[i] = createObj(i);
}

/* Создаем генерируемую сущность фотографии */

var renderPhoto = function (photo) {
    var photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;    
    photoElement.querySelector('.picture__stat--comments').textContent = comments.length;

    return photoElement;
};

/* Создаем пустое "ведро" (fragment) и прикрепляем к нему генерируемые фото */

var fragment = document.createDocumentFragment();
for (var i = 1; i < photoEssence.length; i++) {
    renderPhoto(photoEssence[i]);
    fragment.appendChild(renderPhoto(photoEssence[i]));
} 

similarPhotoList.appendChild(fragment);

