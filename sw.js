let staticCacheName = 'restaurant-v1';

let urlToCache = [
        '/',
        'index.html',
        'restaurant.html',
        'css/styles.css',
        'js/dbhelper.js',
        'js/main.js',
        'js/restaurant_info.js',
        'data/restaurants.json',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      console.log(cache);
      return cache.addAll(urlToCache);
    }).catch(error => {
      console.log('error');
    })

  );
});

self.addEventListener('activate' , function(error) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startWith('restaurant') && cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
        );
    })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }) 
    );
});