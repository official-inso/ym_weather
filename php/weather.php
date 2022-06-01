<?php

include_once('config.php');
include_once('function.php');

$opts = array(
  'http' => array(
    'method' => "GET",
    'header' => "X-Yandex-API-Key:" . API_YANDEX_WEATHER . "\r\n"
  )
);

// Проверяем наличие POST или GET переменной type
if (isset($_POST['type']) || isset($_GET['type'])) {

  // Если есть POST переменная type
  if (isset($_POST['type'])) {

    // Получение актуальной погоды через API Яндекса
    if (preg_match_all("/^(weather)$/ui", $_POST['type'])) {

      // Если нет POST переменной coords
      if (!isset($_POST['coords'])) {
        echo (ajax_reply(
          'Ошибка!', // Заголовок ответа
          'Отсутствует POST переменная coords!', // Описание ответа
          true, // Наличие ошибки
          'ERROR', // Тип ответа
          null // Дополнительные данные для ответа
        ));
        exit;
      }

      if (gettype($_POST['coords']) != 'array') {
        echo (ajax_reply(
          'Ошибка!', // Заголовок ответа
          'POST параметр coords не является массивов!', // Описание ответа
          true, // Наличие ошибки
          'ERROR', // Тип ответа
          null // Дополнительные данные для ответа
        ));
        exit;
      }

      // Если нет POST переменной coords[l]
      if (!isset($_POST['coords']['l'])) {
        echo (ajax_reply(
          'Ошибка!', // Заголовок ответа
          'Отсутствует POST переменная coords[l]!', // Описание ответа
          true, // Наличие ошибки
          'ERROR', // Тип ответа
          null // Дополнительные данные для ответа
        ));
        exit;
      }

      // Если нет POST переменной coords[c]
      if (!isset($_POST['coords']['c'])) {
        echo (ajax_reply(
          'Ошибка!', // Заголовок ответа
          'Отсутствует POST переменная coords[c]!', // Описание ответа
          true, // Наличие ошибки
          'ERROR', // Тип ответа
          null // Дополнительные данные для ответа
        ));
        exit;
      }

      // Проверяем правильность переменной coords[l]
      if (!preg_match_all("/^[\d.]+$/ui", $_POST['coords']['l'])) {
        echo (ajax_reply(
          'Ошибка!', // Заголовок ответа
          'POST переменная coords[l] указана не верно!', // Описание ответа
          true, // Наличие ошибки
          'ERROR', // Тип ответа
          null // Дополнительные данные для ответа
        ));
        exit;
      }

      // Проверяем правильность переменной coords[c]
      if (!preg_match_all("/^[\d.]+$/ui", $_POST['coords']['c'])) {
        echo (ajax_reply(
          'Ошибка!', // Заголовок ответа
          'POST переменная coords[c] указана не верно!', // Описание ответа
          true, // Наличие ошибки
          'ERROR', // Тип ответа
          null // Дополнительные данные для ответа
        ));
        exit;
      }

      $coords = $_POST['coords'];

      $context = stream_context_create($opts);
      $f = file_get_contents('https://api.weather.yandex.ru/v2/forecast?lat=' . $coords['c'] . '&lon=' . $coords['l'] . '&lang=ru_RU&extra=true&limit=7&hours=false', false, $context);

      $f = json_decode($f);
      $t = $f;

      echo (ajax_reply(
        'Успех!', // Заголовок ответа
        'Все данные сохранены!', // Описание ответа
        true, // Наличие ошибки
        'SUCCESS', // Тип ответа
        $f // Дополнительные данные для ответа
      ));
      exit;
    }

    // Если при запросе не был указан тип запроса в переменной type
    else {
      echo (ajax_reply(
        'Ошибка!', // Заголовок ответа
        'Не верно указан тип запроса!', // Описание ответа
        true, // Наличие ошибки
        'ERROR', // Тип ответа
        null // Дополнительные данные для ответа
      ));
      exit;
    }
  }
}
// Отсутствует POST или GET переменная type
else {
  echo (ajax_reply(
    'Ошибка!', // Заголовок ответа
    'Отсутствует POST или GET переменная type', // Описание ответа
    true, // Наличие ошибки
    'ERROR', // Тип ответа
    null // Дополнительные данные для ответа
  ));
  exit;
}
