const CACHE_NAME = "my-app-cache-v1";
const urlsToCache = ["/", "/offline.html", "/styles.css", "/script.js"];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("push", (event) => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.message,
        icon: "/icon.png",
    });
});

self.addEventListener("sync", (event) => {
    if (event.tag === "sync-data") {
        event.waitUntil(syncData());
    }
});

function syncData() {
    return fetch("/api/sync", { method: "POST" })
        .then((response) => response.json())
        .then((data) => console.log("Data synchronized", data))
        .catch((err) => console.error("Data sync failed", err));
}
navigator.serviceWorker.ready.then((registration) => {
    registration.sync.register("sync-data");
});
