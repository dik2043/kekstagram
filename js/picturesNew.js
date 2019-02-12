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

/* для заполнения массива newComments случайными элементами из comments !без повторения! */

var toRecycleArr = function (newArr, oldArr) {
    var transitArr = oldArr.concat();           /* копировать массив, чтобы не изменять стырый */
    for (var i = 0; i <= getRandomNumber(0, oldArr.length - 1); i++) {
        var random = getRandomNumber(0, transitArr.length - 1);                                     /* Как можно лучше? */
        newArr[i] = transitArr[random];
        transitArr.splice(random, 1);
    }
};

/* Создать случайный объект (сущность фотографии) */

var createObj = function (counter) {
    var newComments = [];
    toRecycleArr(newComments, comments);
    var obj = {
        'url': urls[counter],
        'likes': getRandomNumber(15, 200),
        'comments': newComments,
        'description': descriptions[getRandomNumber(0, descriptions.length - 1)]
    };
    return obj;
};


// Начинаем действия

similarPhotoList.classList.remove('hidden');

/* Наполняем массив случайных готовых фотографий */

for (var i = 0; i <= 24; i++) {
    photoEssence[i] = createObj(i);
}

/* Создаем генерируемую сущность фотографии */

var renderPhoto = function (photo, id) {
    var photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
    photoElement.dataset.offerId = id;

    return photoElement;
};

/* Создаем пустое "ведро" (fragment) и прикрепляем к нему генерируемые фото */

var fragment = document.createDocumentFragment();
for (var i = 0; i < photoEssence.length; i++) {
    fragment.appendChild(renderPhoto(photoEssence[i], i));
}

/* Прикрепляем фрагмент с фото к верстке */

similarPhotoList.appendChild(fragment);



// Вторая часть с открытой фотографией


var bigPicture = document.querySelector('.big-picture');        /* открытая фотка */

/* Создаем пустое "ведро" (commentFragment) для комментариев */

var commentFragment = document.createDocumentFragment();

/* Функция замены фото из верстки на генерируемую сущность фотографии из элемента массива с фото */

var renderBigPhoto = function (bigPhoto) {
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = bigPhoto.url;
    bigPicture.querySelector('.likes-count').textContent = bigPhoto.likes;
    bigPicture.querySelector('.comments-count').textContent = bigPhoto.comments.length;
    bigPicture.querySelector('.social__caption').textContent = bigPhoto.description;
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__cancel').addEventListener('click', function () {       /* обработчик закрытия */
        closeBigPhoto();
    });

    document.addEventListener('keydown', onPopupEscPress);

    /* Создаем  комментарии с нуля */
    
    for (var i = 0; i < bigPhoto.comments.length; i++) {      
        var newComment = document.createElement('li');
        newComment.className = 'social__comment social__comment--text';

        var commentImg = document.createElement('img');
        commentImg.width = 35;
        commentImg.height = 35;
        commentImg.alt = 'Аватар комментатора фотографии';
        commentImg.className = 'social__picture';
        commentImg.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';

        newComment.appendChild(commentImg);
        
        var commentText = document.createElement('p');
        commentText.className = 'social__text';
        commentText.textContent = bigPhoto.comments[i];

        newComment.appendChild(commentText);
        commentFragment.appendChild(newComment);
    }
    
    /* удаляем стандартные комменты из верстки */

    var commentsList = similarCommentsList.querySelectorAll('.social__comment');
    for (var i = 0; i < commentsList.length; i++) {
        similarCommentsList.removeChild(commentsList[i]);
    }

    /* и прикрепляем к ведру созданные комменты */
    
    similarCommentsList.appendChild(commentFragment);

    return bigPicture;
};

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
var step = 25;
scaleValue.value = '100%';
var scaleLine = document.querySelector('.scale__line');
var intensityEffect;
var textHashtags = document.querySelector('.text__hashtags');
var textDescription = document.querySelector('.text__description');
var submitImg = document.querySelector('.img-upload__submit');

/* Добавить эффект */

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

/* Получить координаты от родителя */

var getCoordsInPreview = function (obj) {
    var posY = obj.offsetTop;  // верхний отступ эл-та от родителя
    var posX = obj.offsetLeft; // левый отступ эл-та от родителя
    var coords = {
        'x': posX,
        'y': posY
    };
    return coords;
};

/* Получить значение шкалы интенсивности */

var getIntensityEffect = function () {
    return Math.round(getCoordsInPreview(scalePin).x / scaleLine.clientWidth * 100);
};

