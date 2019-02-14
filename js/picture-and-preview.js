"use strict";

// Файл отвечает за создание миниатюр и отрисовку/закрытие большого фото

(function () {

    /* Создаем генерируемую сущность фотографии */

    var similarPhotoTemplate = document.querySelector('#picture')       /* шаблон превью фотографии */
        .content
        .querySelector('.picture__link');
    
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
    for (var i = 0; i < window.data.photoEssence.length; i++) {
        fragment.appendChild(renderPhoto(window.data.photoEssence[i], i));
    }

    /* Прикрепляем фрагмент с фото к верстке */

    window.data.similarPhotoList.appendChild(fragment);

    
    // Вторая часть с открытой фотографией


    var bigPicture = document.querySelector('.big-picture');        /* открытая фотка */

    var similarCommentsList = document.querySelector('.social__comments');      /* список комментариев к фото */
    // var commentItem = similarCommentsList.querySelectorAll('.social__comment');     /* массив комментариев из списка */

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
            commentImg.src = 'img/avatar-' + window.data.getRandomNumber(1, 6) + '.svg';

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
    
    var commentLoader = document.querySelector('.social__loadmore');        /* кнопка "загрузить еще" */
    var commentCount = document.querySelector('.social__comment-count');        /* счетчик комментариев */
    
    commentCount.classList.add('visually-hidden');
    commentLoader.classList.add('visually-hidden');

    /* Добавить обработчик открытия на кадую фотку */

    var addListenerToEveryPhoto = function (evt) {
        var photos = document.querySelectorAll('.picture__img');
        for (var i = 0; i < photos.length; i++) {
            photos[i].addEventListener('click', function (evt) {
                renderBigPhoto(window.data.photoEssence[getId(evt)]);
            });
        }
    };

    addListenerToEveryPhoto(window.data.photoEssence);

    /* Закрыть большое фото */

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

    /* Получить id кликнутой фотки для открытия нужной */

    var getId = function (evt) {
        var clickedElem = evt.target;
        var offerId = clickedElem.parentNode.dataset.offerId;
        console.log(offerId);
        return offerId;
    };
    
})();