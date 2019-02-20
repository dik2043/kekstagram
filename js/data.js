"use strict";

// Файл отвечает за создание объекта данных

(function () {

    window.data = {
        similarPhotoList: document.querySelector('.pictures'),     /* !! контейнер для всех превью */
        photoEssence: [],

        /* Получить случайное число */

        getRandomNumber: function (min, max) {     
            return Math.round(Math.random() * (max - min) + min);
        }
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
        for (var i = 0; i <= window.data.getRandomNumber(0, oldArr.length - 1); i++) {
            var random = window.data.getRandomNumber(0, transitArr.length - 1);                                     /* Как можно лучше? */
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
            'likes': window.data.getRandomNumber(15, 200),
            'comments': newComments,
            'description': descriptions[window.data.getRandomNumber(0, descriptions.length - 1)]
        };
        return obj;
    };

    /* Наполняем массив случайных готовых фотографий */

    for (var i = 0; i <= 24; i++) {
        window.data.photoEssence[i] = createObj(i);
    }
    
})();