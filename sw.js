/* MD Reader v18 — recursos estáticos versionados e atualização segura. */
const CACHE='md-reader-static-v34';
const CORE='md-reader-core-v34';
const ASSETS=["./", "./index.html", "./style.css", "./app.js", "./manifest.json", "./icon.svg", "./favicon-16.png", "./favicon-32.png", "./apple-touch-icon.png", "./icon-192.png", "./icon-512.png", "./marked.js", "./highlight.min.js"];
const scope=new URL(self.registration.scope);
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CORE);
 await cache.addAll(ASSETS);
 // Não ativar uma versão nova antes de ela estar completa.
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 const keys=await caches.keys();
 await Promise.all(keys.filter(k=>(k.startsWith('md-reader-static-')||k.startsWith('md-reader-core-'))&&!([CORE,CACHE].includes(k))).map(k=>caches.delete(k)));
 await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
 // Nunca guardar respostas de URLs de documentos carregados pelo usuário neste cache.
 const isAppShell=url.pathname===scope.pathname||ASSETS.some(a=>new URL(a,scope).pathname===url.pathname);
 if(!isAppShell)return;
 event.respondWith((async()=>{
  const cache=await caches.open(CORE);
  const cached=await cache.match(req,{ignoreSearch:true});
  if(cached)return cached;
  try{const response=await fetch(req);if(response.ok&&response.type==='basic')await cache.put(req,response.clone());return response}
  catch{if(req.mode==='navigate')return await cache.match(new URL('./index.html',scope).href)||Response.error();return Response.error()}
 })());
});
self.addEventListener('message',event=>{
 if(event.data?.type==='MD_READER_CACHE_STATUS'){
  event.waitUntil((async()=>{const c=await caches.open(CORE);const missing=[];for(const a of ASSETS){if(!await c.match(new URL(a,scope).href))missing.push(a)}event.source?.postMessage({type:'MD_READER_CACHE_STATUS',version:34,missing})})());
 }
});
