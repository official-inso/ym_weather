<?php

set_error_handler('err_handler');

function err_handler($errno, $errmsg, $filename, $linenum)
{

  global $debug;

  $logs_file = '../logs/error.log';
  $date = date('Y-m-d H:i:s (T)');

  echo (json_encode(array(
    'error' => true,
    'type' => 'FATAL_ERROR',
    'title' => 'Критическая ошибка!',
    'text' => 'В работе PHP скрипта произошла ошибка.<br><br>Более детальную информацию можно узнать в логах.',
    'line' => $debug ? $linenum : 'Data Protection',
    'file' => $debug ? $filename : 'Data Protection',
    'datetime' => array(
      'Y' => date("Y"),
      'm' => date("m"),
      'd' => date("d"),
      'H' => date("H"),
      'i' => date("i"),
      's' => date("s"),
      'full' => date("Y-m-d H:i:s"),
    ),
    'other' => array(
      'desc' => $errmsg,
      'errno' => $errno
    ),
  )));
  @file_put_contents($logs_file, json_encode(array(
    'date' => $date,
    'lang' => 'PHP',
    'desc' => $errmsg,
    'file' => $filename,
    'line' => $linenum,
    'other' => array(
      'errno' => $errno
    ),
  )) . "\r\n", FILE_APPEND);

  exit;
}
