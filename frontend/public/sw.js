// Simple service worker placeholder
// This prevents 404 errors when browser looks for service worker

self.addEventListener("install", (event) => {
    console.log("Service Worker installing.");
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker activating.");
});

self.addEventListener("fetch", (event) => {
    // Pass through - no caching
    event.respondWith(fetch(event.request));
});
