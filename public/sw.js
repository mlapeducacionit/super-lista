
// El service worker tiene eventos. Algunos de los eventos más importantes son:
// * Install
self.addEventListener('install', e => {
    console.log('sw install')
})
// * Activate
self.addEventListener('activate', e => {
    console.log('sw activate')
})
// * Fetch
self.addEventListener('fetch', e => {
    console.log('sw fetch')
})

