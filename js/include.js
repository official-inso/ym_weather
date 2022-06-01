$(document).ready(function(){
  $(".scrollbar-inner").scrollbar();
  ClickEffects.init('rounded');
  titlejs();
  Protection.console();
  Noti.init();
})

/**
 * @file Файл с основными функция
 * @author Роман Жужгов
 * @version 0.1
 */

/**
 * Процедура иницализации всплывающих уведомлений
 */
function titlejs(){
  if(window['titleJSArr'] == undefined){
    window['titleJSArr'] = [];
  }

  let css = 'html{ --titleJS: var(--bg1); } .titlejs{ position: fixed; padding: 10px 14px; font-family: gBold; font-size: 16px; width: max-content; height: max-content; word-break: break-word; max-width: 180px; color: var(--color); background-color: var(--titleJS); box-shadow: rgb(0 0 0 / 4%) 0px 0px 0.4rem, rgb(0 0 0 / 16%) 0px 0.4rem 3.2rem; z-index: 999999999999999999999999999; border-radius: var(--radius-md); transition: var(--trans-md); pointer-events: none; user-select: none; opacity: 0; visibility: hidden; outline: none; will-change: transform, opacity; } .titlejs > .titlejs-triangle-bottom{ width: 0; height: 0; border-left: 7px solid transparent; border-right: 7px solid transparent; border-top: 8px solid var(--titleJS); position: absolute; bottom: 1px; transform: translate(0px, 100%); } .titlejs > .titlejs-triangle-top{ width: 0; height: 0; border-left: 7px solid transparent; border-right: 7px solid transparent; border-bottom: 8px solid var(--titleJS); position: absolute; top: 1px; transform: translate(0px, -100%); }.titlejs-line{ position: relative; height: 4px; width: 160px; margin-top: 10px; margin-bottom: 10px; border-radius: var(--radius-lg); background-position: center; background-repeat: no-repeat; background-size: contain; background: linear-gradient(to right, rgba(79,196,33,1) 0%, rgba(79,196,33,1) 33%, rgba(230,198,39,1) 33%, rgba(230,198,39,1) 66%, rgba(231,56,39,1) 66%, rgba(231,56,39,1) 100%); } .titlejs-line:before{ content: ""; height: 12px; width: 12px; position: absolute; transform: translate(-50%, -50%); background: radial-gradient(ellipse at center, #303036 0%, #303036 31%, #ffffff 37%, #fff 100%); border-radius: var(--radius-elg); left: 6px; top: 2px; transition: var(--trans-elg); box-shadow: 0 0 3px 2px var(--shadowColor); } .titlejs-line[active="0"]:before{ left: 6px; top: 2px; background: radial-gradient(ellipse at center, #303036 0%, #303036 31%, #ffffff 37%, #fff 100%);} .titlejs-line[active="1"]:before{ left: 50px; top: 2px; background: radial-gradient(ellipse at center, rgba(79,196,33,1) 0%, rgba(79,196,33,1) 31%, #ffffff 37%, #fff 100%);} .titlejs-line[active="2"]:before{ left: 107px; top: 2px; background: radial-gradient(ellipse at center, rgba(230,198,39,1) 0%, rgba(230,198,39,1) 31%, #ffffff 37%, #fff 100%);} .titlejs-line[active="3"]:before{ left: 155px; top: 2px; background: radial-gradient(ellipse at center, rgba(231,56,39,1) 0%, rgba(231,56,39,1) 31%, #ffffff 37%, #fff 100%);} .titlejs-title{ font-family: pfb; margin-top: 5px; text-align: center; margin-bottom: 13px; } .titlejs-text2{ position: relative; font-family: g; font-size: 13px; margin-bottom: 3px; text-align: center; max-width: 160px; margin-top: 12px; } .titlejs-sessionID{text-align: center; padding: 6px 0px; width: 100%; border-bottom: 1px solid #82828252;} .titlejs-session-token{text-align: center; width: 100%; word-break: break-word; padding: 8px 0px 0px 0px; font-family: g;} .titlejs-session-token:before{content: ""; height: 16px; width: 23px; position: absolute; background: linear-gradient( 90deg , var(--titleJS), transparent);} .titlejs-session-text{text-align: center; width: 100%; word-break: break-word; padding: 8px 0px 0px 0px; font-family: g;}',
      head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);

  $("body").on("mouseenter", '*[titlejs]', function(e) {

    e.preventDefault();
    e.stopPropagation();

    let p = {
      left: $(this).offset().left,
      top: $(this).offset().top,
      bottom: document.documentElement.clientHeight - $(this).offset().top,
      right: document.documentElement.clientWidth - $(this).offset().left,
      block: {
        height: $(this).outerHeight(),
        width: $(this).outerWidth(),
      },
      height: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth,
      height80: document.documentElement.clientHeight * 0.5,
      width80: document.documentElement.clientWidth * 0.5,
      x: 0,
      y: 0,
      triangle: {
        x: 'left',
        y: 'top',
      },
    }


    let top    = p.top > 150 && p.top > p.height80;
    let left   = p.left >= 0 && p.width80 > p.left;
    let text   = $(this).attr('titlejs');
    let color  = $(this).attr('titlejs-color');
    let bg     = $(this).attr('titlejs-bg');
    let bg1     = $(this).attr('titlejs-bg');
    let right  = p.right > 150;
    let bottom = p.bottom > 150;
    let id     = Random.id();
    let output = '';
    let flag   = false;

    if(text.length == 0){
      return;
    }

    if(color != undefined){
      if(color.length > 0){
        color = 'color: ' + color + '; ';
      }
    } else {
      color = '';
    }
    if(bg != undefined){
      if(bg.length > 0){
        bg = 'background-color: ' + bg + '; ';
      }
      if(bg1.length > 0){
        bg1 = 'border-top-color: ' + bg1 + '; ' + 'border-bottom-color: ' + bg1 + '; ';
      }
    } else {
      bg = '';
      bg1 = '';
    }

    if(left && top){
      // Рекомендуется разместить слева сверху от блока
      let style  = 'left: ' + p.left + 'px; top: ' + p.top + 'px; transform: translate(0px, calc(-100% - 7px));';

      output  = "<div id='" + id + "' class='titlejs' style='" + bg + color + style + "'>";

      if(p.block.width < 60){
        output += "<div style='left: " + (p.block.width / 2) + "px; " + bg1 + " transform: translate(-50%, 100%);' class='titlejs-triangle-bottom'></div>";
      } else {
        output += "<div style='" + bg1 + "' class='titlejs-triangle-bottom'></div>";
      }

      output += "<div style='" + bg + "' class='titlejs-text'>" + text + "</div>";
      output += "</div>";

      flag = true;
    } else if(left && !top){
      // Рекомендуется разместить слева снизу от блока

      let style  = 'left: ' + p.left + 'px; top: ' + (p.top + p.block.height) + 'px; transform: translate(0px, calc(0% + 7px));';

      output  = "<div id='" + id + "' class='titlejs' style='" + bg + color + style + "'>";

      if(p.block.width < 60){
        output += "<div style='left: " + (p.block.width / 2) + "px; " + bg1 + " transform: translate(-50%, -100%);' class='titlejs-triangle-top'></div>";
      } else {
        output += "<div style='" + bg1 + "' class='titlejs-triangle-top'></div>";
      }

      output += "<div class='titlejs-text'>" + text + "</div>";
      output += "</div>";

      flag = true;
    } else if(!left && !top){
      // Рекомендуется разместить справа снизу от блока

      let style  = 'right: ' + (p.right - p.block.width) + 'px; top: ' + (p.top + p.block.height) + 'px; transform: translate(0%, calc(0% + 7px));';

      output  = "<div id='" + id + "' class='titlejs' style='" + bg + color + style + "'>";

      if(p.block.width < 60){
        output += "<div style='right: " + (p.block.width / 2) + "px; " + bg1 + " transform: translate(50%, -100%);' class='titlejs-triangle-top'></div>";
      } else {
        output += "<div class='titlejs-triangle-top' style='" + bg1 + "right: 10px;'></div>";
      }

      output += "<div class='titlejs-text'>" + text + "</div>";
      output += "</div>";

      flag = true;
    } else if(!left && top){
      // Рекомендуется разместить справа сверху от блока

      let style  = 'right: ' + (p.right - p.block.width) + 'px; bottom: ' + p.bottom + 'px; transform: translate(0%, -7px);';

      output  = "<div id='" + id + "' class='titlejs' style='" + bg + color + style + "'>";

      if(p.block.width < 60){
        output += "<div style='right: " + (p.block.width / 2) + "px; " + bg1 + " transform: translate(50%, 100%);' class='titlejs-triangle-bottom'></div>";
      } else {
        output += "<div class='titlejs-triangle-bottom' style='" + bg1 + " right: 10px;'></div>";
      }
      output += "<div class='titlejs-text'>" + text + "</div>";
      output += "</div>";

      flag = true;
    }
    if(flag){
      titleJSArr.push('#' + id)
      $('body').append(output);
      setTimeout(function(){
        $('.titlejs').css({
          'visibility':'visible',
          'opacity':'1'
        });
        setTimeout(() => {
          if($('.titlejs').css('visibility') == 'visible'){
            navigator.vibrate(30);
          }
        }, 150)
      }, 800);
    }
  });
  $("body").on("mouseleave", '*[titlejs]', function(e) {
    id = titleJSArr.shift();
    $(id).css({
      'visibility':'hidden',
      'opacity':'0'
    });
    $(id).remove();
    if($('.titlejs').length > 0){
      $('.titlejs').remove();
    }
  });
  $('*').scroll(function(){
    if($('.titlejs').length > 0){
      $('.titlejs').remove();
    }
  });
  $('*').on('click', function(){
    if($('.titlejs').length > 0){
      $('.titlejs').remove();
    }
  });
}

function lengthInUtf8Bytes(str) {
  // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}

/**
 * Определение строки на JSON
 * @param {*} item 
 * @returns {Boolean}
 */
function isJson(item) {
  item = typeof item !== "string"
      ? JSON.stringify(item)
      : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === "object" && item !== null) {
    return true;
  }

  return false;
}


/**
   * Объект с анимациями нажатия на блок
   * @namespace ClickEffects
   */
var ClickEffects = {

  /**
   * Процедура иницализации анимации нажатия на блок
   * @param {string} style=rounded Стиль оформления анимации
   */
  init: function(style){
    if(style != undefined){
      if(style.match(/^(rounded|round)$/ui)){
        try {
          $('body').on('click', '*[ClickEffects]', function(e){
            try {
              let elem = e.originalEvent.path[0];
              if($(elem).attr('ClickEffects') != undefined){
                let id = Random.id();
                $(elem).append('<clickEffect id="' + id + '" class="button_click_effect_overflow"><div class="button_click_effect_block"></div></clickEffect>');
                let x = e.offsetX == undefined ? e.layerX : e.offsetX;
                let y = e.offsetY == undefined ? e.layerY : e.offsetY;

                $('#' + id).find('div').css({
                  'left': x + 'px',
                  'top': y + 'px'
                })
                setTimeout(function(){
                  $('#' + id).remove()
                }, 750)
                // if(!$(elem).get(0).tagName.match(/^(a)$/iu)){
                //   console.log(111)
                //   e.preventDefault();
                //   e.stopPropagation();
                // }
              }
            }catch(e){}
          });
        }catch(e){}
      }
    }
  },
}

/**
 * Объект по работе с рандомом
 * @version 1.0
 * @namespace Random
 * @author Роман Жужгов
 */
