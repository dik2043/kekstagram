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
// bigPicture.classList.remove('hidden');

/* Заменяем фото из верстки на геерируемую сущность фотографии из элемента массива с фото */

var renderBigPhoto = function (bigPhoto) {
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = bigPhoto.url;
    bigPicture.querySelector('.likes-count').textContent = bigPhoto.likes;
    bigPicture.querySelector('.comments-count').textContent = comments.length;
    bigPicture.querySelector('.social__caption').textContent = bigPhoto.description;
    
    return bigPicture;
};
// renderBigPhoto(photoEssence[1]);
// console.log('likes ' +photoEssence[1].likes);

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



var imgOverlay = document.querySelector('.img-upload__overlay');
var imgOverlayCloser = imgOverlay.querySelector('.img-upload__cancel');
var imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
var uploadFile = document.querySelector('#upload-file');
var scalePin = document.querySelector('.scale__pin');
var scaleValue = document.querySelector('.resize__control--value');
var scalePlus = document.querySelector('.resize__control--plus');
var scaleMinus = document.querySelector('.resize__control--minus');
var effectsList = document.querySelector('.effects__list');
var effectsListItems = effectsList.querySelectorAll('.effects__radio');

// var effectsAnalogy = {      /* попробовать через преобразование в массив */
//     'effect-chrome': 'effects__preview--chrome',
//     'effect-sepia': 'effects__preview--sepia',
//     'effect-marvin': 'effects__preview--marvin',
//     'effect-phobos': 'effects__preview--phobos',
//     'effect-heat': 'effects__preview--heat'
// };

var step = 25;
scaleValue.value = '100%';
var value = scaleValue.value;
var scaleLine = document.querySelector('.scale__line');
var intensityEffect;


var addEffectToItem = function (evt) {
    var clickedElem = evt.target;
    /* сложная строчка - значение инпута, который в родителе кликнутого элемета */
    var inputValue = clickedElem.parentNode.querySelector('input').value;
    var imgClass = imgPreview.className;
    imgPreview.removeAttribute('style');
    if (imgClass) {
        imgPreview.classList.remove(imgClass);
    }     
    imgPreview.classList.add('effects__preview--' + inputValue);
};

var getCoordsInPreview = function (obj) {
    var posY = obj.offsetTop;  // верхний отступ эл-та от родителя
    var posX = obj.offsetLeft; // левый отступ эл-та от родителя
    var coords = {
        'x': posX,
        'y': posY
    };
    return coords;
};

var getIntensityEffect = function () {
    return Math.round(getCoordsInPreview(scalePin).x / scaleLine.clientWidth * 100);
};

var showImgOverlay = function () {
    imgOverlay.classList.remove('hidden');
};

var closeImgOverlay = function () {
    imgOverlay.classList.add('hidden');    
};

// как сделать нормально этот гребанный фильтр???

var changeSaturation = function () {
    getIntensityEffect();
    intensityEffect = getIntensityEffect();
    console.log(intensityEffect);
    /* Большая некрасивая проверка */
    switch(imgPreview.className) {
        case 'effects__preview--chrome':  
            imgPreview.style.filter = 'grayscale(' + intensityEffect / 100 + ')';
            console.log(imgPreview.className);
            break;

        case 'effects__preview--sepia':
            imgPreview.style.filter = 'sepia(' + intensityEffect / 100 + ')';
            break;

        case 'effects__preview--marvin':
            imgPreview.style.filter = 'invert(' + intensityEffect + '%)';
            break;
            
        case 'effects__preview--phobos':
            imgPreview.style.filter = 'blur('+ Number(Number(1) + intensityEffect / 50) + 'px)';
            break;
            
        case 'effects__preview--heat':
            imgPreview.style.filter = 'brightness(' + Number(Number(1) + intensityEffect / 50) + ')';
            break;
    }
};

var getSizePlus = function () {
    var arr = value.split('%');
    var value1 = Number(arr[0]);
    value1 += Number(25);
    arr[0] = value1;
    if (value1 >= 100) {
        value1 = 100;
    }
    value = value1 + '%';
    scaleValue.value = value1 + '%';
    imgPreview.style.transform = 'scale(' + value1 / 100 + ')';
    return value;
};

var getSizeMinus = function () {
    var arr = value.split('%');
    var value1 = Number(arr[0]);
    value1 -= Number(25);
    arr[0] = value1;
    if (value1 <= 25) {
        value1 = 25;
    }
    value = value1 + '%';
    scaleValue.value = value1 + '%';
    imgPreview.style.transform = 'scale(' + value1 / 100 + ')';
    return value;
};


uploadFile.addEventListener('change', function () {
    showImgOverlay();
});

imgOverlayCloser.addEventListener('click', function () {
    uploadFile.value = null;
    closeImgOverlay();
});

scalePin.addEventListener('mouseup', function () {
    changeSaturation();
});

scalePlus.addEventListener('click', function () {  
    getSizePlus();
});

scaleMinus.addEventListener('click', function () {
    getSizeMinus();
});


for (var i = 0; i < effectsListItems.length; i++) {
    effectsListItems[i].addEventListener('click', function (evt) {
        addEffectToItem(evt);
    })
}


