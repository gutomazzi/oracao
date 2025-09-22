//self.addEventListener('fetch', () => {});
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Tenta buscar o arquivo na rede.
        // Se a busca der certo, salva o arquivo no cache e o retorna.
        return caches.open('meu-cache-dinamico').then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => {
        // Se a busca na rede falhar, retorna a versão do cache.
        return caches.match(event.request);
      })
  );
});
