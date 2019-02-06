var similarPhotoTemplate = document.querySelector('#picture')       /* шаблон превью фотографии */
    .content
    .querySelector('.picture__link');

var similarCommentsList = document.querySelector('.social__comments');      /* список комментариев к фото */
var commentItem = similarCommentsList.querySelectorAll('.social__comment');     /* один коммент из списка */

var similarPhotoList = document.querySelector('.pictures');     /* контейнер для всех превью */
var commentLoader = document.querySelector('.social__loadmore');        /* кнопка "загрузить еще" */
var commentCount = document.querySelector('.social__comment-count');        /* счетчик комментариев */

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

/* Прикрепляем фрагмент с фото к верстке */

similarPhotoList.appendChild(fragment);


// Вторая часть с открытой фотографией


var bigPicture = document.querySelector('.big-picture');        /* открытая фотка */
bigPicture.classList.remove('hidden');

/* Заменяем фото из верстки на геерируемую сущность фотографии из элемента массива с фото */

var renderBigPhoto = function (bigPhoto) {
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = bigPhoto.url;
    bigPicture.querySelector('.likes-count').textContent = bigPhoto.likes;
    bigPicture.querySelector('.comments-count').textContent = comments.length;
    bigPicture.querySelector('.social__caption').textContent = bigPhoto.description;
    
    return bigPicture;
};
renderBigPhoto(photoEssence[1]);
console.log('likes ' +photoEssence[1].likes);

/* Создаем  комментарий на основе шаблона */

var createComment = function (commentList) {
    var commentCopy = similarCommentsList.querySelector('.social__comment').cloneNode(true);
    commentCopy.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
    commentCopy.querySelector('.social__text').textContent = commentList.comments;
    return commentCopy;
};

/* Создаем пустое "ведро" (commentFragment) и прикрепляем к нему генерируемые комменты */

var commentFragment = document.createDocumentFragment();

for (var i = 0; i < getRandomNumber(0, comments.length); i++) {
    var random = getRandomNumber(0, comments.length - 1);
    console.log(photoEssence[random]);
    commentFragment.appendChild(createComment(photoEssence[random]));
}

/* удаляем стандартные комменты из верстки */

var commentsList = similarCommentsList.querySelectorAll('.social__comment');
for (var i = 0; i < commentsList.length; i++) {
    similarCommentsList.removeChild(commentsList[i]);
}

/* Прикрепляем фрагмент с комментариями к верстке */

similarCommentsList.appendChild(commentFragment);

/* Ну и удаляем ненужные блочки */

commentCount.classList.add('visually-hidden');
commentLoader.classList.add('visually-hidden');


// задание 4    задание 4    задание 4    задание 4    задание 4    
// разобраться с лишними комментариями (удалить)