let Random = {

  /**
   * Получение случайной строки
   * @param {integer} n=15 Количество символов в случайной строке
   * @param {string} alphabet=qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0987654321 Символы из которых будет состоять случайная строка
   * @returns {string}
   * @example - Получение случайной строки
   *    Random.string(10); // return Yn3B5fJXlr
   *    Random.string(10); // return vJawf5EPT7
   *    Random.string(10); // return lRsdFrwGmY
   */
  string: (n, alphabet = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0987654321') => {
    if(n == undefined){
      n = 15;
    }
    let word = '';

    for(let i = 0; i < n; i++){
      word += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
    }
    return word;
  },

  /**
   * Получение случайного id
   * @param {integer} n=15 Количество символов в случайном ID
   * @returns {string}
   * @example - Получение случайного id
   *    Random.id(10); // return i8tpPjklIm
   *    Random.id(10); // return iZOoOpnMUL
   *    Random.id(10); // return iNzv9PQpbY
   */
  id: (n)  => {
    if(n == undefined){
      n = 15;
    }
    let alphabet = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0987654321',
    word = '';

    for(let i = 0; i < n; i++){
      if(i == 0){
        word += 'i';
      } else {
        word += alphabet[Math.round(Math.random() * (alphabet.length - 1))];

      }
    }
    return word;
  },

  /**
   * Получение случайного целого числа в заданном диапазоне
   * @param {integer} min Минимальное число для диапазона
   * @param {integer} max Максимальное число для диапазона
   * @returns {integer}
   * @example - Получение случайного целого числа в заданном диапазоне
   *    Random.integer(0, 100); // return 76
   *    Random.integer(0, 100); // return 4
   *    Random.integer(0, 100); // return 51
   */
  integer: (min, max)  => {
    let rand = min + Math.random() * (max - min);
    return Math.round(rand);
  },

  /**
   * Получение случайного дробного числа в заданном диапазоне
   * @param {float} min Минимальное число для диапазона
   * @param {float} max Максимальное число для диапазона
   * @returns {float} 
   * @example - Получение случайного дробного числа в заданном диапазоне
   *    Random.float(0, 100); // return 96.7420185839271
   *    Random.float(0, 100); // return 18.675283068792737
   *    Random.float(0, 100); // return 71.35755505756538
   */
  float: (min, max)  => {
    let rand = Math.random() * (max - min) + min;
    return rand;
  },

  /**
   * Получение случайного пароля
   * @param {integer} n=12 Количество символов в случайном пароле
   * @param {*} alphabet=qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0987654321!%_+=-@#$&. Символы из которых будет состоять случайный пароль 
   * @returns {string}
   * @example - Получение случайного пароля
   *    Random.password(10); // return P15BUzb@=W
   *    Random.password(10); // return PbFTSzQEdh
   *    Random.password(10); // return zUmFsTj4CD
   */
  password: (n, alphabet = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0987654321!%_+=-@#$&.')  => {
    if(n == undefined){
      n = 12;
    }
    let password = '';

    for(let i = 0; i < n; i++){
      password += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
    }
    return password;
  }
}

/**
 * Метод удаления элемента массива из массива по значению
 * @function unset
 * @param {*} value Значение которое надо удалить
 * @example - Удаляем элемент массива со значение "hello" из массива ["Привет", "hello", "hi"]
 *    var arr = ["Привет", "hello", "hi"];
 *    arr.unset("hello");
 *    // result ["Привет", "hi"]
 */
Array.prototype.unset = function(value) {
  if(this.indexOf(value) != -1) {
    this.splice(this.indexOf(value), 1);
  }
}

String.prototype.firstLetterCaps = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/**
 * Объект по работе с уведомлениями
 * @version 1.0
 * @namespace Noti
 * @author Роман Жужгов
 */