/* Показать и закрыть блок фильтров */

var showImgOverlay = function () {
    imgOverlay.classList.remove('hidden');
    scaleValue.value = '100%';
    imgPreview.style.transform = 'scale(' + 1 + ')';
};

var closeImgOverlay = function () {
    uploadFile.value = null;
    imgOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPreviewEscPress); /* убрать слушатель */
    document.removeEventListener('keydown', onPreviewEnterPress);
    // document.removeEventListener('keydown', checkFields());
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

/* Добавить все нужные слушатели */

uploadFile.addEventListener('change', function () {
    showImgOverlay();
    document.addEventListener('keydown', onPreviewEscPress);
    document.addEventListener('keydown', onPreviewEnterPress);
});

imgOverlayCloser.addEventListener('click', function () {
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

/* Получить id кликнутой фотки для открытия нуной */

var getId = function (evt) {
    var clickedElem = evt.target;
    var offerId = clickedElem.parentNode.dataset.offerId;
    console.log(offerId);
    return offerId;
};

/* Добавить обработчик открытия на кадую фотку */

var addListenerToEveryPhoto = function (evt) {
    var photos = document.querySelectorAll('.picture__img');
    for (var i = 0; i < photos.length; i++) {
        photos[i].addEventListener('click', function (evt) {
            renderBigPhoto(photoEssence[getId(evt)]);
        });
    }
};

addListenerToEveryPhoto(photoEssence);

/* Закрыть большую фотку */

var closeBigPhoto = function (evt) {
    var bigPhoto = document.querySelector('.big-picture__preview');
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);       /* убрать слушатель */
};

var onPopupEscPress = function (evt) {
    console.log(evt.target);
    if (evt.keyCode === 27 && evt.target.tagName  === 'INPUT') {       /* если фокус на поле, то не закрываем */
        evt.target.blur();
    } else if (evt.keyCode === 27) {       /* esc */
        closeBigPhoto();
    }
};

var onPreviewEnterPress = function (evt) {
    if (evt.keyCode === 13 && evt.target.className  === 'text__hashtags') {       /* если фокус на поле, то не закрываем */
        evt.target.blur();
    } else if (evt.keyCode === 13 && evt.target.tagName === 'TEXTAREA') {
        evt.target.blur();
    } 
};

var onPreviewEscPress = function (evt) {
    if (evt.keyCode === 27 && evt.target.className  === 'text__hashtags') {       /* если фокус на поле, то не закрываем */
        evt.target.blur();
    } else if (evt.keyCode === 27 && evt.target.tagName === 'TEXTAREA') {
        evt.target.blur();
    } else if (evt.keyCode === 27) {       /* esc */
        closeImgOverlay();
    }
};

/* Увеличить и уменьшить значение размера */

var getSizePlus = function () {
    var value = scaleValue.value;
    var arr = value.split('%');
    var value1 = Number(arr[0]);        /* как можно лучше? */
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
    var value = scaleValue.value;
    var arr = value.split('%');
    var value1 = Number(arr[0]);
    value1 -= Number(25);                /* как можно лучше? */
    arr[0] = value1;
    if (value1 <= 25) {
        value1 = 25;
    }
    value = value1 + '%';
    scaleValue.value = value1 + '%';
    imgPreview.style.transform = 'scale(' + value1 / 100 + ')';
    return value;
};

/* Проверить поля формы */

textHashtags.addEventListener('input', function (evt) {
    checkFields(evt);
});

var checkFields = function (evt) {
    var target = evt.target;
    var hastags = target.value.split(' ');
    var check;
    for (var i = 0; i < hastags.length; i++) {
        for (var j = i + 1; j < hastags.length; j++) {
            if (hastags[i] === hastags[j]) {
                check = true;
                break
            } else {
                check = false;
            }
        }
        if (check) {
            target.setCustomValidity('Имя тега не может повторяться');
            break
        } else if (hastags.length > 5) {
            target.setCustomValidity('Моет быть не более 5 тегов');
        } else if (!(hastags[i][0] === '#')) {
            target.setCustomValidity('Имя тега должно начинаться с символа #');
        } else if (hastags[i].length > 20) {
            target.setCustomValidity('В имени тега может быть не более 20 символов');
        } else if (hastags[i][0] === '#' && hastags[i].length <= 1) {
            target.setCustomValidity('Имя тега не может состоять из одного символа #');
        } else {
            target.setCustomValidity('');
        }
    }
};



// Заметки
// Как сделать проверку на разделение пробелом?
// Как сделать проверку на регистр?