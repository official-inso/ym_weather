<?php

require 'php/config.php';
$light = '#ffffff';
$dark = '#272727';

header('Content-type: application/manifest+json; charset=utf-8');
$arr = array(
  "name" => "Погода",
  "short_name" => "Погода",
  "description" => "Приложение для получения погоды",
  "display_modifiers" => array("window-controls-overlay"),
  "icons" => array(
    array(
      "src" => "/media/icons/maskable_icon_x48.png",
      "sizes" => "16x16",
      "type" => "image/png"
    ),
    array(
      "src" => "/media/icons/maskable_icon_x48.png",
      "sizes" => "32x32",
      "type" => "image/png"
    ),
    array(
      "src" => "/media/icons/maskable_icon_x48.png",
      "sizes" => "48x48",
      "type" => "image/png"
    ),
    array(
      "src" => "/media/icons/maskable_icon_x72.png",
      "sizes" => "72x72",
      "type" => "image/png"
    ),
    array(
      "src" => "/media/icons/maskable_icon_x96.png",
      "sizes" => "96x96",
      "type" => "image/png"
    ),
    array(
      "src" => "/media/icons/maskable_icon_x128.png",
      "sizes" => "128x128",
      "type" => "image/png"
    ),
    array(
      "src" => "/media/icons/maskable_icon_x192.png",
      "sizes" => "192x192",
      "type" => "image/png",
      "purpose" => "any maskable"
    ),
    array(
      "src" => "/media/icons/maskable_icon_x512.png",
      "sizes" => "384x384",
      "type" => "image/png"
    ),
    array(
      "src" => "/media/icons/maskable_icon_x512.png",
      "sizes" => "512x512",
      "type" => "image/png"
    )
  ),
  "shortcuts" => array(),
  "start_url" => "/index.php",
  "version" => $version,
  "theme_color" => '#fff',
  "background_color" => '#fff',
  "orientation" => "portrait",
  "display" => "standalone",
);

echo json_encode($arr);