let Noti = {
  /**
   * Объект с настройками уведомлений
   * @namespace Noti.var
   */
  var: {
    interval_hover_btn: undefined,
    interval_hover_notification_ajax: undefined,
    interval_notification_add_db: undefined,
    interval_notification_list_db: undefined,

    noVisibleNoti: 0,
    /**
     * @description Запрос после просмотра уведомления
     */
    interval_notification_visibled: undefined,
    array_hover_notification_ajax: [],

    /**
     * @description Интервал смены времени с момента получения
     */
    interval_lasttime: undefined,

    /**
     * @description Интервал смены иконки
     */
    interval_shorticon: undefined,

    /**
     * @description Открыто ли сейчас окно с уведомлениями
     * @default false
     */
    click_hover_btn: false,

    /**
     * @description Все текущие уведомления
     */
    notification_active: [],

    /**
     * @description Уведомления ожидающие появления
     */
    notification_waiting: [],

    /**
     * @description Массив уведомлений которые будудт добавлены в базу в данный момент
     */
    notification_add_db: [],
    new_notification: 0,

    /**
     * @description Просмотренные уведомления
     */
    noti_visibled: [],

    /**
     * @description Время в секундах через которое будут добавлено в базу, что уведомление просмотрено
     * @default 1
     */
    delay_db_visible_notification: 1,

    /**
     * @description Время в секундах через которое будут добавлены в базу новые уведомления
     * @default 0.8
     */
    delay_db_add_notification: 0.8,

    /**
     * @description Экземпляр звукового файла для уведомления
     * @default undefined
     */
    audioFile: undefined,
  },

  /**
   * Инициализация уведомлений
   */
  init: function(){
    Noti.hover();
    // Noti.var.audioFile = new Audio('media/audio/Sound_584387.mp3');
  },

  /**
   * Функция добавления уведомлений в базу
   * @todo Надо сделать, пока не работает!
   * @param {Object} p 
   */
  add_noti_db: function(p){
    Noti.var.notification_add_db.push(p);

    // Создадим дубликат массива
    let notification_add_db = Object.assign([], Noti.var.notification_add_db);

    if(Noti.var.interval_notification_add_db != undefined){
      clearInterval(Noti.var.interval_notification_add_db);
    }

    Noti.var.interval_notification_add_db = setInterval(() => {
      clearInterval(Noti.var.interval_notification_add_db);
      console.log('Добавляем в базу эти уведомления: ', notification_add_db);

      // Обнуляем массив с уведомлениями для базы
      Noti.var.notification_add_db.length = 0;
    }, Noti.var.delay_db_add_notification * 1000);


  },

  /**
   * Включает или отключает иконку о непросмотренных уведомлениях
   * @param {boolean} action=true Если надо скрыть иконку то значение false, если показать, то true
   * @example - Отобразить иконку о непросмотренных уведомлениях
   *    Noti.small_noti(true)
   * @example - Скрыть иконку о непросмотренных уведомлениях
   *    Noti.small_noti(false)
   */
  small_noti: (action = true) => {
    if(action){
      $('*[noti_status]').attr('send','');
      if(Noti.var.interval_shorticon != undefined){
        clearInterval(Noti.var.interval_shorticon);
      }
      Noti.var.interval_shorticon = setInterval(() => {
        if($('link[rel="icon"]').attr('href') == 'media/logo/logo_paperWork_point.png'){
          $('link[rel="icon"]').attr('href','media/logo/logo_paperWork.png')
        } else {
          $('link[rel="icon"]').attr('href','media/logo/logo_paperWork_point.png')
        }
      }, 750);
      $('link[rel="icon"]').attr('href','media/logo/logo_paperWork_point.png');
      navigator.setAppBadge($('section[section="notifications"]').find('*[notification_history]').find('*[new]').length);
    } else {
      if(Noti.var.interval_shorticon != undefined){
        clearInterval(Noti.var.interval_shorticon);
      }
      navigator.setAppBadge(0);
      $('*[noti_status]').removeAttr('send');
      $('link[rel="icon"]').attr('href','media/logo/logo_paperWork.png')
    }
  },

  /**
   * Функция отслеживания новых уведомлений в базе
   */
  tracking: () => {
    Noti.var.longPollId = longPoll({
      url: 'php/notifications_longPoll.php',
      data: '',
      beforeSend: () => {},
      success: (res) => {
        Ajax.result(res, function (type, res) {
          if(type.match(/^(SUCCESS)$/ui)){
            res.other.forEach((elem, i) => {

              if(elem.ico.match(/(emoji_u1f6e1|emoji_u1f513)/ui)){
                Noti.small_noti(true);
                Noti.add({
                  title: elem.title,
                  text: elem.description,
                  ico: elem.ico.split('.')[0],
                  delay: 15,
                  new: true,
                  noti_add_db: elem.id,
                  date: {
                    time: {
                      timeFull: undefined,
                      dateFull: undefined,
                    },
                    hours: new Date(elem.date_time).getHours(),
                    minutes: new Date(elem.date_time).getMinutes(),
                    fullYear: new Date(elem.date_time).getFullYear(),
                    month: new Date(elem.date_time).getMonth() + 1,
                    date: (new Date(elem.date_time).getDate()),
                  }
                });
                if($('section[section="notifications"]').attr('active') != undefined){
                  Noti.search.findSQL();
                }
                if(Win.live() == '#settings'){
                  if($('section[section=session]').attr('active') != undefined){
                    Settings.section.session.load();
                  }
                  if($('section[section=session_history]').attr('active') != undefined){
                    Settings.section.session.history();
                  }
                }
              } else {
                if($('section[section="notifications"]').attr('active') == undefined){
                  Noti.small_noti(true);
                } else {
                  Noti.small_noti(true);
                  Noti.search.findSQL();
                }
                try {
                  Noti.var.audioFile.pause();
                  Noti.var.audioFile.volume = parseFloat(localStorage.getItem('notification_volumeLevel'));
                  Noti.var.audioFile.currentTime = 0;
                  Noti.var.audioFile.play();
                } catch (error) { }
              }


            })
            // console.log(res.other.visible_noti)
            navigator.setAppBadge(res.other.visible_noti);
          } else if(type.match(/^(SESSION_CLOSE)$/ui)) {
            longPollStop(Noti.var.longPollId);
          } else if(type.match(/^(EMPTY_NOTI)$/ui)) {
            if(res.other.visible_noti == '0'){
              Noti.small_noti(false);
            }
          }
        });
      },
      error: (e, f, d) => {}
    });
  },

  /**
   * Функция добавления нового уведомления
   * @param {Object} params - Объект с параметрами
   * @param {string} params.title - Заголовок уведомления
   * @param {string} params.text - Текст уведомления
   * @param {Object} [params.click]
   * @param {string} [params.click.func] - Функция при клике на уведомление
   * @param {*} [params.click.arg] - Если у функции только 1 аргумент
   * @param {*} [params.click.args] - Если у функции несколько аргументов
   * @param {Object} [params.other]
   * @param {string} [params.other.html] - Дополнительные параметры, например кнопка
   * @param {string} params.ico - Иконка уведомления
   * @param {boolean} [params.db=false] - Сохранять ли в базу данных
   * @param {integer} [params.delay=7] - Время через которое уведомление исчезнет
   * @example - Вывод простого уведомления
   *    Noti.add({
   *       title: "Заголовок",
   *       text: "Описание",
   *       ico: 'emoji_u1f3a7',
   *    });
   * @example - Вывод неисчезающего уведомления с кнопкой
   *    Noti.add({
   *      title: "Тестирование",
   *      text: 'Данный момент сервис находится в режиме отладки, некоторые функции могут не работать!',
   *      ico: 'emoji_u1f6a7',
   *      other: {
   *        html: '<div clickEffects class="notification-btn" onclick="Noti.del(this)">Понятно</div>',
   *      },
   *      delay: 0
   *    });
   * @example - Вывод исчезающего уведомления через 10 секунд с возможность нажатия на уведомление
   *    Noti.add({
   *      title: "Тестовое уведомление",
   *      text: 'Данный момент сервис находится в режиме отладки, некоторые функции могут не работать!',
   *      ico: 'emoji_u1f6a7',
   *      click: {
   *          func: 'test',
   *          arg: 'Простой аргумент'
   *      },
   *      delay: 10
   *    });
   */
  add: function(params, notification){
    
    if(!hasCss('notification.css')){
      return {
        status: 'ERROR',
        description: 'У вас не подключен файл notification.css'
      };
    }
    if(params != undefined){
      if(params.title.length == 0){
        return {
          status: 'ERROR',
          description: 'Заголовок пустой!'
        };
      }
      
      let params_original = params;
      
      params.text = params.text.length == 0 ? '' : params.text.replace(/(\r\n)/uig,"<br>");
      
      
      if(params.click != undefined){
        params.click.func = params.click.func != undefined ? params.click.func : 'test';

        if(params.click.arg === undefined){
          // Если нет 1 аргумента
          if(params.click.args != undefined){
            // Если есть аргументы выводим их список
            let output = '';
            if(typeof(params.click.args) == 'object'){
              // Если аргумент является объектом
              for(let i = 0; i < params.click.args.length; i++){
                output += JSON.stringify(params.click.args[i]);
                if((i + 1) != params.click.args.length){
                  output += ', ';
                }
              }
              params.click.func_complete = params.click.func + '(' + output + ');';
            } else {
              // Если аргумент не является объектом
              params.click.func_complete = params.click.func + '();';
            }
          } else {
            // Если нет аргументов
            params.click.func_complete = params.click.func + '();'
          }
        } else {
          if(params.click.arg !== null){
            if(typeof(params.click.arg) == 'string'){
              params.click.func_complete = params.click.func + '(&#34;' + params.click.arg + '&#34;);';
            } else {
              params.click.func_complete = params.click.func + '(' + JSON.stringify(params.click.arg) + ');';
            }
          } else {
            params.click.func_complete = params.click.func;
          }
        }
        params.click.attr = params.click.func.length > 0 ? 'click ClickEffects' : '';
      } else {
        params.click = {
          func: '',
          func_complete: '',
          arg: '',
          args: '',
          attr: '',
        };
      }
      
      if(params.id == undefined){
        params.id = Random.id(32);
      }
      
      if(params.other == undefined){
        params.other = {
          html: '',
        };
      }
      params.ico = params.ico.length == 0 ? 'emoji_u270f' : params.ico;
      params.delay = params.delay == undefined ? 7 : params.delay;
      if(params.date == undefined){
        params.date = {
          time: {
            timeFull: undefined,
            dateFull: undefined,
          },
          hours: new Date().getHours(),
          minutes: new Date().getMinutes(),
          fullYear: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          date: (new Date().getDate()),
        }
      }
      

      params.date.hours = (params.date.hours).toString().length == 1 ? ('0' + (params.date.hours).toString()) : (params.date.hours).toString();
      params.date.minutes = (params.date.minutes).toString().length == 1 ? ('0' + (params.date.minutes).toString()) : (params.date.minutes).toString();
      params.date.fullYear = (params.date.fullYear).toString().length == 1 ? ('000' + (params.date.fullYear).toString()) : (params.date.fullYear).toString();
      params.date.month = (params.date.month).toString().length == 1 ? ('0' + (params.date.month).toString()) : (params.date.month).toString();
      params.date.date = (params.date.date).toString().length == 1 ? ('0' + (params.date.date).toString()) : (params.date.date).toString();

      params.date.time.timeFull = params.date.hours + ':' + params.date.minutes;
      params.date.time.dateFull = params.date.date + '.' + params.date.month + '.' + params.date.fullYear;

      // Уведомление без сохранения в базу
      if($('notification').length == 0){
        $('body').prepend('<notification></notification>');
      }

      params.noti_add_db = params.noti_add_db == undefined ? '' : params.noti_add_db;

      if(params.new == true){
        params.noti_text = '<div class="notification" noti_id="' + params.noti_add_db + '" new swipe-aside-notification style="position: absolute; transform: translate(calc(100% + 15px), 100%);" id="' + params.id + '" onclick=\'' + params.click.func_complete + '\' ' + params.click.attr + '>';
      } else {
        params.noti_text = '<div class="notification" noti_id="' + params.noti_add_db + '" swipe-aside-notification style="position: absolute; transform: translate(calc(100% + 15px), 100%);" id="' + params.id + '" onclick=\'' + params.click.func_complete + '\' ' + params.click.attr + '>';
      }
      params.noti_text += '  <div class="notification-title" style="pointer-events: none;">';
      params.noti_text += '    <div class="notification-title-text">';
      params.noti_text += '      <div class="notification-title-text-time">';
      params.noti_text += '        <div class="notification-title-text-time-ico">';
      params.noti_text += '          <svg viewBox="0 0 48 48">';
      params.noti_text += '            <path d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 23.476562 11.978516 A 1.50015 1.50015 0 0 0 22 13.5 L 22 25.5 A 1.50015 1.50015 0 0 0 23.5 27 L 31.5 27 A 1.50015 1.50015 0 1 0 31.5 24 L 25 24 L 25 13.5 A 1.50015 1.50015 0 0 0 23.476562 11.978516 z"/>';
      params.noti_text += '          </svg>';
      params.noti_text += '        </div>';
      params.noti_text += '        <div class="notification-title-text-time-text">';
      params.noti_text += '          <span>' + params.date.time.timeFull + '</span>';
      params.noti_text += '          <span class="notification-title-text-time-text-point"></span>';
      params.noti_text += '          <span>' + params.date.time.dateFull + '</span>';
      params.noti_text += '        </div>';
      params.noti_text += '      </div>';
      params.noti_text += '      <div class="notification-title-text-title">' + params.title + '</div>';
      params.noti_text += '    </div>';
      params.noti_text += '    <div class="notification-title-ico">';
      if(notification != false){
        params.noti_text += '      <div class="notification-title-ico-close icons-close" ClickEffects style="pointer-events: auto;" title="Закрыть" onclick="Noti.del(\'#' + params.id + '\')"></div>';
      }
      params.noti_text += '      <div class="notification-title-ico-img" style="background-image: url(\'media/emoji/' + params.ico + '.png\')"></div>';
      params.noti_text += '    </div>';
      params.noti_text += '  </div>';
      params.noti_text += '  <div class="notification-main" style="pointer-events: none;">';
      params.noti_text += '    <div class="notification-main-text">' + params.text + '</div>';
      params.noti_text += '    <div class="notification-main-other" style="pointer-events: auto;">' + params.other.html + '</div>';
      params.noti_text += '  </div>';
      params.noti_text += '</div>';
      
      if(notification == false){
        $('*[notification_history]').find('.content-noti-win-content-empty').remove()
        $('*[notification_history]').prepend(params.noti_text);
        return;
      }

      $('notification').append(params.noti_text);
      params.noti_height = $('#' + params.id).outerHeight();

      let height_window = document.documentElement.clientHeight;
      let notification_window = $('notification').outerHeight();
      let count_height_notification = 0;
      for(let i = 0; i < $('notification .notification').length; i++){
        count_height_notification += $($('notification .notification')[i]).outerHeight(true);
      }

      $('#' + params.id).css({
        'height':'0px',
        'margin-top':'0px',
        'opacity': '0',
      });
      let animate = '--trans-lg';
      let animate_delay = parseFloat(getComputedStyle($('html').get(0)).getPropertyValue(animate)) != undefined ? parseFloat(getComputedStyle($('html').get(0)).getPropertyValue(animate)) : 0.3;
      setTimeout(function(){
        $('#' + params.id).css({
          'transition': 'var(' + animate + ')',
          'height': params.noti_height + 'px',
          'margin-top':'15px',
          'position':'relative',
        });
        setTimeout(function(){
          $('#' + params.id).css({
            'opacity':'1',
            'transform':'translate(0px, 0px)',
            'height': '',
          });
        }, Math.abs(animate_delay * 1000 - 150))
      }, 1);

      

      Noti.var.notification_active.push('#' + params.id);

      setTimeout(function(){
        if(height_window - count_height_notification <= params.noti_height){
          
          $('#' + params.id).remove();
          Noti.var.notification_waiting.push(params_original);
        } else {
          if(params.db == true){
            Noti.add_noti_db(params)
          }
          if(params.delay != 0){
            setTimeout(function(){
              Noti.del($('#' + params.id));
            }, Math.abs(params.delay) * 1000)
          }
          if(localStorage.getItem('notification_sound') == 'true'){
            try {
              Noti.var.audioFile.pause();
              Noti.var.audioFile.volume = (parseFloat(localStorage.getItem('notification_volumeLevel')) >= 0 && parseFloat(localStorage.getItem('notification_volumeLevel')) <= 100) ? parseFloat(localStorage.getItem('notification_volumeLevel')) : 0;
              Noti.var.audioFile.currentTime = 0;
              Noti.var.audioFile.play();
            } catch (error) {}
          }
        }
      }, 10)

    } else {
      return {
        status: 'ERROR',
        description: 'параметры отсутствуют!'
      };
    }
  },

  /**
   * Объект поиска по уведомлениям
   * @namespace Noti.search
   */
  search: {

    /**
     * Поиск уведомлений по базе
     * 
     * @param {string} type Значение бывает или all или строка поиска 
     * @example - Выполняет поиск по ключевому слову
     *    Noti.search.findSQL('ключевое слово');
     * @example - Выводит все уведомления
     *    Noti.search.findSQL('all');
     */
    findSQL: (typeG = $('#noti_search_input').val().length > 0 ? $('#noti_search_input').val() : 'all') => {
      $.ajax({
        type: "POST",
        url: 'php/notifications.php',
        data: {
          data: typeG,
          type: 'list',
        },
        cache: false,
        error: (response) => {},
        beforeSend: () => {
          $('*[notification_history]').empty();
          let out = '';
          out += "<div class='content-noti-win-content-empty'>\n";
          out += "  <div class='content-noti-win-content-empty-ico' style='height: 40px; margin-bottom: 10px; width: 40px;background-image: none;'><div class='loader'><svg class='circular' viewBox='25 25 50 50'><circle class='path' cx=\"50\" cy='50' r='20' fill='none' stroke-width='5' stroke-miterlimit='10'></circle></svg></div></div>\n";
          out += "  <div class='content-noti-win-content-empty-text'>Поиск по уведомлениям</div>\n";
          out += "</div>\n";
          $('*[notification_history]').html(out);
        },
        complete: () => {},
        success: (res, status, jqXHR) => {
          Ajax.result(res, (type, res) => {
            
            if(type.match(/^(SUCCESS)$/ui)){

              Noti.var.noVisibleNoti = 0;

              let newNoti = 0; // Количество новых уведомлений
              let NotiCount = res.other.length; // Количество всех уведомлений

              if(typeG == 'all'){
                res.other.sort((a, b) => (Date.parse(b.date_time) - Date.parse(a.date_time)) );
              }
              else {
                res.other.sort((a, b) => {
                  if(parseFloat(b.title_dis) + parseFloat(b.desc_dis) < (parseFloat(a.title_dis) + parseFloat(a.desc_dis))){
                    return -1;
                  }
                  if(parseFloat(b.title_dis) + parseFloat(b.desc_dis) > (parseFloat(a.title_dis) + parseFloat(a.desc_dis))){
                    return 1;
                  }
                  return Date.parse(b.date_time) - Date.parse(a.date_time);
                })
              }
              // if($.cookie('groupNoti') != undefined){
              //   if($.cookie('groupNoti') == 'true'){
                  
              //   }
              // }

              let arrSort = {};

              if(localStorage.getItem("notification_group") == "true"){
                res.other.forEach(element => {  
                  newNoti += element.visible == 0 ? 1 : 0;
                  if(!arrSort.hasOwnProperty(element.group)){
                    arrSort[element.group] = [];
                    arrSort[element.group].push(element);
                  } else {
                    arrSort[element.group].push(element);
                  }
                });
              } else {
                res.other.forEach((element, i) => {
                  newNoti += element.visible == 0 ? 1 : 0;
                  if(!arrSort.hasOwnProperty(i)){
                    arrSort[i] = [];
                    arrSort[i].push(element);
                  }
                });
              }
              
              res.other = arrSort;

              $('*[notification_history]').empty();
              for (let key in res.other) {

                
                // Если уведомлений много и их нужно сгруппировать
                if(res.other[key].length > 1){

                  let output = "";

                  // Определяем количество уведомлений в группе
                  let count_noti_text = res.other[key].length + " " + declOfNum(res.other[key].length, ['Уведомление','Уведомления','Уведомлений']);

                  // Определяем количество новых уведомлений в группе
                  let count_new_noti = 0;
                  res.other[key].filter(e => {
                    count_new_noti += e.visible == "0" ? 1 : 0;
                  });
                  let count_new_noti_text = count_new_noti + " " + declOfNum(count_new_noti, ['Новое','Новых','Новых']);

                  let s;

                  if(key.match(/^(login)$/ui)){
                    s = {
                      title: 'Авторизация',
                      color: '#060086',
                      ico: 'emoji_u1f513'
                    }
                  } else if(key.match(/^(security)$/ui)) {
                    s = {
                      title: 'Безопасность',
                      color: '#008686',
                      ico: 'emoji_u1f6e1'
                    } 
                  } else if(key.match(/^(access)$/ui)) {
                    s = {
                      title: 'Доступ',
                      color: '#ffc800',
                      ico: 'emoji_u1f4d2'
                    } 
                  } else {
                    s = {
                      title: 'Прочие уведомления',
                      color: '#658600',
                      ico: 'emoji_u1f4e3'
                    }
                  }

                  output += "<div class='notification_right-content-elems' close>\n";
                  output += "  <div class='notification_right-content-elems-ico' style='background-color: " + s.color + "29; background-image: url(media/emoji/" + s.ico + ".png);'></div>\n";
                  output += "  <div class='notification_right-content-elems-text'>\n";
                  output += "    <div class='notification_right-content-elems-text-title'>\n";
                  output += "      <div class='notification_right-content-elems-text-title-text'>" + s.title + "</div>\n";
                  output += "      <div class='notification_right-content-elems-text-title-more icons-bottom' titlejs='Развернуть' clickeffects></div>\n";
                  output += "    </div>\n";
                  output += "    <div class='notification_right-content-elems-text-text' style='font-size: 14px; font-family: gMedium; white-space: inherit;'>\n";
                  output += "      <span style='margin-right: 7px;'>" + count_noti_text + "</span>\n";
                  if(count_new_noti > 0){
                    output += "      <span style='color: var(--bg-main);'>" + count_new_noti_text + "</span>\n";
                  } else {
                    output += "      <span style='color: var(--bg-main); opacity: 0; pointer-events: none;'>" + count_new_noti_text + "</span>\n";
                  }
                  
                  output += "    </div>\n";
                  output += "  </div>\n";
                  output += "  <div class='notification_right-content-elems-more scrollbar-inner' swipenone>\n";

                  res.other[key].forEach(elem => {
                    
                    output += "    <div class='notification_right-content-elems-more-elem' notification_id='" + elem.id + "'>\n";
                    if(elem.visible == '0'){
                      Noti.var.noVisibleNoti++;
                      output += "      <div class='notification_right-content-elems-more-elem-new' new></div>\n";
                    } else {
                      output += "      <div class='notification_right-content-elems-more-elem-new'></div>\n";
                    }
                    output += "      <div class='notification_right-content-elems-more-elem-other'>\n";
                    output += "        <div class='notification_right-content-elems-more-elem-text'>\n";
                    output += "          <div class='notification_right-content-elems-more-elem-text-title'>" + elem.title + "</div>\n";
                    output += "          <div class='notification_right-content-elems-more-elem-text-text'>" + elem.description.replace(/\r\n/gui, '<br>') + "</div>\n";
                    if(res.other[key][0].other != null){
                      if(res.other[key][0].other != '{}'){
                        output += "          <div class='notification_right-content-elems-text-btns'>\n";
                        output += "            <div class='notification_right-content-elems-text-btns-elem' clickeffects ok>Разрешить</div>\n";
                        output += "            <div class='notification_right-content-elems-text-btns-elem' clickeffects no>Запретить</div>\n";
                        output += "            <div class='notification_right-content-elems-text-btns-elem' clickeffects>Инф</div>\n";
                        output += "          </div>\n";
                      }
                    }

                    output += "        </div>\n";
                    output += "        <div class='notification_right-content-elems-more-elem-time' notification_duration_time titlejs='" + elem.date_time.replace(/-/gui, '.') + "'>1</div>\n";
                    output += "      </div>\n";
                    output += "    </div>\n";
                  });


                  output += "  </div>\n";
                  output += "</div>\n";

                  $('*[notification_history]').append(output);
                }

                // Если уведомление одно и группировать его не надо
                else {

                  
                  let output = "";
                  output += "<div class='notification_right-content-elems' notification_id='" + res.other[key][0].id + "'>\n";
                  output += "  <div class='notification_right-content-elems-ico' style=\"background-image: url('media/emoji/" + res.other[key][0].ico + "')\"></div>\n";
                  output += "  <div class='notification_right-content-elems-text'>\n";
                  output += "    <div class='notification_right-content-elems-text-title'>\n";
                  output += "      <div class='notification_right-content-elems-text-title-text'>" + res.other[key][0].title + "</div>\n";
                  output += "      <div class='notification_right-content-elems-text-title-time'>\n";
                  output += "        <span titlejs='" + res.other[key][0].date_time.replace(/-/gui, '.') + "' notification_duration_time>1</span>\n";
                  if(res.other[key][0].visible == '0'){
                    output += "        <span new></span>\n";
                  } else {
                    output += "        <span></span>\n";
                  }
                  output += "      </div>\n";
                  output += "    </div>\n";
                  output += "    <div class='notification_right-content-elems-text-text'>" + res.other[key][0].description + "</div>\n";

                  if(res.other[key][0].other != null){
                    if(res.other[key][0].other != '{}'){
                      output += "    <div class='notification_right-content-elems-text-btns'>\n";
                      output += "      <div class='notification_right-content-elems-text-btns-elem' clickeffects ok>Разрешить</div>\n";
                      output += "      <div class='notification_right-content-elems-text-btns-elem' clickeffects no>Запретить</div>\n";
                      output += "      <div class='notification_right-content-elems-text-btns-elem' clickeffects>Инф</div>\n";
                      output += "    </div>\n";
                    }
                  }
                  output += "  </div>\n";
                  output += "</div>\n";

                  $('*[notification_history]').append(output);
                }
              }

              $('.scrollbar-inner').scrollbar();

              if(newNoti == 0){
                $('.notification_right-content-title-text-small-new').css({
                  'opacity':'0',
                  'pointer-event':'none'
                })
              } else {
                $('.notification_right-content-title-text-small-new').css({
                  'opacity':'',
                  'pointer-event':''
                })
              }
              $('.notification_right-content-title-text-small-new').text(newNoti + " " + declOfNum(newNoti, ['Новое','Новых','Новых']));
              $('.notification_right-content-title-text-small-count').text(NotiCount + " " + declOfNum(NotiCount, ['Уведомление','Уведомления','Уведомлений']));

              if(Noti.var.interval_lasttime != undefined){
                clearInterval(Noti.var.interval_lasttime);
              }

              if(NotiCount > 0){
                Noti.time();
                
                Noti.var.interval_lasttime = setInterval(() => {
                  Noti.time();
                }, 5000);
              } else {
                let output = "";
                output += '<div class="application-none" style=" background-color: #0f8d8d14; padding: 20px; border-radius: var(--radius-elg);">\n';
                output += '  <div class="application-none-ico icons-warning2_bold" style="font-size: 30px; color: var(--red);"></div>\n';
                output += '  <div class="application-none-title">Список уведомлений пуст</div>\n';
                output += '  <div class="application-none-text">Вы еще не получали не одного уведомления или по вашему запросу ничего не найдено.</div>\n';
                output += '  <div class="application-none-btns"></div>\n';
                output += '</div>\n';
                $('*[notification_history]').html(output);
              }

              if(newNoti == 0){
                Noti.small_noti(false);
              }
            }

            else {
              let output = "";
              output += '<div class="application-none" style=" background-color: #0f8d8d14; padding: 20px; border-radius: var(--radius-elg);">\n';
              output += '  <div class="application-none-ico icons-warning2_bold" style="font-size: 30px; color: var(--red);"></div>\n';
              output += '  <div class="application-none-title">Ошибка загрузки</div>\n';
              output += '  <div class="application-none-text">При загрузке уведомлений произошла ошибка, отчёт о критических ошибках был автоматически сформирован и отправлен.</div>\n';
              output += '  <div class="application-none-btns"></div>\n';
              output += '</div>\n';
              $('*[notification_history]').html(output);
            }
          });
          
        }
      });
    },

    /**
     * Процедура открытия поиска в уведомлениях
     * @param {Object} b 
     */
    open: (b) => {
      if($('.notification_right-content-title-text').attr('search') == undefined){
        $('.notification_right-content-title-text').attr('search', '');
        $(b).attr('titlejs', 'Закрыть поиск по уведомлениям');
      } else {
        $('.notification_right-content-title-text').removeAttr('search');
        $(b).attr('titlejs', 'Поиск по уведомлениям');
        if($('#noti_search_input').val().length > 0){
          $('#noti_search_input').val('');
          Noti.search.findSQL('all');
        }        
      }
    }

  },

  time: (block = $('*[notification_duration_time]')) => {
                
    for (let elem of block) {
      let time = (Date.now() - Date.parse($(elem).attr('titlejs'))) / 60000;
      if(time < 1){
        time = 'Только что';
      }
      else if(time >= 1 && time < 60){
        time = time.toFixed(0) + ' мин назад';
      }
      else if(time >= 60 && time < 60*24){
        time = (time / 60).toFixed(0) + 'ч назад';
      }
      else if(time >= 60*24 && time < 60*24*360){
        time = (time / 60 / 24).toFixed(0) + 'д назад';
      }
      else {
        if(time / 60 / 24 / 365 < 1){
          time = 'менее ' + (time / 60 / 24 / 365).toFixed(0) + 'г назад';
        } else {
          time = (time / 60 / 24 / 365).toFixed(0) + 'г назад';
        }
        
      }
      $(elem).text(time)
    }
  },

  /**
   * Процедура закрытия уведомления
   * @param {string} notification_id ID уведомления, которое будем закрывать
   * @param {*} duration Направление в которое сторону закроем
   */
  del: function(notification_id, duration = 'right'){
    if($(notification_id).length == 1){

      if(event != undefined){
        event.preventDefault();
        event.stopPropagation();
      }

      let hasClass = $(notification_id).hasClass('notification');
      if(hasClass){
        if(duration == 'right'){
          $(notification_id).css({
            'opacity':'0',
            'transform':'translate(calc(100% + 15px), 0px)'
          });
        } else {
          $(notification_id).css({
            'opacity':'0',
            'transform':'translate(calc(-100% - 15px), 0px)'
          });
        }
        let animate_delay = parseFloat($('.notification').css('transition').replace('all', '')) != undefined ? parseFloat($('.notification').css('transition').replace('all', '')) : 0.3;
        $(notification_id).css('height', $(notification_id).outerHeight() + 'px');
        setTimeout(function(){
          $(notification_id).css({
            'height': '0px',
            'margin-top':'0px',
          });
          $('notification').removeAttr('focus');
          setTimeout(function(){
            $(notification_id).remove();
            Noti.var.notification_active.unset('#' + notification_id[0].id);
            if(Noti.var.notification_waiting.length > 0){
              let last = Noti.var.notification_waiting.shift();
              Noti.add(last);
            }
          }, Math.abs(animate_delay * 1000))
        }, Math.abs(animate_delay * 1000 - 150))
      }
      else {
        let hasClass = $(notification_id).hasClass('notification-btn');
        if(hasClass){
          let id = '#' + ($(notification_id).parent().parent().parent().attr('id'));
          Noti.del(id);
        }
      }

    }
  },

  /**
   * В данном разделе собраны все события
   */
  hover: function(){
    $('body').on('mouseenter', 'notification .notification', () => {
      $('notification').attr('focus','')
    });
    $('body').on('mouseleave', 'notification .notification', () => {
      $('notification').removeAttr('focus')
    });
    $('body').on('click', '.content-noti', function(){
      Welcome.section.open('notifications');
    });
    $('body').on('click', '.notification_right-content-elems-text-title-more', function() {
      if($(this).closest('.notification_right-content-elems').attr('close') == undefined){
        $(this).closest('.notification_right-content-elems').attr('close', '');
        $(this).css({
          'transform':'rotate(0deg)'
        })
        $(this).attr('titlejs','Развернуть')
      } else {
        $(this).closest('.notification_right-content-elems').removeAttr('close');
        $(this).closest('.notification_right-content-elems').find('.notification_right-content-elems-more.scrollbar-inner.scroll-content, .scroll-wrapper.notification_right-content-elems-more.scrollbar-inner').css({
          'transition':'0s all cubic-bezier(0.7, 0, 0.3, 1)',
        });
        $(this).css({
          'transform':'rotate(180deg)'
        })
        $(this).attr('titlejs','Свернуть')
        setTimeout(() => {
          $(this).closest('.notification_right-content-elems').find('.notification_right-content-elems-more.scrollbar-inner.scroll-content, .scroll-wrapper.notification_right-content-elems-more.scrollbar-inner').css({
            'max-height':'',
          })
        }, 1);
        
        // console.log($(this).closest('.notification_right-content-elems').find('.notification_right-content-elems-more.scrollbar-inner.scroll-content'))
      }
    });
    // $('body').on('click', '.content-noti', function(e){
    //   if(e.target == this){
    //     Noti.var.click_hover_btn ? Noti.var.click_hover_btn = false : Noti.var.click_hover_btn = true;
    //   }
    // });
    // $('body').on('mouseenter', '.content-noti', function(e){
    //   if(e.target == this){
    //     if(Noti.var.interval_notification_list_db != undefined){
    //       clearInterval(Noti.var.interval_notification_list_db);
    //     }
    //     if($('.content-noti-win').attr('active') == undefined){
    //       Noti.var.interval_notification_list_db = setInterval(() => {
    //         clearInterval(Noti.var.interval_notification_list_db);
    //         Noti.search.findSQL();
    //       }, 0);
    //     }
    //   }

    // });
    // $('body').on('mouseenter', '.content-noti, .content-noti-win', () => {
    //   $('.content-noti-win').attr('active', '');
      
    //   if(Noti.var.interval_hover_btn != undefined){
    //     clearInterval(Noti.var.interval_hover_btn);
    //   }
      
    // });
    $('body').on('mouseleave', '.content-noti', (e) => {
      
      if(Noti.var.interval_hover_btn != undefined){
        clearInterval(Noti.var.interval_hover_btn);
      }
      Noti.var.interval_hover_btn = setInterval(() => {
        clearInterval(Noti.var.interval_hover_btn);
        if(!Noti.var.click_hover_btn){
          
          $('.content-noti-win').removeAttr('active');
        }
      }, 500)
    });
    $('body').on('click', (e) => {
      if($('.content-noti').find($(e.target)).length <= 0){
        if($('.content-noti-win').attr('active') != undefined){
          Noti.var.click_hover_btn = false;
          $('.content-noti-win').removeAttr('active');
          $('*[notification_history]').empty();
        }
      }
    });
    // $('body').on('focus', '.content-noti-win-title-text-search-input', () => {
    //   Noti.var.click_hover_btn = true;
    // });
    // $('body').on('blur', '.content-noti-win-title-text-search-input', () => {
    //   Noti.var.click_hover_btn = false;
    // });
    $('body').on('input', '#noti_search_input', function(){
      if(Noti.var.interval_hover_notification_ajax != undefined){
        clearInterval(Noti.var.interval_hover_notification_ajax);
      }
      Noti.var.interval_hover_notification_ajax = setInterval(() => {
        clearInterval(Noti.var.interval_hover_notification_ajax);
        $(this).val().length > 0 ? Noti.search.findSQL($(this).val()) : Noti.search.findSQL('all');
      }, 500)
    });
    $('body').on('mouseenter', '*[notification_history] *[notification_id]', function(){
      if($(this).find('*[new]').length > 0){
        $(this).find('*[new]').removeAttr('new');
        if($(this).closest('*[notification_history]').find('*[new]').length > 0){
          $('.notification_right-content-title-text-small-new').text($(this).closest('*[notification_history]').find('*[new]').length + " " + declOfNum($(this).closest('*[notification_history]').find('*[new]').length, ['Новое','Новых','Новых']));
          $('.notification_right-content-title-text-small-new').css({
            'opacity':'',
            'pointer-events':''
          })
          navigator.setAppBadge($('section[section="notifications"]').find('*[notification_history]').find('*[new]').length);
        } else {
          $('.notification_right-content-title-text-small-new').css({
            'opacity':'0',
            'pointer-events':'none'
          });
          Noti.small_noti(false);
        }

        if($(this).closest('.notification_right-content-elems').find('*[new]').length > 0){
          $(this).closest('.notification_right-content-elems').find('.notification_right-content-elems-text-text span:last-child').css({
            'opacity':'',
            'pointer-events':''
          })
          $(this).closest('.notification_right-content-elems').find('.notification_right-content-elems-text-text span:last-child').text($(this).closest('.notification_right-content-elems').find('*[new]').length + ' ' + declOfNum($(this).closest('.notification_right-content-elems').find('*[new]').length, ['Новое','Новых','Новых']))
        } else {
          $(this).closest('.notification_right-content-elems').find('.notification_right-content-elems-text-text span:last-child').css({
            'opacity':'0',
            'pointer-events':'none'
          })
        }
        
        let notiId = parseInt($(this).attr('notification_id'));
        Noti.var.noti_visibled.push(parseInt(notiId));

        if(Noti.var.interval_notification_visibled != undefined){
          clearInterval(Noti.var.interval_notification_visibled);
        }

        Noti.var.interval_notification_visibled = setInterval(() => {
          clearInterval(Noti.var.interval_notification_visibled);
          $.ajax({
            type: "POST",
            url: 'php/notifications.php',
            data: {
              data: Noti.var.noti_visibled,
              type: 'check',
            },
            cache: false,
            error: (response) => {},
            beforeSend: () => {
              Noti.var.noti_visibled.length = 0;
            },
            complete: () => {},
            success: (res, status, jqXHR) => {
              Ajax.result(res, () => {});
            }
          });
        }, 500);

      }
    });
    // $('body').on('mouseenter', '*[notification_history] .notification[new]', function(){
    //   let noti_id = $(this).attr('noti_id');
    //   $(this).removeAttr('new');
    //   Noti.var.noti_visibled.push(parseInt(noti_id));
      
    //   if(Noti.var.interval_notification_visibled != undefined){
    //     clearInterval(Noti.var.interval_notification_visibled);
    //   }
    
  },
}

