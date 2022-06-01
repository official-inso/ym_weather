<?php header('Content-Type: application/javascript');
include_once('php/config.php'); ?>

var staticCacheName = 'cache_Ver_<?php echo ($version); ?>';

const accetsUrls = [

// Шрифты
'./media/fonts/fonts.php',
'./media/fonts/feather.woff',
'./media/fonts/Product Sans Bold.ttf',
'./media/fonts/Product Sans Light.ttf',
'./media/fonts/Product Sans Medium.ttf',
'./media/fonts/Product Sans.ttf',

// Страницы
'./offline.html',

// JavaScript
'./js/jquery.js',
'./js/include.js',
'./js/jquery.cookie.js',
'./js/jquery-qrcode-0.18.0.js',
'./js/jquery.inputmask.js',
'./js/scrollbar.js',
'./js/swipe.js',
'./js/offline.js',
'./js/service.js',


// Styles
'./style/config.css',
'./style/notification.css',
'./style/offline.css',
];

self.addEventListener('install', async () => {
const cache = await caches.open(staticCacheName);
await cache.addAll(accetsUrls);
});

self.addEventListener('activate', async () => {
const cacheNames = await caches.keys();
await Promise.all(
cacheNames
.filter(name => name !== staticCacheName)
.map(name => caches.delete(name))
);
});

self.addEventListener("fetch", (event) => {
const {request} = event;


if (request.mode === "navigate") {
event.respondWith(
(async () => {
try {

const preloadResponse = await event.preloadResponse;
if (preloadResponse) {
return preloadResponse;
}

const networkResponse = await fetch(request);
return networkResponse;
} catch (error) {

const cache = await caches.open(staticCacheName);
const cachedResponse = await cache.match('./offline.html');
return cachedResponse;
}
})()
);
} else {
if(!request.url.match(/longPoll/ui)){
event.respondWith(cacheFirst(request));
}
}

});

async function cacheFirst(request) {
const cached = await caches.match(request);
return cached ?? await fetch(request);
}