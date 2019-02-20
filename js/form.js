"use strict";

// Файл отвечает за проверку формы

(function () {

    var textHashtags = document.querySelector('.text__hashtags');   /* поле хэштэгов */
    
    /*  как проверять поле хэштегов */
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

    // Проверяем поля формы 
    
    textHashtags.addEventListener('input', function (evt) {
        checkFields(evt);
    });
    
    // Изменяем поведение при подтверждении формы

    var uploadForm = document.querySelector('.img-upload__form');
    uploadForm.addEventListener('submit', function (evt) {
        window.backend.save(new FormData(uploadForm), function () {
            window.pictures.imgOverlay.classList.add('hidden');
        });
        evt.preventDefault();
    })


})();