/**
 * Объект по работе с окнами
 * @version 1.0
 * @namespace Win
 * @author Роман Жужгов
 */
var Win = {

  /**
   * Процедура инициализации окон. Процедура вызывается при старте DOM
   */
  init: function(){
    $('body').on('keyup', function(e){
      if(e.keyCode == 27){
        if($('.windows').is('[active]')){
          if(!document.fullscreenElement){
            Win.close();
          }
        }
      }
    })
  },

  /**
   * Процедура открытия окна
   * @param {string} id ID окна, которое будет открывать
   * @param {string} [title] Заголовок окна
   * @param {string} [text] Описание окна
   * @example - Открытие окна без заголовка и описания
   *    Win.open('#test')
   * @example - Открытие окна с заголовком и описанием
   *    Win.open('#test', 'Заголовок окна', 'Описание окна')
   */
  open: function(id, title, text){
    if($(id).length > 0){
      if(title != undefined){
        $(id).find('*[title]').html(title);
      }
      if(text != undefined){
        $(id).find('*[text]').html(text);
      }
      let isBack = false;
      if(event != null){
        if(event.target != null){
          isBack = $(event.target).closest('.windows-window').find('*[back]').attr('back') != undefined;
        }
      }
      isBack;
      
      if(Win.live() != undefined){
        if($('.windows ' + id + ' .windows-window-title[title] *[back]').length == 0){
          $('.windows ' + id + ' .windows-window-title[title]').prepend('<div back clickeffects class="windows-back icons-arrow_left" onclick=\'Win.open("' + Win.live() + '");\' titlejs="Назад"></div>')
        }
        if($('.windows ' + id + ' .input-btn[back]').length > 0){
          $('.windows ' + id + ' .input-btn[back]').attr('onclick', 'Win.open("' + Win.live() + '");');
        } else {
          if($('.windows ' + id + ' .input-btn[back]').attr('onclick') != undefined){
            $('.windows ' + id + ' .input-btn[back]').removeAttr('onclick');
          }
        }
      } else {
        if($('.windows ' + id + ' *[title] *[back]').length > 0){
          $('.windows ' + id + ' *[title] *[back]').remove();
        }
      }

      if(isBack){
        if($('.windows ' + id + ' *[title] *[back]').length > 0){
          $('.windows ' + id + ' *[title] *[back]').remove();
        }
      }

      let hex = Color.convert.RGBAtoHEX(Color.addition.sumRGB(
        Color.convert.HEXtoRGBA(Color.convert.RGBAtoHEX($(id).css('background-color'))),
        Color.convert.HEXtoRGBA(Color.convert.RGBAtoHEX($('.windows-shadow').css('background-color')))
      ));

      $('.windows').attr('active','');
      $('.windows-window').removeAttr('active');
      $('.windows-window').css({
        'transition':'',
        'transform':''
      });
      



      $('.windows input[type=password],.windows input[autocomplete=current-password],.windows input[autocomplete=new-password]').val('');
      $('.windows input[type=password],.windows input[autocomplete=current-password],.windows input[autocomplete=new-password]').attr('type','password')

      $('.windows input[type=password] ~ .input-elem-btn.icons-eye-none').removeClass('icons-eye-none').addClass('icons-eye');
      

      if($(id).find('.windows-window-title[title]').length > 0){
        let lines = Text.lines($(id).find('.windows-window-title[title]'));
        let heightOutside = $(id).find('.windows-window-title[title]').outerHeight() / lines * (lines - 1);

        if(heightOutside > 0){
          
          $(id).find('.windows-window-content-div').css({
            'max-height': `calc(85vh - 67px - ${heightOutside}px)`
          });
        } else {
          $(id).find('.windows-window-content-div').css({
            'max-height': `calc(85vh - 67px)`
          });
        }
      }

      setTimeout(() => {
        if(document.documentElement.clientWidth <= 500){
          let bl = $(id + ' *[swipenone]');
          if(bl.prop('scrollHeight') >= document.documentElement.clientHeight + 0){
            bl.attr('swipe-big-window','');
          } else {
            bl.removeAttr('swipe-big-window');
          }
        }
      }, 100);

      $(id).attr('active','');

      if($(id).attr('full') != undefined){
        $('meta[name=theme-color]').attr('content', $(id + '.windows-window').css('background-color'));
      } else {
        if(Win.live() == undefined){
          window['main_color'] = $('meta[name="theme-color"]').attr('content');
        }

        if($.cookie('theme') == 'light'){
          $('meta[name="theme-color"]').attr('content', '#595959');
        } else {
          $('meta[name="theme-color"]').attr('content', '#0e0e0e');
        }
      }

      setTimeout(() => {
        if($(id).attr('full') != undefined){
          $('meta[name=theme-color]').attr('content', $(id + '.windows-window').css('background-color'));
        } else {
          if(Win.live() == undefined){
            window['main_color'] = $('meta[name="theme-color"]').attr('content');
          }

          if($.cookie('theme') == 'light'){
            $('meta[name="theme-color"]').attr('content', '#595959');
          } else {
            $('meta[name="theme-color"]').attr('content', '#0e0e0e');
          }
        }
      }, 800)
    } else {
      console.log('Окна не существует!')
    }
  },

  /**
   * Процедура закрытия окна
   * @param {string} id ID окна, которое будет закрывать
   * @example - Закрытие окна
   *    Win.close('#test')
   */
  close: function(id){
    $('meta[name="theme-color"]').attr('content', window['main_color']);
    $('.windows').find('.windows-window-close').attr('onclick', "Win.close();");
    $('.windows').find('.windows-window-close-mobile_full').attr('onclick', "Win.close();");
    if(id == undefined){
      $('.windows').removeAttr('active');
      $('.windows-window').removeAttr('active');
      $('.windows-window').removeAttr('style');
      $('.windows-window').find('.windows-window-content').each((index, elem) => {
        $(elem).scrollTop(0);
      })
    } else {
      if($(id).length > 0){
        $('.windows').removeAttr('active');
        $(id).removeAttr('active');
        $('.windows-window').removeAttr('style');
        $(id).find('.windows-window-content').scrollTop(0)
      } else {
        console.log('Окна не существует!')
      }
    }

  },

  /**
   * Функция, которая проверяет открыто ли сейчас определенное окно
   * @param {string} type На что будем проверять. Если проверка на видимость окна, то значение "open|show", если на закрытость, то значения "close|hidden"
   * @param {string} selector ID окна, которое будем проверять
   * @returns {boolean|undefined} Если окно открыто, то вернет true, если закрыто, то false. Если параметры заданы неверно, вернет undefined
   * @example - Проверка на открытость окна
   *    Win.status('open', '#test')
   * @example - Проверка на закрытость окна
   *    Win.status('close', '#test')
   */
  status: function(type, selector){
    if(type.match(/^(open|show)$/ui)){
      if(selector != undefined){
        if($(selector).length > 0){
          if($(selector).is("[active]")){
            return true;
          } else {
            return false;
          }
        } else{
          console.log('selector не существует!')
        }
      } else {
        console.log('selector пустой!')
      }
    }
    else if(type.match(/^(close|hidden)$/ui)){
      if(selector != undefined){
        if($(selector).length > 0){
          if(!$(selector).is("[active]")){
            return true;
          } else {
            return false;
          }
        } else{
          console.log('selector не существует!')
        }
      } else {
        console.log('selector пустой!')
      }
    }
    else {
      console.error('Параметр type указан не верно!')
    }
  },

  /**
   * Определяет активное окно
   * @return {string} Вернет id активного окна
   * @example - Получение ID активного окна
   *    Win.live()
   */
  live: function(){
    if($($('.windows-window[active]').get(0)).attr('id') != undefined){
      return '#' + $($('.windows-window[active]').get(0)).attr('id');
    }
  }
}

