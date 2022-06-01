let position; // Тут храним координаты поситителя
let openRequest;
let db; // Тут будет локальная базаданных истории
let maxHistory = 1;
let CountHistory;

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

// Тут вешаем обработчик на сролл, чтоб грузить данные по мере прокрутки
$(document).ready(function(){
  $('.content.scrollbar-inner.scroll-content').scroll(function(e){
    scroll.page(e)
  })
});

// Если у нас есть GET параметр на постоянную загрузку файла
if(GET){
  if(GET['interval']){
    if(GET['interval'].match(/^\d{1,20}$/)){
      setInterval(() => {
        download();
      }, parseInt(GET['interval']))
    }
  }
}

// Получение геопозиции прошло успешно
const geo_success = pos => {
  position = pos;
  $('#location_l').text(position.coords.longitude);
  $('#location_c').text(position.coords.latitude);
  dataWeatherInterval();
};

// Получение геопозиции прошло с ошибкой
const geo_error = () => {
  position = {
    coords: {
      longitude: 56.227740,
      latitude: 58.010325
    }
  };
  $('#location_l').text(position.coords.longitude);
  $('#location_c').text(position.coords.latitude);
  dataWeatherInterval();
  Noti.add({
    title: "Ошибка",
    text: "На вашем устройстве нет возможности определить геопозицию.<br><br>Значение будет использовано по умолчанию!",
    ico: 'emoji_u1f3d5',
    delay: 0
  });
  $('section[main]').attr('load', '');
};


// Тут проверяем наличие geolocation
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(geo_success, geo_error);
}

// Если нет geolocation то выведем пользователю уведомление об ошибке
else {
  Noti.add({
    title: "Ошибка",
    text: "На вашем устройстве нет возможности определить геопозицию.<br><br>Значение будет использовано по умолчанию!",
    ico: 'emoji_u1f3d5',
    delay: 0
  });
  $('section[main]').attr('load', '');
}

// Тут проверяем наличие indexedDB
if (window.indexedDB) {
  openRequest = window.indexedDB.open("history", 1);

  openRequest.onerror = function (e) {
    console.log('open db request --- onerror');
    console.log('Ошибка при открытии БД. Код ошибки: ', e.target.errorCode);
    db = e.target.result;
    Noti.add({
      title: "Ошибка",
      text: "При работе IndexedDB произошла ошибка, следовательно история будет не доступна! Статус: " + e.target.errorCode,
      ico: 'emoji_u1f4dc',
      delay: 0
    });
  };

  openRequest.onsuccess = (e) => {
    console.log('open db request --- onsuccess');
    db = e.target.result;
  }

  openRequest.onupgradeneeded = (e) => {
    console.log('open db request --- onupgradeneeded');
    db = openRequest.result;
    
    if (!db.objectStoreNames.contains('weather')) {
      db.createObjectStore('weather', {keyPath: 'id', autoIncrement: true});
    }
  }


} else {
  Noti.add({
    title: "Ошибка",
    text: "На вашем устройстве не поддерживается технология IndexedDB, следовательно история будет не доступна!",
    ico: 'emoji_u1f4dc',
    delay: 0
  });
}

// Тут описан метод, который будет отвечать за прокрутку страницы
// Метод является рекурсивным
let scroll = {
  page: (e, a = false) => {

    let WinHeight = document.documentElement.clientHeight;
    let WinScroll = $('.content.scrollbar-inner.scroll-content').scrollTop();
    let PageHeight = $('.content.scrollbar-inner.scroll-content').prop('scrollHeight');
    let WinSH = WinHeight + WinScroll;
    let ScrollRemained = PageHeight - WinSH;

    
    if(ScrollRemained < 150 || a){

      let tx = db.transaction(['weather'], 'readonly');
      let store = tx.objectStore('weather');

      let req = store.get(maxHistory);
      
      req.onsuccess = (event) => {
        let note = event.target.result;

        if (note) {
          
          maxHistory++;
          let output = '';

          output += `<div class='history-line'>\n`;
          output += `  <div class='history-line-ico' style='background-image: url("https://yastatic.net/weather/i/icons/funky/light/${note.fact.icon}.svg")'></div>\n`;
          output += `  <div class='history-line-text'>${note.fact.temp}°C</div>\n`;
          output += `  <div class='history-line-date'>${note.now_dt}</div>\n`;
          output += `</div>\n`;
          
          $('#history_lines').append(output);
          
          scroll.page(undefined);

        } else {
          console.log("note "+maxHistory+" not found")
        }
      }
    }

  
  }
}

// Метод который запрашивает каждый раз новые данные с сервера
let dataWeatherInterval = (interval = 1000 * 60 * 60) => {
  dataWeather();
  setTimeout(() => {
    dataWeatherInterval()
  }, interval);
}

