"use strict";

// Файл отвечает за проверку формы

(function () {
    
    /* Проверить поля формы */

    var textHashtags = document.querySelector('.text__hashtags');
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


})();