var Ajax = {
  result: function(response, callback){
    try {
      if(response.length > 0){
        res = JSON.parse(response);
        if(res.type.match(/^(SUCCESS)$/ui)){

        }
        else if(res.type.match(/^(EMPTY_NOTI)$/ui)){
        }
        else if(res.type.match(/^(WARNING|WARN)$/ui)){
          Noti.add({
              title: res.title,
              text: res.text,
              ico: 'emoji_u26a0',
          })
        }
        else if(res.type.match(/^(SESSION_CLOSE)$/ui)){
          location.reload();
        }
        else if(res.type.match(/^(PROTECTION|PRTCT|BAN)$/ui)){
          let time = res.text.unlock_time.split(' ');
          time[0] = time[0].split(':');
          time[1] = time[1].split('.');
          let timeA = {
            s: time[0][2],
            min: time[0][1],
            h: time[0][0],
            d: time[1][0],
            m: time[1][1],
            y: time[1][2],
          }
          Noti.add({
              title: res.title,
              text: res.text.desc + "<br><br>Время разблокировки:",
              ico: 'emoji_u1f6e1',
              other: {
                html: '<div style="padding: 5px 7px; border: 1px solid var(--bg-main); display: inline-block; border-radius: var(--radius-md); background-color: var(--bg-main-hover);"><span>' + timeA.h + ':' + timeA.min + ':' + timeA.s + '</span><span class="notification-title-text-time-text-point" style="margin-left: 7px; margin-right: 7px;"></span><span>' + timeA.d + '.' + timeA.m + '.' + timeA.y + '</span></div>',
              },
          })
        }
        else if(res.type.match(/^(ERROR)$/ui)){
          Noti.add({
            title: res.title,
            text: res.text,
            ico: 'emoji_u1f6ab',
          });
        }
        else if(res.type.match(/^(EMPTY)$/ui)){
          callback('EMPTY', undefined);
        }
        else if(res.type.match(/^(USER_DELETED)$/ui)){
          Noti.add({
            title: res.title,
            text: res.text,
            ico: 'emoji_u1f4db',
          })
        }
        else if(res.type.match(/^(TSAE)$/ui)){}
        else {
          callback('ERROR', undefined);
          Noti.add({
            title: 'Фатальная ошибка!',
            text: 'При работе приложения произошла фатальная ошибка!',
            ico: 'emoji_u1f6ab',
          })
        }

        if(callback != undefined){
          callback(res.type, res);
        }
      } else {
        callback('', {});
      }
    }catch(e){
      callback('', {});
    }
  }
}

