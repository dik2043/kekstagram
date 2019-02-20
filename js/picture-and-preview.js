"use strict";

// Файл отвечает за создание превьюшек и отрисовку/закрытие большого фото

(function () {

    var similarPhotoList = document.querySelector('.pictures');
    var similarPhotoTemplate = document.querySelector('#picture')       /* шаблон превью фотографии */
        .content
        .querySelector('.picture__link');
    var bigPicture = document.querySelector('.big-picture');        /* открытая фотка */
    var similarCommentsList = document.querySelector('.social__comments');      /* список комментариев к фото */
    
    /* как рендерить превьюшку */    
    var renderPhoto = function (photo, id) {
        var photoElement = similarPhotoTemplate.cloneNode(true);
        photoElement.querySelector('.picture__img').src = photo.url;
        photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
        photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
        photoElement.dataset.offerId = id;

        return photoElement;
    };
    
    /* как рендерить открытое большое фото */
    var renderBigPhoto = function (bigPhoto) {
        var commentFragment = document.createDocumentFragment();        /* ведро для комментариев */
        bigPicture.querySelector('.big-picture__img').querySelector('img').src = bigPhoto.url;
        bigPicture.querySelector('.likes-count').textContent = bigPhoto.likes;
        bigPicture.querySelector('.comments-count').textContent = bigPhoto.comments.length;
        bigPicture.querySelector('.social__caption').textContent = bigPhoto.description;
        bigPicture.classList.remove('hidden');
      
        /* создаем комментарии с нуля */
        for (var i = 0; i < bigPhoto.comments.length; i++) {
            
            var newComment = document.createElement('li');
            newComment.className = 'social__comment social__comment--text';

            var commentImg = document.createElement('img');
            commentImg.width = 35;
            commentImg.height = 35;
            commentImg.alt = 'Аватар комментатора фотографии';
            commentImg.className = 'social__picture';
            commentImg.src = bigPhoto.comments[i].avatar;

            newComment.appendChild(commentImg);

            var commentText = document.createElement('p');
            commentText.className = 'social__text';
            /* не понял, делать имя или нет? */
            commentText.textContent = /* bigPhoto.comments[i].name + ': ' + */ bigPhoto.comments[i].message;

            newComment.appendChild(commentText);
            commentFragment.appendChild(newComment);
        }

        /* удаляем стандартные комментарии из разметки */
        var commentsList = similarCommentsList.querySelectorAll('.social__comment');
        for (var i = 0; i < commentsList.length; i++) {
            similarCommentsList.removeChild(commentsList[i]);
        }

        /* и прикрепляем к ведру созданные комментарии */
        similarCommentsList.appendChild(commentFragment);

        /* добавляем обработчики закрытия */        
        bigPicture.querySelector('.big-picture__cancel').addEventListener('click', function () {
            closeBigPhoto();
        });
        document.addEventListener('keydown', onPopupEscPress);

        return bigPicture;
    };

    /* как закрыть открытое фото (и по esc) */
    var closeBigPhoto = function (evt) {
        var bigPhoto = document.querySelector('.big-picture__preview');
        bigPicture.classList.add('hidden');
        document.removeEventListener('keydown', onPopupEscPress);       /* убрать слушатель */
    };
    var onPopupEscPress = function (evt) {
        if (evt.keyCode === 27 && evt.target.tagName  === 'INPUT') {       /* если фокус на поле, то не закрываем */
            evt.target.blur();
        } else if (evt.keyCode === 27) {       /* esc */
            closeBigPhoto();
        }
    };

    /* как получить id для открытия соответствующего фото */
    var getId = function (evt) {
        var clickedElem = evt.target;
        return clickedElem.parentNode.dataset.offerId;   /* потому-что кликаем на img, а id на a */
    };
    
    
    // Отрисовываем превьюшки по полученным серверным данным    
    
    window.backend.load(function (bigPhoto) {       /* bigPhoto - это параметр колбэка, данные с сервера */
        
        /* создаем все превью и прикрепляем их к разметке */
        var fragment = document.createDocumentFragment();   /* ведро для превьюшек */        
        for (var i = 0; i < bigPhoto.length; i++) {
            fragment.appendChild(renderPhoto(bigPhoto[i], i));
        }
        similarPhotoList.appendChild(fragment);
        
        /* добавляем обработчик открытия большого фото на все превью */
        var photos = document.querySelectorAll('.picture__img');
        for (var i = 0; i < photos.length; i++) {
            photos[i].addEventListener('click', function (evt) {
                renderBigPhoto(bigPhoto[getId(evt)]);
            });
        }
    });

    /* ну и удаляем ненужные блочки */    
    var commentLoader = document.querySelector('.social__loadmore');        /* кнопка "загрузить еще" */
    var commentCount = document.querySelector('.social__comment-count');        /* счетчик комментариев */    
    commentCount.classList.add('visually-hidden');
    commentLoader.classList.add('visually-hidden')
        
})();


// Когда открыта фотка, всегда срабатывает слушатель кнопок (логчно) - можно по другому?