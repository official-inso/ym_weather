<?php

include_once('config.php');

function regex_encode($regex = array(), $type = '')
{
  $output = "";
  foreach ($regex as $key => $value) {
    $output .= '"' . $key . '":' . $value . ',';
  }
  if (preg_match_all("/^(echo)$/ui", $type)) {
    echo ("{" . $output . "}");
  } else {
    return "{" . $output . "}";
  }
}

function last_array_elements($array = array(), $n = 0)
{
  $arr = array();
  for ($i = 0; $i < count($array); $i++) {
    if ($i >= (count($array) - $n)) {
      array_push($arr, $array[$i]);
    }
  }
  return $arr;
}

function ajax_reply($title = '', $text = '', $error = true, $type = 'ERROR', $other = null)
{
  global $debug;
  $line = $debug ? debug_backtrace()[0]['line'] : 'Data Protection';
  $file = $debug ? debug_backtrace()[0]['file'] : 'Data Protection';
  return json_encode(array(
    'error' => $error,
    'type' => $type,
    'title' => $title,
    'text' => $text,
    'line' => $line,
    'file' => $file,
    'datetime' => array(
      'Y' => date("Y"),
      'm' => date("m"),
      'd' => date("d"),
      'H' => date("H"),
      'i' => date("i"),
      's' => date("s"),
      'full' => date("Y-m-d H:i:s"),
    ),
    'other' => $other,
  ));
}

function generate_hash($password, $cost = 15)
{
  $salt = substr(base64_encode(openssl_random_pseudo_bytes(17)), 0, 22);
  $salt = str_replace("+", ".", $salt);
  $param = '$' . implode('$', array(
    "2y", //select the most secure version of blowfish (>=PHP 5.3.7)
    str_pad($cost, 2, "0", STR_PAD_LEFT), //add the cost in two digits
    $salt //add the salt
  ));

  //now do the actual hashing
  return crypt($password, $param);
}

function debug()
{
  @$args = func_get_args();
  echo ('<style>.debug_php{opacity: 0.6; transition: 0.15s all; background-color: #fff; color: #303036; position: absolute; top: 10px; left: 10px; z-index: 9999; padding: 0px 10px 10px 10px; border-radius: 8px; box-shadow: 0 0 13px 0 rgba(104, 104, 104, 0.1);}.debug_php:hover{opacity: 1;}.debug_php-close{position: absolute; height: 25px; width: 25px; background-color: #dcdcdc; right: 10px; top: 10px; border-radius: 4px; cursor: pointer; text-align: center; line-height: 25px; user-select: none;}.debug_php-close:hover{background-color: #b7b7b7;} /* Atom One Light by Daniel Gamage Original One Light Syntax theme from https://github.com/atom/one-light-syntax base:    #fafafa mono-1:  #383a42 mono-2:  #686b77 mono-3:  #a0a1a7 hue-1:   #0184bb hue-2:   #4078f2 hue-3:   #a626a4 hue-4:   #50a14f hue-5:   #e45649 hue-5-2: #c91243 hue-6:   #986801 hue-6-2: #c18401 */ .hljs { color: #383a42; background: transparent; } .hljs-comment, .hljs-quote { color: #a0a1a7; font-style: italic; } .hljs-doctag, .hljs-keyword, .hljs-formula { color: #a626a4; } .hljs-section, .hljs-name, .hljs-selector-tag, .hljs-deletion, .hljs-subst { color: #e45649; } .hljs-literal { color: #0184bb; } .hljs-string, .hljs-regexp, .hljs-addition, .hljs-attribute, .hljs-meta .hljs-string { color: #50a14f; } .hljs-attr, .hljs-variable, .hljs-template-variable, .hljs-type, .hljs-selector-class, .hljs-selector-attr, .hljs-selector-pseudo, .hljs-number { color: #986801; } .hljs-symbol, .hljs-bullet, .hljs-link, .hljs-meta, .hljs-selector-id, .hljs-title { color: #4078f2; } .hljs-built_in, .hljs-title.class_, .hljs-class .hljs-title { color: #c18401; } .hljs-emphasis { font-style: italic; } .hljs-strong { font-weight: bold; } .hljs-link { text-decoration: underline; }</style><div class="debug_php"><div class="debug_php-close" onclick="this.parentElement.remove();">&#10006;</div>');
  for ($i = 0; $i < count(@$args); $i++) {
    echo ('<pre style="background-color: #eee; padding: 10px; border-radius: 4px; margin: 0; margin-top: 10px; max-height: 90vh; max-width: 80vw; white-space: break-spaces; overflow: auto; font-size: 14px; font-family: monospace;"><code>');
    @var_dump($args[$i]);
    echo ('</code></pre>');
  }
  echo ('</div>');
  echo ('<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.1.0/highlight.min.js"></script><script>hljs.highlightAll();</script>');
}