/**
 * Проверка сложности пароля
 * @param {string} value Сам пароль
 * @return {Object|undefined}
 * @version 1.0
 * @author Роман Жужгов
 */
function checkPassword(value) {
  var password = value; // Получаем пароль из формы
  var s_letters = "qwertyuiopasdfghjklzxcvbnm"; // Буквы в нижнем регистре
  var b_letters = "QWERTYUIOPLKJHGFDSAZXCVBNM"; // Буквы в верхнем регистре
  var digits = "0123456789"; // Цифры
  var pass_elements = [
    "12345",
    "123456",
    "123456789",
    "test1",
    "password",
    "12345678",
    "zinch",
    "g_czechout",
    "asdf",
    "qwerty",
    "1234567890",
    "1234567",
    "Aa123456.",
    "iloveyou",
    "1234",
    "abc123",
    "111111",
    "123123",
    "dubsmash",
    "test",
    "princess",
    "qwertyuiop",
    "sunshine",
    "BvtTest123",
    "11111",
    "ashley",
    "00000",
    "000000",
    "password1",
    "monkey",
    "livetest",
    "55555",
    "soccer",
    "charlie",
    "asdfghjkl",
    "654321",
    "family",
    "michael",
    "123321",
    "football",
    "baseball",
    "q1w2e3r4t5y6",
    "nicole",
    "jessica",
    "purple",
    "shadow",
    "hannah",
    "chocolate",
    "michelle",
    "daniel",
    "maggie",
    "qwerty123",
    "hello",
    "112233",
    "jordan",
    "tigger",
    "666666",
    "987654321",
    "superman",
    "12345678910",
    "summer",
    "1q2w3e4r5t",
    "fitness",
    "bailey",
    "zxcvbnm",
    "fuckyou",
    "121212",
    "buster",
    "butterfly",
    "dragon",
    "jennifer",
    "amanda",
    "justin",
    "cookie",
    "basketball",
    "shopping",
    "pepper",
    "joshua",
    "hunter",
    "ginger",
    "matthew",
    "abcd1234",
    "taylor",
    "samantha",
    "whatever",
    "andrew",
    "1qaz2wsx3edc",
    "thomas",
    "jasmine",
    "animoto",
    "madison",
    "0987654321",
    "54321",
    "flower",
    "Password",
    "maria",
    "babygirl",
    "lovely",
    "sophie",
    "Chegg123",
  ];
  var specials = "!@#$%^&*()_-+=|/.,:;[]{}"; // Спецсимволы
  var is_s = false; // Есть ли в пароле буквы в нижнем регистре
  var is_b = false; // Есть ли в пароле буквы в верхнем регистре
  var is_d = false; // Есть ли в пароле цифры
  var is_sp = false; // Есть ли в пароле спецсимволы
  for (var i = 0; i < password.length; i++) {
    /* Проверяем каждый символ пароля на принадлежность к тому или иному типу */
    if (!is_s && s_letters.indexOf(password[i]) != -1) is_s = true;
    else if (!is_b && b_letters.indexOf(password[i]) != -1) is_b = true;
    else if (!is_d && digits.indexOf(password[i]) != -1) is_d = true;
    else if (!is_sp && specials.indexOf(password[i]) != -1) is_sp = true;
  }
  var rating = 0;
  var difficulty;
  if (is_s) rating++; // Если в пароле есть символы в нижнем регистре, то увеличиваем рейтинг сложности
  if (is_b) rating++; // Если в пароле есть символы в верхнем регистре, то увеличиваем рейтинг сложности
  if (is_d) rating++; // Если в пароле есть цифры, то увеличиваем рейтинг сложности
  if (is_sp) rating++; // Если в пароле есть спецсимволы, то увеличиваем рейтинг сложности

  /* Далее идёт анализ длины пароля и полученного рейтинга, и на основании этого готовится текстовое описание сложности пароля */
  if (pass_elements.indexOf(password) > 0) {
    difficulty = { difficulty: "Простой", level: 1 };
  } else if (password.length < 6 && rating < 3)
    difficulty = { difficulty: "Простой", level: 1 };
  else if (password.length < 6 && rating >= 3)
    difficulty = { difficulty: "Средний", level: 2 };
  else if (password.length >= 8 && rating < 3)
    difficulty = { difficulty: "Средний", level: 2 };
  else if (password.length >= 8 && rating >= 3)
    difficulty = { difficulty: "Сложный", level: 3 };
  else if (password.length >= 6 && rating == 1)
    difficulty = { difficulty: "Простой", level: 1 };
  else if (password.length >= 6 && rating > 1 && rating < 4)
    difficulty = { difficulty: "Средний", level: 2 };
  else if (password.length >= 6 && rating == 4)
    difficulty = { difficulty: "Сложный", level: 3 };
  return difficulty; // Выводим итоговую сложность пароля
}

/**
 * Функция для тестов
 *
 * @param arguments Бесконечное количество аргументов
 * @return {undefined} Выводит в консоль список всех аргументов
 */
function test(){
  if(arguments.length == 0){
    console.log('test')
  } else {
    console.log(arguments)
  }
}
/**
 * Объект по работе с цветом
 * @version 1.0
 * @namespace Color
 */
