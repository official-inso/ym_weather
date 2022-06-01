<?php

$debug = true;

error_reporting(E_ALL & ~E_NOTICE);

// session parametrs
$session_name = 'WEATHER_YM';

$version = '0.1.0.000 α';

// timezone parametrs
$timezone = 'Asia/Tashkent';

// telegram bot
define('API_YANDEX_WEATHER', 'b52aeba3-f057-4836-9576-aedd47d4f0e4');

// charset parametrs
$charset = 'utf8mb4';

// setting server
ini_set("memory_limit", "1000M");
ini_set("max_execution_time", "60");

if (session_status() == PHP_SESSION_NONE) {
  @session_name($session_name);
  @session_start();
}

date_default_timezone_set($timezone);

// Запись ошибок выполнения PHP скриптов в базу данных
include_once('err_handler.php');

// regular expression
define("REGEX", array(
  'login' => '/^([A-z0-9]){4,24}$/ui',
  'password' => '/^([a-zA-Z0-9!@#$%^&*()_\-+=\|\/.,:;[\]{}а-яА-ЯёЁЇїІіЄєҐґ\s]){8,32}$/ui',
  'name' => '/^([A-Za-zА-ЯЁа-яёЇїІіЄєҐґ\s-]){2,32}$/ui',
  'text' => '/^[A-zА-я0-9Ёё!"№;%:?*()_\-+@#$^=-\[\]\/|\{}.,~\'\s\n]{10,4096}$/ui',
  'title' => '/^[A-zА-я0-9Ёё!_#.,\s]{2,256}$/ui',
  'secondname' => '/^([A-Za-zА-ЯЁа-яёЇїІіЄєҐґ\s-]){2,42}$/ui',
  'patronymic' => '/^([A-Za-zА-ЯЁа-яёЇїІіЄєҐґ\s-]){2,42}$/ui',
  'date' => '/^([0-9]{1,5})-([0-9]{1,2})-([0-9]{1,2})$/ui',
  'email' => '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ui',
  'phone' => '/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/ui',
  'access_title' => '/^(?:[A-zА-яЁё0-9_()\[\]{}\\|\/"\':\s]){4,256}$/ui'
));

if (!(isset($_COOKIE["version"]))) {
  $time = mktime(0, 0, 0, 1, 1, 2120);
  @setcookie('version', $version, $time);
}

// Если версия у пользователя старая, то принудительно обновим ему страницу
if (isset($_COOKIE["version"])) {
  if ($_COOKIE["version"] != $version) {
    header('Expires: Th, 01 July 2021 00:00:00 GMT');
    header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
    header('Cache-Control: no-store, no-cache, must-revalidate');
    header('Cache-Control: post-check=0, pre-check=0', false);
    header('Pragma: no-cache');

    $time = mktime(0, 0, 0, 1, 1, 2120);
    @setcookie('version', $version, $time);
  }
}
