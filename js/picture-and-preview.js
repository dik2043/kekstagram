"use strict";

// Файл отвечает за создание превьюшек и отрисовку/закрытие большого фото

(function () {

    var similarPhotoList = document.querySelector('.pictures');
    var similarPhotoTemplate = document.querySelector('#picture')       /* шаблон превью фотографии */
        .content
        .querySelector('.picture__link');
    var bigPicture = document.querySelector('.big-picture');        /* открытая фотка */
    var similarCommentsList = document.querySelector('.social__comments');      /* список комментариев к фото */
    
    /* как рендерить одну превьюшку */    
    var renderPhoto = function (photo, id) {
        var photoElement = similarPhotoTemplate.cloneNode(true);
        photoElement.querySelector('.picture__img').src = photo.url;
        photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
        photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
        photoElement.dataset.offerId = id;

        return photoElement;
    };
    
    /* как рендерить открытое большое фото */
    var renderBigPhoto = function (photo) {
        var commentFragment = document.createDocumentFragment();        /* ведро для комментариев */
        bigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.url;
        bigPicture.querySelector('.likes-count').textContent = photo.likes;
        bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
        bigPicture.querySelector('.social__caption').textContent = photo.description;
        bigPicture.classList.remove('hidden');
      
        /* создаем комментарии с нуля */
        for (var i = 0; i < photo.comments.length; i++) {
            
            var newComment = document.createElement('li');
            newComment.className = 'social__comment social__comment--text';

            var commentImg = document.createElement('img');
            commentImg.width = 35;
            commentImg.height = 35;
            commentImg.alt = 'Аватар комментатора фотографии';
            commentImg.className = 'social__picture';
            commentImg.src = photo.comments[i].avatar;

            newComment.appendChild(commentImg);

            var commentText = document.createElement('p');
            commentText.className = 'social__text';
            /* не понял, делать имя или нет? */
            commentText.textContent = /* photo.comments[i].name + ': ' + */ photo.comments[i].message;

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

    /*как рендерить все превьюшки сразу*/
    var render = function (data) {
        /* наверно очищаем фрагмент с фото для прикрепления новых фото */
        // fragment.innerHTML = '';

        /* создаем все превью и прикрепляем их к разметке */
        for (var i = 0; i < data.length; i++) {
            // fragment.appendChild(renderPhoto(data[i], i));
            similarPhotoList.appendChild(renderPhoto(data[i], i));
        }
        // similarPhotoList.appendChild(fragment);
        //
        /* добавляем обработчик открытия большого фото на все превью */
        var photoElements = document.querySelectorAll('.picture__img');
        for (var i = 0; i < photoElements.length; i++) {
            photoElements[i].addEventListener('click', function (evt) {
                renderBigPhoto(data[getId(evt)]);
            });
        }
    };

    /* как закрыть открытое фото (и по esc) */
    var closeBigPhoto = function (evt) {
        var photo = document.querySelector('.big-picture__preview');
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
    
    var photos = [];
    var fragment = document.createDocumentFragment();

    /* что делать при успешной загрузке с сервера */
    var successHandler = function (data) {
        photos = data;
        console.log(photos);
        render(photos);
    };

    /* вызывем загрузку с сервера с колбэком рендеринга */
    window.backend.load(successHandler);

    /* ну и удаляем ненужные блочки */    
    var commentLoader = document.querySelector('.social__loadmore');        /* кнопка "загрузить еще" */
    var commentCount = document.querySelector('.social__comment-count');        /* счетчик комментариев */    
    commentCount.classList.add('visually-hidden');
    commentLoader.classList.add('visually-hidden');
    
    

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   
    
    
   
    
    /* как получить случайное число */
    var getRandomNumber = function (min, max) {
        return Math.round(Math.random() * (max - min) + min);
    };

    /* как удалить все превью из разметки */
    var removeAllPhotos = function () {
        var allPhotos = document.querySelectorAll('.picture__link');
        for (var i = 0; i < allPhotos.length; i++) {
            similarPhotoList.removeChild(allPhotos[i]);
        }
    };

    
    /* как получить из массива 10 случайных элементов  */
    var getNewPhotos = function (arr, count) {
        var newArr = [];
        var transitArr = arr.concat();           /* копировать массив, чтобы не изменять стырый */
        for (var i = 0; i < count; i++) {
            var random = getRandomNumber(0, transitArr.length - 1);                    /* Как можно лучше? */
            newArr[i] = transitArr[random];
            transitArr.splice(random, 1);
        }
        return newArr;
    };

    /* просто возвращает тот же массив :) */
    var getPopularPhotos = function (arr) { 
        // var newArr = arr;
        return arr;
    };
    
    /* как отсортировать массив по количеству комментариев */
    var getDiscussedPhotos = function (arr) {
        var newArr = arr.concat();
        newArr.sort(function (left, right) {
            return right.comments.length - left.comments.length;
        });
        return newArr;
    };

    var classChanger = function () {
        for (var key in buttons) {
            buttons[key].classList.remove('img-filters__button--active')
        }
        this.classList.add('img-filters__button--active');
    };
    
    /* показываем фильтры сортировки фотографий */
    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');
    console.log(imgFilters);

    /* кнопки фильтров сортировки */
    var buttons = {
        popular: imgFilters.querySelectorAll('.img-filters__button')[0],
        new: imgFilters.querySelectorAll('.img-filters__button')[1],
        discussed: imgFilters.querySelectorAll('.img-filters__button')[2]
    };

    buttons.popular.addEventListener('click', function () {
        for (var key in buttons) {
            buttons[key].classList.remove('img-filters__button--active')
        }
        this.classList.add('img-filters__button--active');
        removeAllPhotos();
        render(getPopularPhotos(photos));
    });
    buttons.new.addEventListener('click', function () {
        for (var key in buttons) {
            buttons[key].classList.remove('img-filters__button--active')
        }
        this.classList.add('img-filters__button--active');
        removeAllPhotos();
        render(getNewPhotos(photos, 5));
    });
    buttons.discussed.addEventListener('click', function () {
        for (var key in buttons) {
            buttons[key].classList.remove('img-filters__button--active')
        }
        this.classList.add('img-filters__button--active');
        removeAllPhotos();
        render(getDiscussedPhotos(photos));
    });
    
})();


// Когда открыта фотка, всегда срабатывает слушатель кнопок (логчно) - можно по другому?