'use strict';

// Файл отвечает за получение и отправку данных на сервер

(function () {

    window.backend = {};
    
    /* как загрузить данные с сервера и отдать их в колбэк (onLoad) */
    window.backend.load = function (onLoad, onError) {
        var URL = 'https://js.dump.academy/kekstagram/data';
        var xhr = new XMLHttpRequest();                 /* объявить объект запроса */

        xhr.responseType = 'json';      /* ? видимо, чтоб ответ распарсился на js ? */

        xhr.addEventListener('load', function () {      /* по загрузке с сервера сделать функцию onLoad */
            var error;
            switch (xhr.status) {
                case 200:
                    onLoad(xhr.response);          /* передать в onLoad значение ответа с сервера */
                    break;

                case 400:
                    error = 'неправильный запрос';
                    break;
                case 401:
                    error = 'бла бла';
                    break;
                case 404:
                    error = 'извините, на сервере ничего не найдено';
                    break;

                default:
                    error = 'статус ответа ' + xhr.status + ' ' + xhr.responseText;
            }

            if (error) {
                onError(error);
            }
        });

        /* это все еще надо? */
        xhr.addEventListener('error', function () {      /* при ошибке сделать функцию onError */
            onError('Произошла ошибка соединения');
            console.log(xhr.status);
        });

        xhr.open('GET', URL);                 /* открыть объект запроса */
        xhr.send();                 /* ну и отправить запрос */
    };

    /* как сохранить данные на сервере */
    window.backend.save = function (data, onLoad, onError) {
        var URL = 'https://js.dump.academy/kekstagram';

        var xhr = new XMLHttpRequest();

        xhr.responseType = 'json';

        xhr.addEventListener('load', function () {      /* по загрузке сделать функцию onLoad */
            onLoad(xhr.response);       /* передать в onLoad значение ответа с сервера */
            console.log(xhr.response);
        });

        xhr.addEventListener('error', function () {      /* при ошибке сделать функцию onError */
            onError('Произошла ошибка соединения');
            console.log(xhr.status);
        });

        xhr.open('POST', URL);      /* открыть объект запроса */
        xhr.send(data);                 /* ну и отправить запрос */
    };

})();

// Ошибка Cannot read property 'name' of undefined скорее всего возникает, когда setup.js выполняется быстрее,
// чем прийдет результат запроса XMLHttpRequest
// не сделал обработку ошибок при сохранении на сервер