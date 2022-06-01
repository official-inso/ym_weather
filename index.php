<?php


?>
<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Погода</title>

  <meta name="theme-color" content="#d0e6ff">
  <link rel="manifest" href="webmanifest.php">

  <link rel="stylesheet" href="styles/config.css">
  <link rel="stylesheet" href="media/fonts/fonts.css">
  <link rel="stylesheet" href="styles/style.css">
  <link rel="stylesheet" href="styles/notification.css">

  <script src="js/jquery.js"></script>
  <script src="js/jquery-qrcode-0.18.0.js"></script>
  <script src="js/jquery.cookie.js"></script>
  <script src="js/jquery.inputmask.js"></script>
  <script src="js/scrollbar.js"></script>
  <script src="js/include.js"></script>
  <script src="js/index.js"></script>

  <script src="js/service.js"></script>
</head>

<body>

  <!-- <div class='egg_code'>
    <div class='egg_code-block'>
      <div class='egg_code-block-status'>Новая пасхалка!</div>
      <input class='egg_code-input' required="required" placeholder="Введите код пасхалки">
      <div class='egg_code-close icons-backspace' titlejs='Стереть' clickeffects onclick="Egg.backspace();"></div>
      <div class='egg_code-close icons-close' titlejs='Закрыть' clickeffects onclick="Egg.close()"></div>
    </div>
    <canvas class='egg_code-canvas' id='egg_code_confetti'></canvas>
  </div> -->

  <div class='download icons-download' titlejs='Скачать историю' clickeffects onclick="download()"></div>

  <div class='content scrollbar-inner'>
    <section main load>
      <div class='main-content'>
        <div class='wrapper'>
          <div class='main-content-data'>
            <div class='main-content-weather'>
              <div class='main-content-weather-ico' id='fact_ico' titlejs=''></div>
              <div class='main-content-weather-text'>
                <span id='fact_temp'>12</span>
                <span>°C</span>
              </div>
            </div>
            <div class='main-content-lacation'>
              <span>Ваше местоположение:</span>
              <span><span id='location_c'>58.004497</span> широта,</span>
              <span><span id='location_l'>58.004497</span> долгота</span>
            </div>
            <div class='main-content-more_weather'>
              <div class='main-content-more_weather-title'>Погода на 7 дней</div>
              <div class='main-content-more_weather-grid'>

                <?php for ($i = 0; $i < 7; $i++) : ?>
                  <div class='main-content-more_weather-grid-elem'>
                    <div class='main-content-more_weather-grid-elem-ico'></div>
                    <div class='main-content-more_weather-grid-elem-degrees'>
                      <span>12</span>
                      <span>°C</span>
                    </div>
                    <div class='main-content-more_weather-grid-elem-text'>
                      Понедельник 15 июня
                    </div>
                  </div>
                <?php endfor; ?>

              </div>
            </div>
          </div>
        </div>

      </div>
      <div class='main-bg'>
        <!-- <div class='main-bg-1'></div> -->
        <div class='main-bg-gradient'></div>
      </div>
    </section>
    <section history>
      <div class='history'>
        <div class='wrapper' id='history_lines'>

        </div>
      </div>
    </section>
  </div>
</body>

</html>