var Color = {

  /**
   * Объект по определению чего либо
   * @namespace Color.is
   */
  is: {

    
    /**
     * Определяет темный ли цвет или нет
     * @param {Object} color Можно передать как RGB так и RGBA 
     * @param {integer} color.r Красный канал
     * @param {integer} color.g Зеленый канал
     * @param {integer} color.b Синий канал
     * @param {integer} [color.a] Альфа канал
     * @returns {boolean}
     * @example <caption>Проверим является ли цвет темным</caption>
     * Color.is.dark({
     *  r: 230,
     *  g: 100,
     *  b: 15
     * });
     * //return  false
     */
    dark: (color) => {
      if(color != undefined){
        if(1 - (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255 < 0.5){
          return false;
        } else {
          return true;
        }
      }
    },

    /**
     * Определяет светлый ли цвет или нет
     * @param {Object} color Можно передать как RGB так и RGBA 
     * @param {integer} color.r Красный канал
     * @param {integer} color.g Зеленый канал
     * @param {integer} color.b Синий канал
     * @param {integer} [color.a] Альфа канал
     * @returns {boolean}
     * @example <caption>Проверим является ли цвет темным</caption>
     * Color.is.dark({
     *  r: 230,
     *  g: 100,
     *  b: 15
     * });
     * //return  true
     */
    light: (color) => {
      if(color != undefined){
        if(1 - (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255 < 0.5){
          return true;
        } else {
          return false;
        }
      }
    }
  },

  /**
   * Объект конвертации цвета
   * @namespace Color.convert
   */
  convert: {

    /**
     * Перевод цвета из HEX в RGB
     * @param {string} hex Цвет в формате HEX
     * @returns {Object} Цвет в формате RGB
     */
    HEXtoRGB: (hex) => {
      if(hex.substring(0,1) == '#') {
        hex = hex.substring(1);
      }

      var rgbColor = {};

      if(hex.length == 3){
        rgbColor.r = hex.substring(0,1) + hex.substring(0,1);
        rgbColor.g = hex.substring(1,2) + hex.substring(1,2);
        rgbColor.b = hex.substring(2,3) + hex.substring(2,3);
        rgbColor.r = parseInt(rgbColor.r,16);
        rgbColor.g = parseInt(rgbColor.g,16);
        rgbColor.b = parseInt(rgbColor.b,16);
        rgbColor.alpha = 1;
        rgbColor.a = 1;
      }
      if(hex.length == 6){
        rgbColor.r = parseInt(hex.substring(0,2),16);
        rgbColor.g = parseInt(hex.substring(2,4),16);
        rgbColor.b = parseInt(hex.substring(4),16);
        rgbColor.alpha = 1;
        rgbColor.a = 1;
      }
      return rgbColor;
    },

    /**
     * Перевод цвета из HEX в RGBA
     * @param {string} hex Цвет в формате HEX
     * @returns {Object} Цвет в формате RGBA
     */
    HEXtoRGBA: (hex) => {
      if(hex.substring(0,1) == '#') {
        hex = hex.substring(1);
      }

      var rgbColor = {};

      if(hex.length == 4){
        rgbColor.r = hex.substring(0,1) + hex.substring(0,1);
        rgbColor.g = hex.substring(1,2) + hex.substring(1,2);
        rgbColor.b = hex.substring(2,3) + hex.substring(2,3);
        rgbColor.r = parseInt(rgbColor.r,16);
        rgbColor.g = parseInt(rgbColor.g,16);
        rgbColor.b = parseInt(rgbColor.b,16);
        rgbColor.alpha = parseFloat((parseInt(hex.substring(3,4),16) / 15).toFixed(2));
        rgbColor.a = parseFloat((parseInt(hex.substring(3,4),16) / 15).toFixed(2));
      }
      if(hex.length == 8){
        rgbColor.r = parseInt(hex.substring(0,2),16);
        rgbColor.g = parseInt(hex.substring(2,4),16);
        rgbColor.b = parseInt(hex.substring(4,6),16);
        rgbColor.alpha = parseFloat((parseInt(hex.substring(6,8),16) / 255).toFixed(2));
        rgbColor.a = parseFloat((parseInt(hex.substring(6,8),16) / 255).toFixed(2));
      }
      if(hex.length == 3){
        rgbColor.r = hex.substring(0,1) + hex.substring(0,1);
        rgbColor.g = hex.substring(1,2) + hex.substring(1,2);
        rgbColor.b = hex.substring(2,3) + hex.substring(2,3);
        rgbColor.r = parseInt(rgbColor.r,16);
        rgbColor.g = parseInt(rgbColor.g,16);
        rgbColor.b = parseInt(rgbColor.b,16);
        rgbColor.alpha = 1;
        rgbColor.a = 1;
      }
      if(hex.length == 6){
        rgbColor.r = parseInt(hex.substring(0,2),16);
        rgbColor.g = parseInt(hex.substring(2,4),16);
        rgbColor.b = parseInt(hex.substring(4),16);
        rgbColor.alpha = 1;
        rgbColor.a = 1;
      }
      return rgbColor;
    },

    /**
     * Перевод цвета из RGB в HEX
     * @param {Object} rgb Цвет в формате RGB
     * @param {integer} rgb.r Красный канал
     * @param {integer} rgb.g Зеленый канал
     * @param {integer} rgb.b Синий канал
     */
    RGBtoHEX: (rgb) => {

    },

    /**
     * Перевод цвета из RGB в HSL
     * @param {Object} rgb Цвет в формате RGB
     * @param {integer} rgb.r Красный канал
     * @param {integer} rgb.g Зеленый канал
     * @param {integer} rgb.b Синий канал
     */
    RGBtoHSL: (rgb) => {
      rgb.r /= 255, rgb.g /= 255, rgb.b /= 255;

      let max = Math.max(rgb.r, rgb.g, rgb.b), min = Math.min(rgb.r, rgb.g, rgb.b);
      let h, s, l = (max + min) / 2;

      if(max == min){
        h = s = 0;
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
          case rgb.r: h = (rgb.g - rgb.b) / d + (rgb.g < rgb.b ? 6 : 0); break;
          case rgb.g: h = (rgb.b - rgb.r) / d + 2; break;
          case rgb.b: h = (rgb.r - rgb.g) / d + 4; break;
        }
        h /= 6;
      }

      return {
        h: h,
        s: s,
        l: l
      };
    },

    /**
     * Перевод цвета из HEX в HSL
     * @param {string} hex Цвет в формате HEX
     * @returns {Object} Цвет в формате HSL
     */
    HEXtoHSL: (hex) => {
      let rgb = Color.convert.HEXtoRGB(hex);
      rgb.r /= 255, rgb.g /= 255, rgb.b /= 255;

      let max = Math.max(rgb.r, rgb.g, rgb.b), min = Math.min(rgb.r, rgb.g, rgb.b);
      let h, s, l = (max + min) / 2;

      if(max == min){
        h = s = 0;
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
          case rgb.r: h = (rgb.g - rgb.b) / d + (rgb.g < rgb.b ? 6 : 0); break;
          case rgb.g: h = (rgb.b - rgb.r) / d + 2; break;
          case rgb.b: h = (rgb.r - rgb.g) / d + 4; break;
        }
        h /= 6;
      }

      return {
        h: h,
        s: s,
        l: l
      };
    },
    /**
     * Перевод цвета из RGBA в HEX
     * @param {Object} rgba Цвет в формате RGBA
     * @param {integer} rgba.r Красный канал
     * @param {integer} rgba.g Зеленый канал
     * @param {integer} rgba.b Синий канал
     * @param {integer} rgba.a Альфа канал
     */
    RGBAtoHEX: (rgba) => {

      if(typeof rgba == 'string'){

        if(rgba.match(/^rgba/ui)){
          rgba = rgba.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d\.\d\d|\d\.\d|\d)[\s+]?/i);

          return (rgba && rgba.length === 5) ? "#" +
            ("0" + parseInt(rgba[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgba[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgba[3], 10).toString(16)).slice(-2) +
            parseInt((parseFloat(rgba[4]) * 100 * 2.55).toFixed(0), 10).toString(16) : '';
        } else {
          let rgb = rgba.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

          return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
        }

      }   

      if(typeof rgba == 'object'){
        if(rgba.a == undefined && rgba.alpha == undefined){
          rgba.r = parseInt(rgba.r);
          rgba.g = parseInt(rgba.g);
          rgba.b = parseInt(rgba.b);
          rgba.r = (rgba.r).toString(16).length == 1 ? '0' + (rgba.r).toString(16) : (rgba.r).toString(16);
          rgba.g = (rgba.g).toString(16).length == 1 ? '0' + (rgba.g).toString(16) : (rgba.g).toString(16);
          rgba.b = (rgba.b).toString(16).length == 1 ? '0' + (rgba.b).toString(16) : (rgba.b).toString(16);
          return '#' + rgba.r + rgba.g + rgba.b;
        } else {
          rgba.a = rgba.a == undefined ? parseInt(rgba.alpha * 100) : parseInt(rgba.a * 100);
          rgba.r = parseInt(rgba.r);
          rgba.g = parseInt(rgba.g);
          rgba.b = parseInt(rgba.b);
          rgba.r = (rgba.r).toString(16).length == 1 ? '0' + (rgba.r).toString(16) : (rgba.r).toString(16);
          rgba.g = (rgba.g).toString(16).length == 1 ? '0' + (rgba.g).toString(16) : (rgba.g).toString(16);
          rgba.b = (rgba.b).toString(16).length == 1 ? '0' + (rgba.b).toString(16) : (rgba.b).toString(16);
          rgba.a = (rgba.a).toString(16).length == 1 ? '0' + (rgba.a).toString(16) : (rgba.a).toString(16);
          return '#' + rgba.r + rgba.g + rgba.b + rgba.a;
        }
      }

    },


  },

  /**
   * Объект сложения цветов
   * @namespace Color.addition
   */
  addition: {

    /**
     * Выполняет сложение двух цветов формата RGB и RGBA
     * @param {Object} rgba 
     * @param {integer} rgba.r Красный канал
     * @param {integer} rgba.g Зеленый канал
     * @param {integer} rgba.b Синий канал
     * @param {integer} [rgba.a] Альфа канал
     * @param {Object} rgba2 
     * @param {integer} rgba2.r Красный канал
     * @param {integer} rgba2.g Зеленый канал
     * @param {integer} rgba2.b Синий канал
     * @param {integer} [rgba2.a] Альфа канал
     * @returns {Object}
     */
    sumRGB: (rgba, rgba2) => {
      rgba.a = rgba.a == undefined ? 1 : rgba.a;
      rgba2.a = rgba2.a == undefined ? 1 : rgba2.a;

      return {
        r: rgba2.a * rgba.r + (1 - rgba2.a) * rgba2.r,
        g: rgba2.a * rgba.g + (1 - rgba2.a) * rgba2.g,
        b: rgba2.a * rgba.b + (1 - rgba2.a) * rgba2.b,
        a: rgba2.a * rgba.a + (1 - rgba2.a) * rgba2.a
      }
    },

    sumHEX: (hex, hex2) => {

      rgba = Color.convert.HEXtoRGBA(hex);
      rgba2 = Color.convert.HEXtoRGBA(hex2);

      rgba.a = rgba.a == undefined ? 1 : rgba.a;
      rgba2.a = rgba2.a == undefined ? 1 : rgba2.a;

      return {
        r: rgba2.a * rgba.r + (1 - rgba2.a) * rgba2.r,
        g: rgba2.a * rgba.g + (1 - rgba2.a) * rgba2.g,
        b: rgba2.a * rgba.b + (1 - rgba2.a) * rgba2.b,
        a: rgba2.a * rgba.a + (1 - rgba2.a) * rgba2.a
      }

    }

  }
}


/**
 * Функция определения темного оттенка
 * @param  {Object}  rgba Цвет в формате rgba или rgb
 * @return {Boolean}      Если оттенок темный вернет true, если нет то false
 */
function isDark(rgba){
  return Color.is.dark(rgba);
}

function convertColoraToRGB(color) {

  if(color.substring(0,1) == '#') {
     color = color.substring(1);
   }

  var rgbColor = {};

  if(color.length == 3){
    rgbColor.r = color.substring(0,1) + color.substring(0,1);
    rgbColor.g = color.substring(1,2) + color.substring(1,2);
    rgbColor.b = color.substring(2,3) + color.substring(2,3);
    rgbColor.r = parseInt(rgbColor.r,16);
    rgbColor.g = parseInt(rgbColor.g,16);
    rgbColor.b = parseInt(rgbColor.b,16);
    rgbColor.alpha = 1;
  }
  if(color.length == 4){
    rgbColor.r = color.substring(0,1) + color.substring(0,1);
    rgbColor.g = color.substring(1,2) + color.substring(1,2);
    rgbColor.b = color.substring(2,3) + color.substring(2,3);
    rgbColor.r = parseInt(rgbColor.r,16);
    rgbColor.g = parseInt(rgbColor.g,16);
    rgbColor.b = parseInt(rgbColor.b,16);
    rgbColor.alpha = parseFloat((parseInt(color.substring(3,4),16) / 15).toFixed(2));
  }
  if(color.length == 6){
    rgbColor.r = parseInt(color.substring(0,2),16);
    rgbColor.g = parseInt(color.substring(2,4),16);
    rgbColor.b = parseInt(color.substring(4),16);
    rgbColor.alpha = 1;
  }
  if(color.length == 8){
    rgbColor.r = parseInt(color.substring(0,2),16);
    rgbColor.g = parseInt(color.substring(2,4),16);
    rgbColor.b = parseInt(color.substring(4,6),16);
    rgbColor.alpha = parseFloat((parseInt(color.substring(6,8),16) / 255).toFixed(2));
  }

  return rgbColor;
 }

/**
 * Проверка на наличие css файла
 * @param {string} href Путь к файлу
 * @returns {boolean}
 */