// Получаем хеш сумму директории
function program_hash_key($dirname, $regex = '/^(php|html|css|js|json|htaccess)$/ui')
{

  global $hash;

  hash_key($dirname, $regex);

  return (object)array(
    'hash' => $hash[count($hash) - 1],
    'count_files' => count($hash),
  );
}

function hash_key($dirname, $regex)
{

  $regexExtHash = $regex;

  // Объявляем переменные замены глобальными
  global $hash;

  if (!is_array($hash)) {
    $hash = array();
  }
  // Открываем текущую директорию
  $dir = opendir($dirname);
  // Читаем в цикле директорию
  while (($file = readdir($dir)) !== false) {

    // Если файл обрабатываем его содержимое
    if ($file != "." && $file != "..") {
      // Если имеем дело с файлом
      if (is_file($dirname . "/" . $file)) {
        $tmp = explode('.', $dirname . "/" . $file);
        $ext = @end($tmp);
        // $ext = @array_pop(@explode(".", $dirname."/".$file));
        if (preg_match($regexExtHash, $ext)) {
          array_push($hash, hash_file('md5', $dirname . "/" . $file));
          if (count($hash) > 1) {
            $hashLine = md5($hash[count($hash) - 2] . $hash[count($hash) - 1]);
            array_push($hash, $hashLine);
          }
        }
      }
      // Если перед нами директория, вызываем рекурсивно
      // функцию hash_key
      if (is_dir($dirname . "/" . $file)) {
        hash_key($dirname . "/" . $file, $regex);
      }
    }
  }
  // Закрываем директорию
  closedir($dir);
}

// Скрывает email звездочками
function obfuscate_email($email)
{
  $em   = explode("@", $email);
  $name = implode("@", array_slice($em, 0, count($em) - 1));
  $len  = floor(strlen($name) / 2);

  return substr($name, 0, $len) . str_repeat('*', 4) . "@" . end($em);
}

