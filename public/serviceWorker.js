const CacheName = "vortexa-V-1.0";
const CacheList = [
    "icons/144.png",
];
//Installing Service Worker
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CacheName).then((cache) => {
            // console.log("Checking Cache");
            return cache.addAll(CacheList);
        })
    );
});

//Fetching Service Worker
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

//Activating Service Worker
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});