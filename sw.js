let cacheName = 'restaurant-v1';
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(cacheName).then(function(cache) {
			return cache.addAll([
				'/',
				'index.html',
				'restaurant.html'
				'sw.js',
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
			]);
		})
	);
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request).then(function(response) {
          let response = response.clone();
          caches.open(cacheName).then(function(cache) {
            cache.put(event.request, response);
          });
          return response;
        }).catch(function() {
          return new response('<p>Check your Internet coonnection</p>', {
            headers: {'Content-Type': 'text/html'}
          });
        })
      }
    })
  )
});