// Генерирует рандомную строку
function generate_string($strength = 16, $input = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
{
  $input_length = strlen($input);
  $random_string = '';
  for ($i = 0; $i < $strength; $i++) {
    $random_character = $input[mt_rand(0, $input_length - 1)];
    $random_string .= $random_character;
  }

  return $random_string;
}

// Генерирует рандомное число
function generate_int($strength = 4, $input = '0123456789')
{
  $input_length = strlen($input);
  $random_string = '';
  for ($i = 0; $i < $strength; $i++) {
    $random_character = $input[mt_rand(0, $input_length - 1)];
    $random_string .= $random_character;
  }

  return $random_string;
}

// Функция определения OS
function getOS($user_agent)
{
  $os_platform = NULL;

  $os_array = array(
    '/windows nt 10/i'      =>  'Windows 10',
    '/windows nt 6.3/i'     =>  'Windows 8.1',
    '/windows nt 6.2/i'     =>  'Windows 8',
    '/windows nt 6.1/i'     =>  'Windows 7',
    '/windows nt 6.0/i'     =>  'Windows Vista',
    '/windows nt 5.1/i'     =>  'Windows XP',
    '/windows xp/i'         =>  'Windows XP',
    '/windows nt 5.0/i'     =>  'Windows 2000',
    '/windows nt 5.2/i'     =>  'Windows Server 2003/XP x64',
    '/windows me/i'         =>  'Windows ME',
    '/win98/i'              =>  'Windows 98',
    '/win95/i'              =>  'Windows 95',
    '/win16/i'              =>  'Windows 3.11',
    '/macintosh|mac os x/i' =>  'Mac OS X',
    '/mac_powerpc/i'        =>  'Mac OS 9',
    '/linux/i'              =>  'Linux',
    '/ubuntu/i'             =>  'Ubuntu',
    '/iphone/i'             =>  'iOS',
    '/ipod/i'               =>  'ipodOs',
    '/ipad/i'               =>  'ipadOS',
    '/android/i'            =>  'Android',
    '/android 2/i'          =>  'Android 2',
    '/android 2.1/i'        =>  'Android 2.1',
    '/android 2.2/i'        =>  'Android 2.2',
    '/android 2.3/i'        =>  'Android 2.3',
    '/android 3/i'          =>  'Android 3',
    '/android 3.0/i'        =>  'Android 3',
    '/android 3.1/i'        =>  'Android 3.1',
    '/android 3.2/i'        =>  'Android 3.2',
    '/android 4/i'          =>  'Android 4',
    '/android 4.1/i'        =>  'Android 4.1',
    '/android 4.2/i'        =>  'Android 4.2',
    '/android 4.3/i'        =>  'Android 4.3',
    '/android 4.4/i'        =>  'Android 4.4',
    '/android 5/i'          =>  'Android 5',
    '/android 5.1/i'        =>  'Android 5.1',
    '/android 6/i'          =>  'Android 6',
    '/android 7/i'          =>  'Android 7',
    '/android 7.1/i'        =>  'Android 7.1',
    '/android 8/i'          =>  'Android 8',
    '/android 8.1/i'        =>  'Android 8.1',
    '/android 9/i'          =>  'Android 9',
    '/android 10/i'         =>  'Android 10',
    '/android 11/i'         =>  'Android 11',
    '/android 12/i'         =>  'Android 12',
    '/android 13/i'         =>  'Android 13',
    '/android 14/i'         =>  'Android 14',
    '/android 15/i'         =>  'Android 15',
    '/blackberry/i'         =>  'BlackBerry',
    '/webos/i'              =>  'Mobile'
  );

  foreach ($os_array as $regex => $value)
    if (preg_match($regex, $user_agent))
      $os_platform = $value;

  return $os_platform;
}

//Проверка на JSON
function is_json($string)
{
  json_decode($string);
  return (json_last_error() == JSON_ERROR_NONE);
}

// Функция определения Браузера
function getBrowser($user_agent)
{
  $browser = NULL;
  $browser_array = array(
    '/msie/i'        => 'Internet Explorer',
    '/firefox/i'     => 'Firefox',
    '/safari/i'      => 'Safari',
    '/chrome/i'      => 'Google Chrome',
    '/YaBrowser/i'   => 'Yandex Browser',
    '/edge/i'        => 'Microsoft Edge',
    '/Edg/i'         => 'Microsoft Edge_new',
    '/opera|OPR/i'   => 'Opera',
    '/MiuiBrowser/i' => 'MIUI Browser',
    '/netscape/i'    => 'Netscape',
    '/Samsung/i'     => 'Samsung Browser',
    '/maxthon/i'     => 'Maxthon',
    '/konqueror/i'   => 'Konqueror'
  );

  foreach ($browser_array as $regex => $value)
    if (preg_match($regex, $user_agent))
      $browser = $value;

  return $browser;
}

// Функция определения IP клиента
function getIp()
{
  $keys = [
    'HTTP_CLIENT_IP',
    'HTTP_X_FORWARDED_FOR',
    'REMOTE_ADDR'
  ];
  foreach ($keys as $key) {
    if (!empty($_SERVER[$key])) {
      $tmp = explode(',', $_SERVER[$key]);
      $ip = @trim(end($tmp));
      if (filter_var($ip, FILTER_VALIDATE_IP)) {
        return $ip;
      }
    }
  }
}

// Функция замены буквы в определённой позиции
function mb_substr_replace($string, $replace, $start, $limit, $encoding = 'utf-8')
{
  // Ищем символ, который надо заменить
  $symbol = mb_substr($string, $start, $limit, $encoding);

  // Заменяем и возвращаем
  return str_replace($symbol, $replace, $string);
}

// Функция форматирования номера телефона
function formatPhone($phone = null)
{
  if (is_null($phone)) $phone = '';

  $phone = preg_replace('/[^0-9]/', '', $phone);

  if (strlen($phone) != 11 and ($phone[0] != '7' or $phone[0] != '8')) {
    return FALSE;
  }

  $phone_number['dialcode'] = substr($phone, 0, 1);
  $phone_number['code']  = substr($phone, 1, 3);
  $phone_number['phone'] = substr($phone, -7);
  $phone_number['phone_arr'][] = substr($phone_number['phone'], 0, 3);
  $phone_number['phone_arr'][] = substr($phone_number['phone'], 3, 2);
  $phone_number['phone_arr'][] = substr($phone_number['phone'], 5, 2);

  $format_phone = '+' . $phone_number['dialcode'] . ' (' . $phone_number['code'] . ') ' . implode('-', $phone_number['phone_arr']);

  return $format_phone;
}

// Формируем строку для поиска с ошибками, 1 параметр входная строка, 2 параметр ячейка в базе
function stringLevenshtein($word = '', $cell = '')
{
  $str = '';
  $words = getLevenshtein($word);
  for ($i = 0; $i < count($words); $i++) {
    $word = $words[$i];
    if ($i == count($words) - 1) {
      $str .= "`$cell` LIKE '%$word%'";
    } else {
      $str .= "`$cell` LIKE '%$word%' OR ";
    }
  }
  return $str;
}

// Формируем строки из входной строки для нечеткого поиска с расстоянием Левенштейна
function getLevenshtein($word)
{
  $words = array();
  for ($i = 0; $i < strlen($word); $i++) {
    // insertions

    $words[] = mb_substr($word, 0, $i, "UTF-8") . '_' . mb_substr($word, $i, null, "UTF-8");
    // deletions
    $words[] = mb_substr($word, 0, $i, "UTF-8") . mb_substr($word, $i + 1, null, "UTF-8");
    // substitutions
    $words[] = mb_substr($word, 0, $i, "UTF-8") . '_' . mb_substr($word, $i + 1, null, "UTF-8");
  }
  // last insertion
  $words[] = $word . '_';
  return $words;
}

// Функция перевода русских букв в английские буквы
function getTranslit($string, $in, $out)
{
  $regexEN = "/^(en|English)$/ui";
  $regexRU = "/^(ru|russia)$/ui";
  if (preg_match_all($regexRU, $in)) {
    if (preg_match_all($regexEN, $out)) {
      $converter = array(
        'а' => 'a',   'б' => 'b',   'в' => 'v',
        'г' => 'g',   'д' => 'd',   'е' => 'e',
        'ё' => 'e',   'ж' => 'zh',  'з' => 'z',
        'и' => 'i',   'й' => 'y',   'к' => 'k',
        'л' => 'l',   'м' => 'm',   'н' => 'n',
        'о' => 'o',   'п' => 'p',   'р' => 'r',
        'с' => 's',   'т' => 't',   'у' => 'u',
        'ф' => 'f',   'х' => 'h',   'ц' => 'c',
        'ч' => 'ch',  'ш' => 'sh',  'щ' => 'sch',
        'ы' => 'y',   'э' => 'e',   'ю' => 'yu',
        'я' => 'ya',

        'А' => 'A',   'Б' => 'B',   'В' => 'V',
        'Г' => 'G',   'Д' => 'D',   'Е' => 'E',
        'Ё' => 'E',   'Ж' => 'Zh',  'З' => 'Z',
        'И' => 'I',   'Й' => 'Y',   'К' => 'K',
        'Л' => 'L',   'М' => 'M',   'Н' => 'N',
        'О' => 'O',   'П' => 'P',   'Р' => 'R',
        'С' => 'S',   'Т' => 'T',   'У' => 'U',
        'Ф' => 'F',   'Х' => 'H',   'Ц' => 'C',
        'Ч' => 'Ch',  'Ш' => 'Sh',  'Щ' => 'Sch',
        'Ы' => 'Y',   'Э' => 'E',   'Ю' => 'Yu',
        'Я' => 'Ya',
      );
    }
    if (preg_match_all($regexRU, $out)) {
      return $string;
    }
  }
  if (preg_match_all($regexEN, $in)) {
    if (preg_match_all($regexRU, $out)) {
      $converter = array(
        'ch' => 'ч',  'sh' => 'ш', 'sch' => 'щ',
        'a' => 'а',   'b' => 'б',   'v' => 'в',
        'g' => 'г',   'd' => 'д',   'e' => 'е',
        'zh' => 'ж',  'z' => 'з',   'i' => 'и',
        'k' => 'к',   'ya' => 'я',  'yu' => 'ю',
        'l' => 'л',   'm' => 'м',   'n' => 'н',
        'o' => 'о',   'p' => 'п',   'r' => 'р',
        's' => 'с',   't' => 'т',   'u' => 'у',
        'f' => 'ф',   'h' => 'х',   'c' => 'ц',
        'y' => 'ы',   'w' => 'уи',

        'CH' => 'Ч',  'SH' => 'Ш', 'SCH' => 'Щ',
        'A' => 'А',   'B' => 'Б',   'V' => 'В',
        'G' => 'Г',   'D' => 'Д',   'E' => 'Е',
        'ZH' => 'Ж',  'Z' => 'З',   'I' => 'И',
        'K' => 'К',   'YA' => 'Я',  'YU' => 'Ю',
        'L' => 'Л',   'M' => 'М',   'N' => 'Н',
        'O' => 'О',   'P' => 'П',   'R' => 'Р',
        'S' => 'С',   'T' => 'Т',   'U' => 'У',
        'F' => 'Ф',   'H' => 'Х',   'C' => 'Ц',
        'Y' => 'Ы',
      );
    }
    if (preg_match_all($regexEN, $out)) {
      return $string;
    }
  }

  return strtr($string, $converter);
}

// Функция возвращает размер файла или папки в нормальных единицах
function getSymbolByQuantity($bytes)
{
  $symbol = array('б', 'Кб', 'Мб', 'Гб', 'Тб', 'PiB', 'EiB', 'ZiB', 'YiB');
  $exp = floor(log($bytes) / log(1024));

  return sprintf('%.2f ' . $symbol[$exp], ($bytes / pow(1024, floor($exp))));
}

// Функция определяет является ли дероктория подключенным диском
function is_disk($filename)
{
  if (is_dir($filename)) {
    if (disk_total_space('/') == disk_total_space($filename) && disk_free_space('/') == disk_free_space($filename)) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}