// Сама функция запроса данных с сервера
let dataWeather = () => {
  if (isOnline()) {
    $.ajax({
      url: "php/weather.php",
      type: "POST",
      data: {
        type: "weather",
        coords: {
          l: position.coords.longitude,
          c: position.coords.latitude,
        }
      },
      cache: false,
      beforeSend: function () {
        $('section[main]').attr('load', '');
      },
      complete: function () {
        $('section[main]').removeAttr('load');
      },
      success: function (res, status, jqXHR) {
        Ajax.result(res, function (type, res) {
          if (type.match(/^(SUCCESS)$/iu)) {
            addWeatherData(res.other);
          
            scroll.page(undefined);
            if(res.other.geo_object){
              $('.main-content-lacation').text(`Ваше местоположение: ${res.other.geo_object.country.name}, ${res.other.geo_object.locality.name}, ${res.other.geo_object.district.name}`)
            }
            let output = "";
            if(res.other.forecasts){

              res.other.forecasts.forEach(elem => {
                const temp = elem.parts.day_short.temp;
                const ico = elem.parts.day_short.icon;
                const [year, mouth, day] = elem.date.split('-');

                output += `<div class='main-content-more_weather-grid-elem'>\n`;
                output += `  <div class='main-content-more_weather-grid-elem-ico' style='background-image: url("https://yastatic.net/weather/i/icons/funky/light/${ico}.svg")'></div>\n`
                output += `  <div class='main-content-more_weather-grid-elem-degrees'>\n`;
                output += `    <span>${temp}</span>\n`;
                output += `    <span>°C</span>\n`;
                output += `  </div>\n`;
                output += `  <div class='main-content-more_weather-grid-elem-text'>\n`;
                output += `    ${day}.${mouth}.${year}\n`;
                output += `  </div>\n`;
                output += `</div>\n`;

              });
            }
            $('.main-content-more_weather-grid').html(output);

            if(res.other.fact){
              $('#fact_temp').text(res.other.fact.temp);
              $('#fact_ico').css({
                'background-image':'url("https://yastatic.net/weather/i/icons/funky/light/' + res.other.fact.icon + '.svg")'
              }).attr('titlejs', res.other.fact.condition)
              if(res.other.fact.daytime == 'n'){
                $('section[main]').css({
                  'background-color':'#001b3a'
                })
                $('html').get(0).style.setProperty('--bg1','#441c00');
                $('html').get(0).style.setProperty('--color','#fff');
                $('html').get(0).style.setProperty('--bg-notification','#36363c');
                $('html').get(0).style.setProperty('--shadowColor','rgb(29 29 29 / 10%)');
                $('meta[name=theme-color]').attr('content', '#001b3a');
              } else {
                $('section[main]').css({
                  'background-color':''
                })
                $('html').get(0).style.setProperty('--bg1','');
                $('html').get(0).style.setProperty('--color','');
                $('html').get(0).style.setProperty('--bg-notification','');
                $('html').get(0).style.setProperty('--shadowColor','');
                $('meta[name=theme-color]').attr('content', '#d0e6ff');
              }

            }
            
          } else {
            Noti.add({
              title: res.title,
              text: res.text,
              ico: "emoji_u23f3",
              delay: 15,
            });
          }
        });
      },
      error: function (jqXHR, status, errorThrown) {},
      timeout: 15000,
    });
  } else {
    Noti.add({
      title: "Ошибка",
      text: "Отсутствует интернет-подключение. Проверьте подключение к сети и повторите попытку.<br><br>",
      ico: "emoji_u23f3",
      delay: 15,
    });
  }
}

// Добавление данных в локальную базу
const addWeatherData = (data) => {
  let transaction = db.transaction('weather', 'readwrite');
  let weather = transaction.objectStore('weather');

  let request = weather.add(data);
  console.dir(request);

  request.onsuccess = function () {
    console.log('Партия записана в БД');
  };

  request.onerror = function (event) {
    console.log('Ошибка при записи в БД', event.target.error);
  };
};

// Функция для скачивания файла на устройство
const download = () => {
  let tx = db.transaction(['weather'], 'readonly');
  let store = tx.objectStore('weather');

  let req = store.getAll();
  req.onsuccess = (event) => {
    let note = event.target.result;
    if (note) {
      writeFile("weather.json", JSON.stringify(note));
    } else {
      console.log("note not found")
    }
  }
}

// Функция создания файла
function writeFile(name, value) {
  var val = value;
  if (value === undefined) {
    val = "";
  }
  var download = document.createElement("a");
  download.href = "data:text/plain;content-disposition=attachment;filename=file," + val;
  download.download = name;
  download.style.display = "none";
  download.id = "download"; document.body.appendChild(download);
  document.getElementById("download").click();
  document.body.removeChild(download);
}




