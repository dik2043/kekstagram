"use strict";

// Файл отвечает за взаимодействия с пользователем

(function () {
    
    window.pictures = {};
    
    window.pictures.imgOverlay = document.querySelector('.img-upload__overlay');    /* контейнер превью */
    var imgOverlayCloser = window.pictures.imgOverlay.querySelector('.img-upload__cancel');
    var imgPreview = document.querySelector('.img-upload__preview').querySelector('img');  /* само фото */
    var uploadFile = document.querySelector('#upload-file');        
    var scalePin = document.querySelector('.scale__pin');
    var scaleValue = document.querySelector('.resize__control--value');
    var scalePlus = document.querySelector('.resize__control--plus');
    var scaleMinus = document.querySelector('.resize__control--minus');
    var effectsList = document.querySelector('.effects__list');     /* контейнер с эффектами для фото */
    var effectsListItems = effectsList.querySelectorAll('.effects__radio');     /* массив эффектов */
    var scaleLine = document.querySelector('.scale__line');
    var intensityEffect;

    /* заменяем разметочный эффект на оригинал */
    document.querySelector('#effect-heat').removeAttribute('checked');
    document.querySelector('#effect-none').setAttribute('checked', 'checked');

    
    // Взаимодействие с окном своего фото (по 110)

    /* как показать и закрыть блок фильтров */
    var showImgOverlay = function () {
        imgPreview.className = 'effects__preview--none';    /* ставим класс без фильтра */
        imgPreview.removeAttribute('style');    /* уюираем атрибуты фильтра*/
        window.pictures.imgOverlay.classList.remove('hidden');
        scaleValue.value = '100%';
        imgPreview.style.transform = 'scale(' + 1 + ')';    /* делаем стандартный размер фото */
    };
    var closeImgOverlay = function () {
        uploadFile.value = null;    /* сбрасываем значение поля, чтобы открыть потом по любому изменению */
        window.pictures.imgOverlay.classList.add('hidden');
        /* удалить слушатели */
        document.removeEventListener('keydown', onPreviewEscPress);
        document.removeEventListener('keydown', onPreviewEnterPress);
    };

    /* как реагировать на нажатие кнопок ent и esc */
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

    /* как изменять размер своего фото */
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
    

    /* добавляем обработчик открытия и закрытия своего фото */
    uploadFile.addEventListener('change', function () {
        showImgOverlay();
        scalePin.style.left = scaleLine.clientWidth + 'px';
        document.querySelector('.scale__level').style.width = '100%';       /* ширина полосы */
        document.addEventListener('keydown', onPreviewEscPress);
        document.addEventListener('keydown', onPreviewEnterPress);
    });
    imgOverlayCloser.addEventListener('click', function () {
        closeImgOverlay();
    });

    /* добавляем обработчики изменения масштаба своего фото */
    scalePlus.addEventListener('click', function () {
        getSizePlus();
    });
    scaleMinus.addEventListener('click', function () {
        getSizeMinus();
    });
    

    // Взаимодействие с фильтром своего фото

    /* как получить координаты от родителя */
    var getCoordsInPreview = function (obj) {
        var posY = obj.offsetTop;  // верхний отступ эл-та от родителя
        var posX = obj.offsetLeft; // левый отступ эл-та от родителя
        return {
            'x': posX,
            'y': posY
        };
    };

    /* как получить значение шкалы интенсивности */
    var getIntensityEffect = function () {
        return Math.round(getCoordsInPreview(scalePin).x / scaleLine.clientWidth * 100);
    };
    
    /* как применить эффект к фото */
    var addEffectToItem = function (evt) {
        var clickedElem = evt.target;
        scalePin.style.left = scaleLine.clientWidth + 'px';     /* расположение пина */
        document.querySelector('.scale__level').style.width = '100%';        /* ширина полосы */
        /* сложная строчка - значение инпута, который в родителе кликнутого элемета */
        var inputValue = clickedElem.parentNode.querySelector('input').value;
        var imgClass = imgPreview.className;
        imgPreview.removeAttribute('style');       /* чтобы не было предыдущих эффектов */
        if (imgClass) {
            imgPreview.classList.remove(imgClass);
        }
        imgPreview.classList.add('effects__preview--' + inputValue);
    };

    /* как менять уровень фильтра на фото */
    var changeSaturation = function () {
        intensityEffect = getIntensityEffect();
        document.querySelector('.scale__level').style.width = intensityEffect + '%';    /* ширина полосы */
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

    /* добавляем обработчики эффекта к своему фото */
    for (var i = 0; i < effectsListItems.length; i++) {
        effectsListItems[i].addEventListener('click', function (evt) {
            addEffectToItem(evt);
        })
    }
    
    /* добавляем обработчик перемещения пина фильтра (сразу с объявлением) */
    scalePin.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        var startCoords = {
            x: evt.clientX      /* координата х кликнутого места */
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


})();


// Заметки
// В заданиях пункт - при переключении на оригинал слайдер скрывается - чекак?