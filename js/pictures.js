var similarPhotoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture__link');

var similarCommentsList = document.querySelector('.social__comments');
var commentItem = similarCommentsList.querySelectorAll('.social__comment');

var similarPhotoList = document.querySelector('.pictures');

var photoEssence = [];

/* Получить случайное число */

var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

/* Создание массива url */

var urls = [];

var createUrls = function (i) {
    var url = 'photos/' + Number(i+1) + '.jpg';
    return url;
};

for (var i = 0; i <= 24; i++) {
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

for (var i = 0; i <= 24; i++) {
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
for (var i = 0; i < photoEssence.length; i++) {
    renderPhoto(photoEssence[i]);
    fragment.appendChild(renderPhoto(photoEssence[i]));
} 

similarPhotoList.appendChild(fragment);


// Вторая часть с открытой фотографией

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

console.log(photoEssence[0].likes);

var renderBigPhoto = function (bigPhoto) {
    // var photoElement = similarPhotoTemplate.cloneNode(true);
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = bigPhoto.url;
    bigPicture.querySelector('.likes-count').textContent = bigPhoto.likes;
    bigPicture.querySelector('.comments-count').textContent = comments.length;
    bigPicture.querySelector('.social__caption').textContent = bigPhoto.description;
    
    return bigPicture;
};

renderBigPhoto(photoEssence[0]);


var createComment = function (commentList) {
    var comment = similarCommentsList.querySelector('.social__comment').cloneNode(true);
    comment.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
    comment.querySelector('.social__text').textContent = commentList.comments;

    return comment;
};


var commentFragment = document.createDocumentFragment();

for (var i = 0; i < comments.length - 2; i++) {
    commentFragment.appendChild(createComment(photoEssence[i]));
} 

similarCommentsList.appendChild(commentFragment);