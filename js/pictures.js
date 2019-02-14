"use strict";

// Файл отвечает за взаимодействия с пользователем

(function () {

// window.data.similarPhotoList.classList.remove('hidden');  /* почему при удалении этой строчки ничего не меняется? :D */


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

    var textDescription = document.querySelector('.text__description');
    var submitImg = document.querySelector('.img-upload__submit');

    /* Добавить эффект */

    var addEffectToItem = function (evt) {
        var clickedElem = evt.target;
        scalePin.style.left = scaleLine.clientWidth + 'px';
        document.querySelector('.scale__level').style.width = '100%';
        /* ширина полосы */
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
        imgPreview.className = 'effects__preview--none';
        /* ставим класс без фильтра */
        imgPreview.removeAttribute('style');
        /* уюираем атрибуты фильтра*/
        imgOverlay.classList.remove('hidden');
        scaleValue.value = '100%';
        imgPreview.style.transform = 'scale(' + 1 + ')';
    };

    var closeImgOverlay = function () {
        uploadFile.value = null;
        imgOverlay.classList.add('hidden');
        document.removeEventListener('keydown', onPreviewEscPress);
        /* убрать слушатель */
        document.removeEventListener('keydown', onPreviewEnterPress);
    };

    /* Добавить все нужные слушатели */

    uploadFile.addEventListener('change', function () {
        showImgOverlay();
        scalePin.style.left = scaleLine.clientWidth + 'px';
        document.querySelector('.scale__level').style.width = '100%';
        /* ширина полосы */
        document.addEventListener('keydown', onPreviewEscPress);
        document.addEventListener('keydown', onPreviewEnterPress);
    });

    imgOverlayCloser.addEventListener('click', function () {
        closeImgOverlay();
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
    

    /* Кнопки на preview */

    var onPreviewEnterPress = function (evt) {
        if (evt.keyCode === 13 && evt.target.className === 'text__hashtags') {       /* если фокус на поле, то не закрываем */
            evt.target.blur();
        } else if (evt.keyCode === 13 && evt.target.tagName === 'TEXTAREA') {
            evt.target.blur();
        }
    };

    var onPreviewEscPress = function (evt) {
        if (evt.keyCode === 27 && evt.target.className === 'text__hashtags') {       /* если фокус на поле, то не закрываем */
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
        var value1 = Number(arr[0]);
        /* как можно лучше? */
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
        value1 -= Number(25);
        /* как можно лучше? */
        arr[0] = value1;
        if (value1 <= 25) {
            value1 = 25;
        }
        value = value1 + '%';
        scaleValue.value = value1 + '%';
        imgPreview.style.transform = 'scale(' + value1 / 100 + ')';
        return value;
    };

// как сделать нормально этот гребанный фильтр???
    /* Функция перемещения пина фильтра */

    scalePin.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        var startCoords = {
            x: evt.clientX
        };

        var onMouseMove = function (moveEvt) {
            moveEvt.preventDefault();

            var shift = {
                x: startCoords.x - moveEvt.clientX
            };

            startCoords = {
                x: moveEvt.clientX
            };

            scalePin.style.left = (scalePin.offsetLeft - shift.x) + 'px';
            changeSaturation();

            if (scalePin.offsetLeft < 0) {
                scalePin.style.left = 0 + 'px';
            } else if (scalePin.offsetLeft > scaleLine.clientWidth) {
                scalePin.style.left = scaleLine.clientWidth + 'px';
            }
        };

        var onMouseUp = function (upEvt) {
            upEvt.preventDefault();

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    var changeSaturation = function () {
        getIntensityEffect();
        intensityEffect = getIntensityEffect();
        document.querySelector('.scale__level').style.width = intensityEffect + '%';
        /* ширина полосы */
        console.log(intensityEffect);
        /* Большая некрасивая проверка */
        switch (imgPreview.className) {
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
                imgPreview.style.filter = 'blur(' + intensityEffect / 33 + 'px)';
                break;

            case 'effects__preview--heat':
                imgPreview.style.filter = 'brightness(' + Number(Number(1) + intensityEffect / 50) + ')';
                break;
        }
    };

})();


// Заметки
// Как сделать проверку на разделение пробелом?
// Как сделать проверку на регистр?
// В заданиях пункт - при переключении на оригинал слайдер скрывается - как сделать?