function hasCss(href){
  let styles = document.styleSheets;
  let regExp = new RegExp(href, 'i');
  let status = false;
  let status_disabled = false;
  for(let i = 0; i < styles.length; i++) {
    let file = styles[i].href;
    let file_1 = styles[i].disabled;
    if(file != null || file != undefined){
      file = file.replace(/^.+\//ui, '');
      if(file.match(regExp)){
        status = true;
        status_disabled = file_1;
      }
    }
  }
  if(status){
    if(!status_disabled){
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function typeWriter(id, text = 'Lorem ipsum typing effect!', speed = 50, i = 'b1') {
  if (window[i] == undefined) {
    window[i] = 0;
  }
  if(window[i] == 0){
    document.getElementById(id).innerHTML = "";
  }
  if (window[i] < text.length) {
    document.getElementById(id).innerHTML += text.charAt(window[i]);
    window[i]++;
    setTimeout(() => {
      typeWriter(id, text, speed, i);
    }, speed);
  }

  if(window[i + 1] != undefined){
    clearTimeout(window[i + 1]);
  }

  window[i + 1] = setTimeout(() => {
    clearTimeout(window[i + 1]);
    delete window[i];
    delete window[i + 1];
  }, speed + 50);
}

/**
 * Загрузка CSS файла
 * @param {string} href Путь к файлу
 * @returns {boolean}
 */
function loadCss(href) {
  if(urlExists(href)){
    var css = document.createElement('link');
    css.rel = "stylesheet";
    css.href = href;
    document.head.appendChild(css);
    return true;
  } else {
    return false;
  }
}

/**
 * Функция для проверки статуса 404
 * @param {string} url Путь к файлу
 * @returns {boolean}
 */
function urlExists(url){
  try {
    let http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
  }catch(e){}
}

/**
 * Функция склонения слов по числу
 * @param {integer} n Число по которому будем клонять
 * @param {array} text_forms Массив из слов
 * @returns {string}
 * @example - Склонение слово "Яблоко"
 *    declOfNum(1, ['Яблоко','Яблока','Яблок']) // return "Яблоко"
 * @example - Склонение слово "Человек"
 *    declOfNum(3, ['Человек','Человека','Человек']) // return "Человека"
 */
function declOfNum(n, text_forms) {
   n = Math.abs(n) % 100; var n1 = n % 10;
   if (n > 10 && n < 20) { return text_forms[2]; }
   if (n1 > 1 && n1 < 5) { return text_forms[1]; }
   if (n1 == 1) { return text_forms[0]; }
   return text_forms[2];
}

/**
 * функция определения онлайна
 * @returns {boolean}
 */
function isOnline(){
 if(!window.navigator.onLine){
   return false;
 } else {
   return true;
 }
}

function conv_size(b, fixed = 2){

	fsizekb = b / 1024;
  fsizemb = fsizekb / 1024;
	fsizegb = fsizemb / 1024;
	fsizetb = fsizegb / 1024;

	if (fsizekb <= 1024) {
        fsize = fsizekb.toFixed(fixed) + ' кб';
	} else if (fsizekb >= 1024 && fsizemb <= 1024) {
		fsize = fsizemb.toFixed(fixed) + ' мб';
	} else if (fsizemb >= 1024 && fsizegb <= 1024) {
		fsize = fsizegb.toFixed(fixed) + ' гб';
	} else {
		fsize = fsizetb.toFixed(fixed) + ' тб';
	}

  return fsize;

}
/**
 * @description Храним все GET значения из ссылки
 */
var GET = window.location.search.replace('?','').split('&').reduce(
 function(p,e){
   if(e.length == 0) return false;
   let a = e.split('=');
   p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
   return p;
 },{}
);
/**
 * Обект по работе с текстом
 * @namespace Text
 */
var Text = {
  
  /**
   * Функция определения длины текста в px или других единицах
   * @param {Object|string} block Jquery объект или селектор объекта
   * @param {*} [unit=all] Возвращаемые единицы, можно указать другое значение, например "px", "cm", "mm", "pt", "pc"
   * @returns {Object}
   */
  pixel: function(block, unit = 'all'){
    let text = $(block).text();
    if($('test').length == 0){
      $('body').prepend('<test style="display: inline-block;position: absolute;opacity: 0; pointer-events: none;"></test>')
    }
    $('test').css({
        'font-size': $(block).css('font-size') || '16px',
        'font-family': $(block).css('font-family') || 'gMedium',
        'font-weight': $(block).css('font-weight') || 'normal',
        'font-style': $(block).css('font-style') || 'normal',
        'font-kerning': $(block).css('font-kerning') || 'auto',
        'letter-spacing': $(block).css('letter-spacing') || 'normal',
    })
    $('test').html(text);
    let px = $('test').prop('offsetWidth');
    $('test').text('');
    if(unit.match(/^(px)$/ui)){
      return px;
    } else if(unit.match(/^(cm)$/ui)){
      return px * 38;
    } else if(unit.match(/^(mm)$/ui)){
      return px * 3.8;
    } else if(unit.match(/^(pt)$/ui)){
      return px * (4/3);
    } else if(unit.match(/^(pc)$/ui)){
      return px * 16;
    } else if(unit.match(/^(all)$/ui)) {
      return {
        px: px,
        cm: px / 38,
        mm: px / 3.8,
        pt: px * (4/3),
        pc: px / 16,
      }
    }
  },

  /**
   * Функция определения количества линий текста в блоке
   * @param {Object|string} block Jquery объект или селектор объекта
   * @returns {integer} Количество строк текста в блоке
   */
  lines: function(block){
    let lineHeight = ($(block).css('line-height').match(/normal/ui)) ? Math.round(parseFloat($(block).css('font-size')) * 1.227273) : ($(block).css('line-height').match(/em/ui)) ? parseFloat($(block).css('line-height')) * parseFloat($(block).css('font-size')) : ($(block).css('line-height').match(/%/ui)) ? parseFloat($(block).css('font-size')) * (parseFloat($(block).css('line-height')) / 100) : ($(block).css('line-height').match(/px/ui)) ? parseFloat($(block).css('line-height')) : parseFloat($(block).css('line-height')) * parseFloat($(block).css('font-size'));
    return parseInt($(block).height() / lineHeight);
  },
}

// На всякий случай, мало ли где-то встречалось ранее, теперь все в одном месте
function pixel_text(block, unit = 'all'){
  return Text.pixel(block, unit);
}

function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
}

/**
 * Функция определения системной темы
 * @returns {string|undefined} Если системная тема темная вернет "dark", иначе "light"
 * @example - Определение системной темы
 *    checkSystemTheme(); // return "light"
 */
function checkSystemTheme(){
  let res = undefined;
  if($('theme').length == 0){

    $('body').prepend('<theme></theme>');
    let style = '<style>\n';
    style += 'theme{\n';
    style += '  position: absolute;\n';
    style += '  pointer-events: none;\n';
    style += '  opacity: 0;\n';
    style += '  background-color: transparent;\n';
    style += '}\n';
    style += '@media (prefers-color-scheme: light) {\n';
    style += '  theme{\n';
    style += '    background-color: white;\n';
    style += '  }\n';
    style += '}\n';
    style += '@media (prefers-color-scheme: dark) {\n';
    style += '  theme{\n';
    style += '    background-color: black;\n';
    style += '  }\n';
    style += '}\n';
    style += '</style>';
    $('head').append(style);

    if($('theme').css('background-color') == 'rgb(0, 0, 0)'){
      res = 'dark';
    } else if($('theme').css('background-color') == 'rgb(255, 255, 255)'){
      res = 'light';
    } else {
      res = undefined
    }

    $('theme').remove();

    return res;
  } else {
    if($('theme').css('background-color') == 'rgb(0, 0, 0)'){
      res = 'dark';
    } else if($('theme').css('background-color') == 'rgb(255, 255, 255)'){
      res = 'light';
    } else {
      res = undefined
    }
    return res;
  }
}

/**
 * Функция для копирование текста в буфер обмена
 * @param {string} text текст который будем копировать в буфер обмена
 * @returns {boolean}
 * @example copy("Hello world") // Фраза "Hello world" будет скопирована в буфер обмена
 */
function copy(text) {
  var input = document.createElement('textarea');
  input.value = text;
  document.body.appendChild(input);
  input.select();
  var result = document.execCommand('copy');
  document.body.removeChild(input);
  return result;
}


function getPWADisplayMode() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  if (document.referrer.startsWith('android-app://')) {
    return 'twa';
  } else if (navigator.standalone || isStandalone) {
    return 'standalone';
  }
  return 'browser';
}

/**
 * Расчёт факториала
 */
function factor(depth) { 
  var f=1; 
  for(var i=1; i<depth; i++) { 
    f=f*i; 
  }
  return f; 
} 

// Определение скорости расчёта факториала
function load(amount,depth) {
    var t0 = performance.now();
  for(var n=1; n<amount; n++) { 
        var result = factor(depth);
  }
    var t1 = performance.now();
    var duration = (t1 - t0).toFixed(0);
  return duration;
}



function handleInputChange(e) {

  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  } 
  const min = target.min
  const max = target.max
  const val = target.value
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}


function isElementVisible(el) {
  var rect     = el.getBoundingClientRect(),
      vWidth   = window.innerWidth || doc.documentElement.clientWidth,
      vHeight  = window.innerHeight || doc.documentElement.clientHeight,
      efp      = function (x, y) { return document.elementFromPoint(x, y) };     

  // Return false if it not in the viewport
  if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight){
    return false;
  }
      

  // Return true if any of its four corners are visible
  return (
        el.contains(efp(rect.left,  rect.top))
    ||  el.contains(efp(rect.right, rect.top))
    ||  el.contains(efp(rect.right, rect.bottom))
    ||  el.contains(efp(rect.left,  rect.bottom))
  );
}

async function cachesKeys() {
  return await caches.keys();
}

/**
 * возвращает приблизительный размер одного кэша (в байтах)
 * @param {Promise} c Cache
 * @example cacheSize(await caches.open('CacheName'))
 * @returns {Promise}
 */
function cacheSize(c) {
  return c.keys().then(a => {
    return Promise.all(
      a.map(req => c.match(req).then(res => res.clone().blob().then(b => b.size)))
    ).then(a => a.reduce((acc, n) => acc + n, 0));
  });
}

/**
 * возвращает приблизительный размер всех кэшей (в байтах)
 * @returns {Promise}
 */
function cachesSize() {
  return caches.keys().then(a => {
    return Promise.all(
      a.map(n => caches.open(n).then(c => cacheSize(c)))
    ).then(a => a.reduce((acc, n) => acc + n, 0));
  });
}


function getCoords(elem) {
  // (1)
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  // (2)
  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  // (3)
  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  // (4)
  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return {
    top: top,
    left: left
  };
}
// Защита пользователя
var Protection = {
  console: function(){
    console.log(
      '%c%s',
      [
        'font-family: monospace;',
        'font-weight: 700;',
        'font-size: 45px;',
        'margin-top: 15px;',
        'margin-bottom: 15px;',
        'border-radius: 20px;'
      ].join(''),
      '☠ ☠ ☠');
    console.log(
      '%c%s',
      [
        'font-family: monospace;',
        'font-weight: 700;',
        'font-size: 45px;',
        'margin-top: 15px;',
        'margin-bottom: 15px;',
        'background-color: #fbc02d;',
        'color: #303036;',
        'padding: 0px 10px;',
        'border-radius: 20px;'
      ].join(''),
      'СТОП! СТОП! СТОП!');
    console.log(
      '%c%s',
      [
        'font-family: monospace;',
        'font-weight: 500;',
        'font-size: 20px;',
        'padding: 0px 10px;',
        'border-radius: 20px;'
      ].join(''),
      'Используя эту консоль, вы можете подвергнуться атаке Self-XSS, что позволит злоумышленникам совершать действия от вашего имени и получать доступ к вашим данным.');
    console.log(
      '%c%s',
      [
        'font-family: monospace;',
        'font-weight: 500;',
        'font-size: 20px;',
        'padding: 0px 10px;',
        'border-radius: 20px;'
      ].join(''),
      'Не вводите и не вставляйте программный код, который не понимаете.');
    console.log(
        '%c%s',
        [
          'font-family: monospace;',
          'font-weight: 500;',
          'font-size: 20px;',
          'padding: 0px 10px;',
          'border-radius: 20px;'
        ].join(''),
        'Если вы действительно понимаете, что делаете, то приходите к нам работать https://insoweb.ru/jobs');
  },
  debug: function(){
    console.log(
      '%c%s',
      [
        'font-family: monospace;',
        'font-weight: 700;',
        'font-size: 20px;',
        'padding: 12px 17px 10px 17px;',
        'background-color: #7e7e7e30;',
        'color: #e53935;',
        'border-radius: 5px;',
        'margin-top: 15px;',
        'margin-bottom: 15px;',
        'border: 3px dashed #e53935;',
        'user-select: none;'
      ].join(''),
      '🔥 Включен режим отладки! 🔥');
  },
}