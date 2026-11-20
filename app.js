(()=>{'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const els={doc:$('#document'),empty:$('#emptyState'),drawer:$('#drawer'),scrim:$('#scrim'),search:$('#searchPanel'),appearance:$('#appearancePanel'),file:$('#fileInput'),title:$('#fileTitle')};
const defaults={theme:'light',palette:'original',fontSize:18,lineHeight:1.75,readWidth:760,fontFamily:'sans',readingMode:'scroll'};
let activeView='empty',libraryVisible=false,libraryFilter='all',activeLibraryId='default',libraries=[{id:'default',name:'Geral'}],selectionSnapshot=null,pageTotal=1,pageIndex=0,pageResizeTimer;
let prefs={...defaults},records=[],currentId=null,matchIndex=-1,matches=[],scrollTimer,toastTimer,lastScroll=0,drawerReturn=null;
const example=`# Bem-vindo ao MD Reader\n\nEste é um **leitor Markdown offline**, leve e privado.\n\n## Primeiros passos\n\n1. Abra um arquivo **.md** do dispositivo.\n2. Use o menu para navegar pelo **sumário**.\n3. Personalize tema, fonte e largura de leitura.\n4. Marque um documento como favorito para retomá-lo depois.\n\n## Markdown estendido\n\n| Recurso | Compatibilidade |\n| :--- | :--- |\n| Tabelas | Sim |\n| Tarefas | Sim |\n| Código | Sim |\n| Notas de rodapé | Sim |\n\n- [x] Ler offline\n- [ ] Explorar seus documentos\n\n> Uma boa interface deixa o conteúdo em primeiro plano.\n\n### Exemplo de código\n\n\`\`\`javascript\nconst saudacao = 'Olá, Markdown!';\nconsole.log(saudacao);\n\`\`\`\n\nUma nota de rodapé[^1] para demonstrar o recurso.\n\n[^1]: As notas aparecem ao final do documento.\n\n## Privacidade\n\nOs arquivos são guardados **somente neste navegador**. Exporte backups dos arquivos originais se precisar preservá-los fora do aplicativo.\n`;
function toast(msg){const e=$('#toast');e.textContent=msg;e.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.classList.remove('show'),3500)}
function storageGet(k,fall){try{return JSON.parse(localStorage.getItem(k))??fall}catch{return fall}}
function savePrefs(){try{localStorage.setItem('mdr-prefs-v1',JSON.stringify(prefs))}catch{toast('Não foi possível salvar preferências.')}}
function applyPrefs(){document.body.dataset.theme=prefs.theme;document.body.dataset.palette=prefs.palette;document.body.dataset.fontFamily=prefs.fontFamily;document.body.dataset.readingMode=prefs.readingMode;$$('[data-reading-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.readingMode===prefs.readingMode)));$('#fontFamily').value=prefs.fontFamily;$('#paletteSelect').value=prefs.palette;document.documentElement.style.setProperty('--font',prefs.fontSize+'px');document.documentElement.style.setProperty('--leading',prefs.lineHeight);document.documentElement.style.setProperty('--reading-width',prefs.readWidth+'px');$('#fontSize').value=prefs.fontSize;$('#lineHeight').value=prefs.lineHeight;$('#readWidth').value=prefs.readWidth;$('#fontSizeValue').textContent=prefs.fontSize+' px';$('#lineHeightValue').textContent=Number(prefs.lineHeight).toFixed(1);$('#readWidthValue').textContent=prefs.readWidth+' px';$$('[data-set-theme]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.setTheme===prefs.theme)));document.querySelector('meta[name="theme-color"]').content=getComputedStyle(document.body).getPropertyValue('--bg').trim()}
function dbOpen(){return new Promise((resolve,reject)=>{const r=indexedDB.open('md-reader-db',2);r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains('documents')){const store=r.result.createObjectStore('documents',{keyPath:'id'});store.createIndex('opened','opened')}if(!r.result.objectStoreNames.contains('meta'))r.result.createObjectStore('meta')};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
let db=null;
function tx(mode,fn){return new Promise((resolve,reject)=>{if(!db){reject(Error('Banco indisponível'));return}const t=db.transaction('documents',mode),s=t.objectStore('documents');let result;t.oncomplete=()=>resolve(result);t.onerror=()=>reject(t.error);try{const req=fn(s);if(req){req.onsuccess=()=>{result=req.result}}}catch(e){reject(e)}})}
async function refreshRecords(){if(!db)return;records=await tx('readonly',s=>s.getAll());records.sort((a,b)=>b.opened-a.opened);renderLists();renderLibrary()}
async function putRecord(rec){await tx('readwrite',s=>s.put(rec));await refreshRecords()}
const makeId=(source,name)=>source==='url'?'url:'+name:'local:'+name;
function safeName(name){return String(name).slice(0,180)}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function footnoteExpand(source){const defs=new Map(),lines=source.split(/\r?\n/),body=[];let fenced=false,fenceChar='',fenceLen=0;for(let i=0;i<lines.length;i++){const l=lines[i],f=l.match(/^\s{0,3}(`{3,}|~{3,})/);if(f){if(!fenced){fenced=true;fenceChar=f[1][0];fenceLen=f[1].length}else if(f[1][0]===fenceChar&&f[1].length>=fenceLen)fenced=false}if(!fenced){const m=l.match(/^\[\^([^\]]{1,80})\]:\s*(.*)$/);if(m){const parts=[m[2]];while(i+1<lines.length&&/^( {4}|\t)/.test(lines[i+1]))parts.push(lines[++i].replace(/^( {4}|\t)/,''));defs.set(m[1],parts.join(' '));continue}}body.push(l)}if(!defs.size)return source;let text=body.join('\n'),used=[],counter=0;let inFence=false;const processed=text.split('\n').map(l=>{const f=l.match(/^\s{0,3}(`{3,}|~{3,})/);if(f)inFence=!inFence;if(inFence)return l;return l.replace(/\[\^([^\]]{1,80})\]/g,(full,id)=>{if(!defs.has(id))return full;let n=used.indexOf(id);if(n<0){used.push(id);n=used.length-1}return `<sup><a href="#fn-${n+1}" id="fnref-${n+1}" aria-label="Nota ${n+1}">[${n+1}]</a></sup>`})}).join('\n');if(used.length){text=processed+'\n\n<section class="footnotes" aria-label="Notas de rodapé">\n<h2>Notas de rodapé</h2>\n<ol>\n'+used.map((id,i)=>`<li id="fn-${i+1}">${escapeHtml(defs.get(id))} <a href="#fnref-${i+1}" aria-label="Voltar à referência">↩</a></li>`).join('\n')+'\n</ol>\n</section>'}else text=processed;return text}
// Sanitizador estrito: não mantém elementos ativos, eventos, estilos, URLs perigosas ou IDs arbitrários.
const ALLOWED=new Set('a abbr b blockquote br code del details div em h1 h2 h3 h4 h5 h6 hr i img input kbd li mark ol p pre s section small span strong sub summary sup table tbody td th thead tr u ul'.split(' '));
function cleanUrl(v,kind){const value=(v||'').trim();if(!value||/[\u0000-\u001f\u007f]/.test(value))return null;if(value.startsWith('#'))return kind==='href'?value:null;try{const u=new URL(value,location.href);if(kind==='src')return ['https:','http:'].includes(u.protocol)?u.href:null;return ['https:','http:','mailto:'].includes(u.protocol)?u.href:null}catch{return null}}
function sanitize(html){const parsed=new DOMParser().parseFromString(html,'text/html'),frag=document.createDocumentFragment();function visit(node,parent){if(node.nodeType===Node.TEXT_NODE){parent.appendChild(document.createTextNode(node.textContent));return}if(node.nodeType!==Node.ELEMENT_NODE)return;const tag=node.localName;if(!ALLOWED.has(tag)){if(['script','style','iframe','object','embed','svg','math','form','video','audio','template','textarea','button','select','meta','link','base'].includes(tag))return;[...node.childNodes].forEach(c=>visit(c,parent));return}const e=document.createElement(tag);if(tag==='a'){const url=cleanUrl(node.getAttribute('href'),'href');if(url){e.setAttribute('href',url);if(!url.startsWith('#')){e.setAttribute('target','_blank');e.setAttribute('rel','noopener noreferrer')}}}if(tag==='img'){const src=cleanUrl(node.getAttribute('src'),'src');if(!src)return;e.setAttribute('src',src);e.setAttribute('loading','lazy');e.setAttribute('alt',(node.getAttribute('alt')||'').slice(0,300))}if(tag==='input'){if(node.getAttribute('type')!=='checkbox')return;e.setAttribute('type','checkbox');e.disabled=true;if(node.hasAttribute('checked'))e.checked=true}if(tag==='code'){const cls=node.getAttribute('class')||'';const m=cls.match(/(?:^|\s)language-([a-zA-Z0-9_+-]{1,30})(?:\s|$)/);if(m)e.className='language-'+m[1]}if(tag==='th'||tag==='td'){const align=node.getAttribute('align');if(['left','center','right'].includes(align))e.setAttribute('align',align)}if(tag==='a'&&node.id&&/^fnref-\d+$/.test(node.id))e.id=node.id;if(tag==='li'&&node.id&&/^fn-\d+$/.test(node.id))e.id=node.id;if(tag==='section'&&node.className==='footnotes')e.className='footnotes';if(tag==='a'&&node.getAttribute('aria-label')&&/^Nota \d+$|^Voltar à referência$/.test(node.getAttribute('aria-label')))e.setAttribute('aria-label',node.getAttribute('aria-label'));[...node.childNodes].forEach(c=>visit(c,e));parent.appendChild(e)}[...parsed.body.childNodes].forEach(n=>visit(n,frag));return frag}
function renderMarkdown(content){const html=marked.parse(footnoteExpand(content),{gfm:true,breaks:false,headerIds:false,mangle:false});els.doc.replaceChildren(sanitize(html));els.doc.querySelectorAll('pre code').forEach(code=>{try{hljs.highlightElement(code)}catch{}});const toc=$('#toc');toc.replaceChildren();let count=0;els.doc.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h=>{const id='heading-'+(++count);h.id=id;const a=document.createElement('a');a.href='#'+id;a.dataset.label=h.textContent.trim().slice(0,180);a.setAttribute('aria-label','Ir para: '+h.textContent);a.className='toc-mark level-'+h.tagName[1];a.addEventListener('click',()=>{setTimeout(updateTocActive,80)});toc.appendChild(a)});if(!count){const p=document.createElement('p');p.className='muted';p.textContent='Este documento não possui títulos.';toc.appendChild(p)}$('#tocRail').hidden=!count||prefs.readingMode==='page';restoreInlineMarks();updateTocActive()}
function updateTocActive(){const rail=$('#tocRail');if(rail.hidden)return;const headings=[...els.doc.querySelectorAll('h1,h2,h3,h4,h5,h6')];let active=0;for(let i=0;i<headings.length;i++){if(headings[i].getBoundingClientRect().top<=innerHeight*.38)active=i;else break}$$('#toc .toc-mark').forEach((a,i)=>{a.classList.toggle('active',i===active);if(i===active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}
function syncQuickActions(){const dark=prefs.theme==='dark',b=$('#themeQuickBtn');b.textContent=dark?'☀':'☾';b.setAttribute('aria-label',dark?'Ativar modo claro':'Ativar modo escuro');b.setAttribute('aria-pressed',String(dark));const f=document.body.classList.contains('focus-mode');$('#focusBtn').setAttribute('aria-pressed',String(f));const fs=Boolean(document.fullscreenElement);$('#fullscreenBtn').setAttribute('aria-pressed',String(fs));$('#fullscreenBtn').setAttribute('aria-label',fs?'Sair da tela cheia':'Entrar em tela cheia');$('#fullscreenBtn').textContent=fs?'⤢':'⛶';const r=records.find(x=>x.id===currentId);$('#favoriteBtn').setAttribute('aria-pressed',String(Boolean(r?.favorite)))}
async function toggleFullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else toast('Tela cheia não disponível neste navegador.')}catch{toast('Não foi possível alterar a tela cheia.')}syncQuickActions()}
function showDocument(rec,restore=true){selectionSnapshot=null;currentId=rec.id;setView('document',rec.name);clearMatches();renderMarkdown(rec.content);$('#favoriteBtn').disabled=false;$('#favoriteBtn').textContent=rec.favorite?'★':'☆';$('#favoriteBtn').setAttribute('aria-label',rec.favorite?'Remover dos favoritos':'Adicionar aos favoritos');document.title=rec.name+' — MD Reader';$('#bookmarkBtn').disabled=false;syncDocumentActions();syncQuickActions();syncReadingControls();closeDrawer();requestAnimationFrame(()=>{configureReadingMode(restore);})}
async function openContent(name,content,source='local'){if(typeof content!=='string'||!content.trim()){toast('Documento vazio.');return}if(content.length>5_000_000){toast('Limite de 5 milhões de caracteres por documento.');return}const id=makeId(source,name),old=records.find(r=>r.id===id),rec={id,name:safeName(name),source,content,opened:Date.now(),favorite:old?.favorite||false,libraryId:old?.libraryId||activeLibraryId,marks:old?.marks||[],bookmark:old?.bookmark||null,readPage:old?.readPage||0,scroll:old?.scroll||0};try{await putRecord(rec);showDocument(rec,Boolean(old));toast('Documento aberto e salvo offline.')}catch(e){console.error(e);showDocument(rec,false);toast('Documento aberto, mas não foi possível salvar offline.')}}
async function openSaved(id){const rec=records.find(r=>r.id===id);if(!rec)return;rec.opened=Date.now();try{await putRecord(rec)}catch{}showDocument(rec)}
function renderLists(){function populate(container,items){if(!container)return;container.replaceChildren();if(!items.length){const p=document.createElement('p');p.className='muted';p.textContent='Nenhum documento.';container.appendChild(p);return}items.forEach(rec=>{const row=document.createElement('div');row.className='file-item';const open=document.createElement('button');open.className='file-open';open.textContent=rec.name;open.title=rec.name;open.onclick=()=>openSaved(rec.id);const star=document.createElement('button');star.className='file-star';star.textContent=rec.favorite?'★':'☆';star.setAttribute('aria-label',rec.favorite?'Desfavoritar '+rec.name:'Favoritar '+rec.name);star.onclick=()=>toggleFavorite(rec.id);row.append(open,star);container.appendChild(row)})}populate($('#emptyRecent'),records.slice(0,5));renderLibrary()}
async function toggleFavorite(id){const rec=records.find(r=>r.id===id);if(!rec)return;rec.favorite=!rec.favorite;try{await putRecord(rec)}catch{toast('Não foi possível atualizar favorito.')}if(currentId===id){$('#favoriteBtn').textContent=rec.favorite?'★':'☆';$('#favoriteBtn').setAttribute('aria-label',rec.favorite?'Remover dos favoritos':'Adicionar aos favoritos');syncQuickActions()}}
async function clearHistory(){if(!confirm('Excluir os documentos recentes não favoritos? Os favoritos serão preservados.'))return;try{for(const rec of records.filter(r=>!r.favorite))await tx('readwrite',s=>s.delete(rec.id));await refreshRecords();if(currentId&&!records.some(r=>r.id===currentId))currentId=null;toast('Histórico não favorito removido.')}catch{toast('Não foi possível limpar o histórico.')}}

function openLibrary(){
 const name=libraries.find(l=>l.id===activeLibraryId)?.name||'Geral';
 showCollection('libraryPage','Biblioteca — '+name);
 renderLibrary();
}
function renderLibrary(){
 const grid=$('#libraryGrid');if(!grid)return;
 const q=$('#librarySearch').value.trim().toLocaleLowerCase('pt-BR');
 const sort=$('#librarySort').value;
 let items=records.filter(r=>(r.libraryId||'default')===activeLibraryId&&(libraryFilter!=='favorites'||r.favorite)&&(libraryFilter!=='reading'||r.scroll>0)&&(!q||(r.name+' '+r.content).toLocaleLowerCase('pt-BR').includes(q)));
 items.sort((a,b)=>sort==='title'?a.name.localeCompare(b.name,'pt-BR'):sort==='oldest'?a.opened-b.opened:b.opened-a.opened);
 $('#libraryTitle').textContent='Biblioteca — '+(libraries.find(l=>l.id===activeLibraryId)?.name||'Geral');$('#libraryCount').textContent=items.length+' '+(items.length===1?'documento':'documentos');
 grid.replaceChildren();
 if(!items.length){const empty=document.createElement('div');empty.className='library-no-results';const h=document.createElement('h2');h.textContent=records.length?'Nenhum documento encontrado':'Sua biblioteca está vazia';const d=document.createElement('p');d.textContent=records.length?'Experimente outra busca ou filtro.':'Adicione um arquivo Markdown para começar sua coleção.';empty.append(h,d);grid.append(empty);return}
 items.forEach((rec,i)=>{
  const card=document.createElement('article');card.className='book-card';
  const cover=document.createElement('button');cover.type='button';cover.className='book-cover';cover.style.setProperty('--book-accent',['#733325','#3e5c76','#8c3b1b','#2f6860','#6a416e'][i%5]);cover.setAttribute('aria-label','Ler '+rec.name);
  const bookLabel=document.createElement('span');bookLabel.className='book-type';bookLabel.textContent='MD READER';
  const bookTitle=document.createElement('strong');bookTitle.className='book-cover-title';bookTitle.textContent=rec.name.replace(/\.(md|markdown|mdown|mkd)$/i,'');
  const bookFoot=document.createElement('span');bookFoot.className='book-foot';bookFoot.textContent='MARKDOWN';
  cover.append(bookLabel,bookTitle,bookFoot);cover.onclick=()=>openSaved(rec.id);
  const info=document.createElement('div');info.className='book-info';
  const name=document.createElement('button');name.className='book-name';name.textContent=rec.name;name.title=rec.name;name.onclick=()=>openSaved(rec.id);
  const meta=document.createElement('small');meta.textContent=(rec.scroll>0?'Em leitura · ':'')+new Date(rec.opened).toLocaleDateString('pt-BR');
  const actions=document.createElement('div');actions.className='book-actions';
  const fav=document.createElement('button');fav.type='button';fav.textContent=rec.favorite?'★':'☆';fav.setAttribute('aria-label',(rec.favorite?'Remover dos favoritos: ':'Adicionar aos favoritos: ')+rec.name);fav.setAttribute('aria-pressed',String(rec.favorite));fav.title='Favorito';fav.onclick=()=>toggleFavorite(rec.id);
  const del=document.createElement('button');del.type='button';del.textContent='✕';del.setAttribute('aria-label','Excluir da biblioteca: '+rec.name);del.title='Excluir';del.onclick=()=>deleteLibraryDocument(rec.id);
  const move=document.createElement('select');move.className='book-move';move.setAttribute('aria-label','Mover '+rec.name+' para biblioteca');for(const lib of libraries){const opt=document.createElement('option');opt.value=lib.id;opt.textContent=lib.name;move.append(opt)}move.value=rec.libraryId||'default';move.onchange=async()=>{rec.libraryId=move.value;await putRecord(rec);toast('Documento movido.');renderLibrary()};actions.append(fav,del);info.append(name,meta,actions,move);card.append(cover,info);grid.append(card);
 });
}
async function deleteLibraryDocument(id){
 const rec=records.find(r=>r.id===id);if(!rec||!confirm('Excluir "'+rec.name+'" da biblioteca deste navegador?'))return;
 try{await tx('readwrite',s=>s.delete(id));if(currentId===id){currentId=null;els.doc.replaceChildren();$('#favoriteBtn').disabled=true;try{localStorage.removeItem('mdr-last-v1')}catch{}}
 await refreshRecords();toast('Documento excluído da biblioteca.')}catch{toast('Não foi possível excluir o documento.')}
}

function openDrawer(){drawerReturn=document.activeElement;els.drawer.classList.add('open');els.drawer.setAttribute('aria-hidden','false');els.scrim.hidden=false;$('#menuBtn').setAttribute('aria-expanded','true');$('#closeDrawer').focus()}
function closeDrawer(){els.drawer.classList.remove('open');els.drawer.setAttribute('aria-hidden','true');els.scrim.hidden=true;$('#menuBtn').setAttribute('aria-expanded','false');if(drawerReturn?.isConnected)drawerReturn.focus({preventScroll:true})}
function togglePanel(which){const panel=which==='search'?els.search:els.appearance,other=which==='search'?els.appearance:els.search;other.hidden=true;panel.hidden=!panel.hidden;if(!panel.hidden&&which==='search')$('#searchInput').focus()}
function clearMatches(){matches.forEach(e=>e.replaceWith(document.createTextNode(e.textContent)));els.doc.normalize();matches=[];matchIndex=-1;$('#searchCount').textContent='0/0'}
function searchText(query){clearMatches();if(!query||!currentId)return;const needle=query.toLocaleLowerCase('pt-BR');const walker=document.createTreeWalker(els.doc,NodeFilter.SHOW_TEXT,{acceptNode(n){return n.parentElement?.closest('pre,code,script,style,mark')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);for(const n of nodes){const text=n.textContent,low=text.toLocaleLowerCase('pt-BR');let pos=0,idx,frag=document.createDocumentFragment(),found=false;while((idx=low.indexOf(needle,pos))!==-1){found=true;frag.appendChild(document.createTextNode(text.slice(pos,idx)));const mark=document.createElement('mark');mark.className='search-hit';mark.textContent=text.slice(idx,idx+needle.length);frag.appendChild(mark);matches.push(mark);pos=idx+needle.length;if(matches.length>=1500)break}if(found){frag.appendChild(document.createTextNode(text.slice(pos)));n.replaceWith(frag)}if(matches.length>=1500)break}if(matches.length)navigateMatch(0);else $('#searchCount').textContent='0/0'}
function navigateMatch(index){if(!matches.length)return;matches[matchIndex]?.classList.remove('active');matchIndex=(index+matches.length)%matches.length;matches[matchIndex].classList.add('active');$('#searchCount').textContent=(matchIndex+1)+'/'+matches.length+(matches.length===1500?'+':'');matches[matchIndex].scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
function focusMode(on){document.body.classList.toggle('focus-mode',on);$('#exitFocus').hidden=!on;els.search.hidden=true;els.appearance.hidden=true;if(on)closeDrawer();syncQuickActions()}
function requestFile(){els.file.value='';els.file.click()}
async function handleFile(file){if(!file)return;if(!/\.(md|markdown|mdown|mkd|txt)$/i.test(file.name)&&!['text/markdown','text/plain'].includes(file.type)){toast('Escolha um arquivo Markdown (.md).');return}if(file.size>5_000_000){toast('Arquivo muito grande (máximo 5 MB).');return}try{await openContent(file.name,await file.text())}catch{toast('Não foi possível ler o arquivo.')}}
async function loadUrl(url){let u;try{u=new URL(url);if(u.protocol!=='https:')throw Error('Use um endereço HTTPS.')}catch{toast('Informe uma URL HTTPS válida.');return}const submit=$('#urlForm button[type=submit]');submit.disabled=true;try{const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);let res;try{res=await fetch(u.href,{signal:controller.signal,mode:'cors',credentials:'omit',cache:'no-store'})}finally{clearTimeout(timer)}if(!res.ok)throw Error('HTTP '+res.status);const len=Number(res.headers.get('content-length')||0);if(len>5_000_000)throw Error('Arquivo acima de 5 MB');const content=await res.text();if(content.length>5_000_000)throw Error('Arquivo acima do limite');await openContent(u.href,content,'url');$('#urlDialog').close()}catch(e){toast('Falha ao carregar URL: '+(e.name==='AbortError'?'tempo esgotado':e.message)+'. Verifique conexão e CORS.')}finally{submit.disabled=false}}
function saveScroll(){if(!currentId||libraryVisible)return;const rec=records.find(r=>r.id===currentId);if(!rec)return;if(prefs.readingMode==='page')rec.readPage=pageIndex;else rec.scroll=Math.round(scrollY);tx('readwrite',s=>s.put(rec)).catch(()=>{})}
function pageWidth(){return els.doc.clientWidth||1}
function calculatePages(){
 if(prefs.readingMode!=='page'||els.doc.hidden)return;
 // Column flow: a single document, horizontally advanced by one column.
 const width=pageWidth();pageTotal=Math.max(1,Math.ceil((els.doc.scrollWidth-1)/width));
 goPage(Math.min(pageIndex,pageTotal-1),false);
}
function goPage(n,persist=true){
 if(prefs.readingMode!=='page'||!currentId||libraryVisible)return;
 pageIndex=Math.max(0,Math.min(pageTotal-1,Math.round(n)));
 els.doc.scrollLeft=pageIndex*pageWidth();
 $('#pageIndicator').textContent=`${pageIndex+1} / ${pageTotal}`;
 $('#prevPage').disabled=pageIndex===0;$('#nextPage').disabled=pageIndex>=pageTotal-1;
 if(persist)saveScroll();
}
function configureReadingMode(restore=true){
 if(!currentId||libraryVisible)return;
 const rec=records.find(r=>r.id===currentId);
 document.body.dataset.readingMode=prefs.readingMode;
 $('#pageControls').hidden=prefs.readingMode!=='page';
 $('#tocRail').hidden=prefs.readingMode==='page'||!els.doc.querySelector('h1,h2,h3,h4,h5,h6');
 $('#backToTop').hidden=prefs.readingMode==='page';
 if(prefs.readingMode==='page'){
   window.scrollTo({top:0,behavior:'instant'});
   pageIndex=restore?(rec?.readPage||0):0;
   requestAnimationFrame(()=>requestAnimationFrame(calculatePages));
 }else{
   els.doc.scrollLeft=0;
   requestAnimationFrame(()=>window.scrollTo({top:restore?(rec?.scroll||0):0,behavior:'instant'}));
 }
 syncReadingControls();
}
function setReadingMode(mode){
 if(!['page','scroll'].includes(mode))return;
 if(mode===prefs.readingMode)return;
 saveScroll();prefs.readingMode=mode;savePrefs();applyPrefs();configureReadingMode(true);syncReadingControls();
 toast(mode==='page'?'Modo página ativado. Use as setas para navegar.':'Modo rolagem ativado.');
}
function syncReadingControls(){
 const b=$('#readingModeBtn');b.setAttribute('aria-pressed',String(prefs.readingMode==='page'));
 b.setAttribute('aria-label',prefs.readingMode==='page'?'Ativar modo rolagem':'Ativar modo página');
 b.title=prefs.readingMode==='page'?'Modo rolagem':'Modo página';b.textContent=prefs.readingMode==='page'?'☷':'▤';
 const rec=records.find(r=>r.id===currentId);const marked=rec?.bookmark!=null;
 $('#bookmarkBtn').textContent=marked?'🔖':'♧';$('#bookmarkBtn').setAttribute('aria-pressed',String(marked));
 $('#goBookmark').disabled=!marked;
}
async function saveBookmark(){
 if(!currentId)return;
 const rec=records.find(r=>r.id===currentId);if(!rec)return;
 // A bookmark records the reading position in each mode; it is independent of favorite status.
 rec.bookmark={mode:prefs.readingMode,page:pageIndex,scroll:Math.round(window.scrollY),savedAt:Date.now()};
 try{await putRecord(rec);toast('Marcador de página salvo.')}catch{toast('Não foi possível salvar o marcador.')}
 syncReadingControls();
}
function goBookmark(){
 const rec=records.find(r=>r.id===currentId);if(!rec?.bookmark)return;
 const b=rec.bookmark;
 if(prefs.readingMode==='page')goPage(b.page||0);
 else window.scrollTo({top:b.scroll||0,behavior:'smooth'});
}

/* v11 — bibliotecas temáticas, marcadores por trecho e operações locais. */
const VIEW_IDS=['emptyState','document','libraryPage','librariesPage','marksPage','preferencesPage','maintenancePage'];
function ensureAppearanceFloating(){
 if(els.appearance.parentElement!==document.body)document.body.appendChild(els.appearance);
 els.appearance.classList.remove('preferences-embedded','compact-reading-panel');
 $('#settingsTitle').hidden=false;$('#closeAppearance').hidden=false;
}
function setView(view,title){
 if(view!=='preferencesPage')ensureAppearanceFloating();
 activeView=view;libraryVisible=view!=='document'&&view!=='emptyState';
 for(const id of VIEW_IDS){const el=$('#'+id);if(el)el.hidden=id!==view}
 $('#pageControls').hidden=true;$('#tocRail').hidden=true;
 els.search.hidden=true;els.appearance.hidden=true;
 if(view!=='document'){$('#backToTop').hidden=true;document.body.classList.remove('focus-mode');$('#exitFocus').hidden=true;$('#topbar').classList.remove('hidden-on-scroll')}
 document.body.dataset.view=view;
 if(title){els.title.textContent=title;document.title=title+' — MD Reader'}
 syncDocumentActions();
}
function syncDocumentActions(){
 const reading=activeView==='document'&&Boolean(currentId);
 for(const id of ['favoriteBtn','readingModeBtn','bookmarkBtn','searchBtn','focusBtn']){
  const b=$('#'+id);if(b){b.hidden=!reading;if(!reading)b.disabled=true;else b.disabled=false}
 }
 if(!reading){$('#pageControls').hidden=true;$('#tocRail').hidden=true}
}
function hideCollectionPages(){for(const id of VIEW_IDS){const e=$('#'+id);if(e)e.hidden=true}}
function showCollection(id,title){
 setView(id,title);closeDrawer();window.scrollTo({top:0,behavior:'instant'});
 const heading=$('#'+id+' h1');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true})}
}
function persistLibraries(){localStorage.setItem('mdr-libraries-v11',JSON.stringify({libraries,activeLibraryId}))}
function showLibraries(){showCollection('librariesPage','Minhas Bibliotecas');renderLibraries()}
function renderLibraries(){const g=$('#librariesGrid');g.replaceChildren();for(const lib of libraries){const box=document.createElement('article');box.className='library-tile';const btn=document.createElement('button');btn.className='library-tile-main';const count=records.filter(r=>(r.libraryId||'default')===lib.id).length;btn.textContent='📚 '+lib.name+' ('+count+')';btn.onclick=()=>{activeLibraryId=lib.id;persistLibraries();openLibrary()};box.append(btn);if(lib.id!=='default'){const del=document.createElement('button');del.textContent='Excluir';del.className='library-tile-delete';del.onclick=()=>{if(count){toast('Mova ou exclua os documentos antes de excluir esta biblioteca.');return}if(confirm('Excluir biblioteca vazia "'+lib.name+'"?')){libraries=libraries.filter(x=>x.id!==lib.id);if(activeLibraryId===lib.id)activeLibraryId='default';persistLibraries();renderLibraries()}};box.append(del)}g.append(box)}}
function createLibrary(){const name=prompt('Nome da nova biblioteca temática:');if(name===null)return;const clean=name.trim().slice(0,70);if(!clean){toast('Informe um nome.');return}if(libraries.some(l=>l.name.toLocaleLowerCase()===clean.toLocaleLowerCase())){toast('Já existe uma biblioteca com esse nome.');return}const lib={id:'lib-'+crypto.randomUUID(),name:clean};libraries.push(lib);activeLibraryId=lib.id;persistLibraries();openLibrary()}
function textNodes(root){const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){return node.parentElement?.closest('.inline-mark-symbol')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});const arr=[];while(w.nextNode())arr.push(w.currentNode);return arr}
function offsetsForRange(range){const nodes=textNodes(els.doc);let offset=0,start=null,end=null;for(const node of nodes){const len=node.textContent.length;if(node===range.startContainer)start=offset+range.startOffset;if(node===range.endContainer)end=offset+range.endOffset;offset+=len}return start!==null&&end!==null?{start,end}:null}
function rangeFromOffsets(start,end){const nodes=textNodes(els.doc);let n=0,a=null,b=null;for(const node of nodes){const next=n+node.length;if(a===null&&start>=n&&start<=next)a=[node,start-n];if(b===null&&end>=n&&end<=next)b=[node,end-n];n=next}if(!a||!b)return null;const r=document.createRange();r.setStart(...a);r.setEnd(...b);return r}
function captureSelection(){const sel=getSelection();if(!sel||sel.isCollapsed||!sel.rangeCount)return;const range=sel.getRangeAt(0);if(!els.doc.contains(range.commonAncestorContainer))return;const positions=offsetsForRange(range);if(!positions)return;selectionSnapshot={...positions,quote:sel.toString().trim().slice(0,600)}}
function currentMarks(){return records.find(r=>r.id===currentId)?.marks||[]}
async function markSelection(){
 if(!currentId){toast('Abra um documento.');return}
 const rec=records.find(r=>r.id===currentId);if(!rec)return;
 const m=selectionSnapshot&&selectionSnapshot.quote?selectionSnapshot:null;
 const mark=m?{id:crypto.randomUUID(),kind:'quote',...m,created:Date.now()}:{id:crypto.randomUUID(),kind:'position',page:pageIndex,scroll:Math.round(scrollY),created:Date.now()};
 rec.marks=[...(rec.marks||[]),mark];selectionSnapshot=null;getSelection()?.removeAllRanges();
 try{await putRecord(rec);restoreInlineMarks();toast(m?'Trecho salvo em Marcadores.':'Posição salva em Marcadores.')}catch(e){console.error(e);toast('Falha ao guardar marcador.')}
}
function restoreInlineMarks(){
 els.doc.querySelectorAll('.inline-mark-symbol').forEach(n=>n.remove());
 const rec=records.find(r=>r.id===currentId);if(!rec)return;
 const marks=(rec.marks||[]).filter(m=>m.kind==='quote').sort((a,b)=>b.start-a.start);
 // Inserir ícones do fim para o início mantém os deslocamentos anteriores estáveis.
 for(const m of marks){try{const range=rangeFromOffsets(m.start,m.end);if(!range||range.toString().trim()!==m.quote)continue;const el=document.createElement('button');el.className='inline-mark-symbol';el.textContent='🔖';el.type='button';el.title='Ver trecho nos Marcadores';el.setAttribute('aria-label','Trecho marcado: '+m.quote.slice(0,90));el.onclick=()=>showMarks();range.collapse(false);range.insertNode(el)}catch(e){console.warn('Marcador não renderizado:',e)}}
}
function showMarks(){
 showCollection('marksPage','Marcadores');renderMarks()
}
function renderMarks(){
 const grid=$('#marksGrid');grid.replaceChildren();
 const marks=records.flatMap(rec=>(rec.marks||[]).map(m=>({rec,m}))).sort((a,b)=>b.m.created-a.m.created);
 if(!marks.length){const p=document.createElement('p');p.className='library-no-results';p.textContent='Nenhum trecho marcado. Selecione uma palavra ou frase no documento e clique no ícone de marcador.';grid.append(p);return}
 for(const {rec,m} of marks){
  const card=document.createElement('article');card.className='mark-card';
  const title=document.createElement('strong');title.textContent=rec.name;
  const quote=document.createElement('p');quote.textContent=m.kind==='quote'?'“'+m.quote+'”':'Posição de leitura';
  const actions=document.createElement('div');actions.className='mark-actions';
  const go=document.createElement('button');go.textContent='Ir ao trecho';go.onclick=async()=>{await openSaved(rec.id);if(m.kind==='quote'){const range=rangeFromOffsets(m.start,m.end);if(range){if(prefs.readingMode==='page'){const node=range.startContainer.parentElement;const colWidth=els.doc.clientWidth;const rect=range.getBoundingClientRect();const docRect=els.doc.getBoundingClientRect();goPage(Math.round((rect.left-docRect.left+els.doc.scrollLeft)/Math.max(1,colWidth)))}else range.startContainer.parentElement.scrollIntoView({block:'center',behavior:'smooth'});const sel=getSelection();sel.removeAllRanges();sel.addRange(range)}}else if(prefs.readingMode==='page')goPage(m.page||0);else scrollTo({top:m.scroll||0,behavior:'smooth'})};
  const del=document.createElement('button');del.textContent='Excluir';del.onclick=async()=>{rec.marks=rec.marks.filter(x=>x.id!==m.id);await putRecord(rec);renderMarks()};
  actions.append(go,del);card.append(title,quote,actions);grid.append(card);
 }
}
function downloadFile(name,blob){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000)}
async function guardar(){
 try{saveScroll();const all=db?await tx('readonly',s=>s.getAll()):records;const backup={format:'md-reader-backup',version:11,created:new Date().toISOString(),libraries,activeLibraryId,prefs,documents:all};downloadFile('MD-Reader-backup-'+new Date().toISOString().slice(0,10)+'.json',new Blob([JSON.stringify(backup,null,2)],{type:'application/json'}));toast('Backup criado. Guarde o arquivo em local seguro.')}catch(e){console.error(e);toast('Não foi possível gerar o backup.')}
}
async function restoreBackup(file){
 if(!file)return;try{const data=JSON.parse(await file.text());if(data.format!=='md-reader-backup'||!Array.isArray(data.documents)||!Array.isArray(data.libraries))throw Error('Formato inválido');if(!confirm('Importar '+data.documents.length+' documentos? Documentos com o mesmo identificador serão substituídos.'))return;
 for(const rec of data.documents){if(typeof rec.id!=='string'||typeof rec.content!=='string'||typeof rec.name!=='string')continue;await tx('readwrite',s=>s.put(rec))}
 libraries=data.libraries.filter(l=>typeof l.id==='string'&&typeof l.name==='string');if(!libraries.some(l=>l.id==='default'))libraries.unshift({id:'default',name:'Geral'});activeLibraryId=libraries.some(l=>l.id===data.activeLibraryId)?data.activeLibraryId:'default';persistLibraries();if(data.prefs&&typeof data.prefs==='object'){prefs={...defaults,...data.prefs};savePrefs();applyPrefs();syncQuickActions()}await refreshRecords();openLibrary();toast('Backup restaurado.')}catch(e){console.error(e);toast('Backup inválido ou importação indisponível.')}
}
async function atualizar(){
 const rec=records.find(r=>r.id===currentId);
 if(rec?.source==='url'){const url=rec.id.startsWith('url:')?rec.id.slice(4):null;if(!url){toast('URL original não encontrada.');return}await loadUrl(url);return}
 if(rec?.source==='local'){toast('Para atualizar um arquivo local, selecione-o novamente.');requestFile();return}
 if(navigator.serviceWorker?.controller){try{const reg=await navigator.serviceWorker.getRegistration();await reg?.update();toast('Verificação de atualização concluída.')}catch{toast('Falha ao verificar atualização.')}}else toast('Nenhum documento ou atualização disponível.')
}
async function openSystemFile(){
 if(!window.showOpenFilePicker){requestFile();return}
 try{const handles=await showOpenFilePicker({multiple:false,types:[{description:'Markdown',accept:{'text/markdown':['.md','.markdown','.mdown','.mkd'],'text/plain':['.txt']}}]});if(handles[0])await handleFile(await handles[0].getFile())}catch(e){if(e.name!=='AbortError'){console.error(e);toast('Falha ao abrir arquivo pelo sistema.')}}
}
async function saveCurrentFile(){
 const rec=records.find(r=>r.id===currentId);if(!rec){toast('Abra um documento primeiro.');return}
 try{if(window.showSaveFilePicker){const handle=await showSaveFilePicker({suggestedName:rec.name,types:[{description:'Markdown',accept:{'text/markdown':['.md']}}]});const w=await handle.createWritable();await w.write(rec.content);await w.close();toast('Arquivo salvo.')}else downloadFile(rec.name,new Blob([rec.content],{type:'text/markdown;charset=utf-8'}))}catch(e){if(e.name!=='AbortError'){console.error(e);toast('Não foi possível salvar o arquivo.')}}
}
async function copySelected(){const value=getSelection()?.toString()||records.find(r=>r.id===currentId)?.content||'';if(!value){toast('Não há texto para copiar.');return}try{await navigator.clipboard.writeText(value);toast('Texto copiado.')}catch{toast('Permissão de cópia indisponível.')}}
function installFileHandling(){if('launchQueue'in window&&'setConsumer'in launchQueue){launchQueue.setConsumer(async launch=>{for(const handle of launch.files||[]){try{await handleFile(await handle.getFile())}catch(e){console.error(e);toast('Falha ao abrir arquivo recebido do sistema.')}}})}}


/* v13: backups diários e manutenção */
let dailyHandle=null,installPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e});
async function metaGet(key){if(!db)return null;return new Promise((resolve,reject)=>{const t=db.transaction('meta','readonly'),r=t.objectStore('meta').get(key);r.onsuccess=()=>resolve(r.result||null);r.onerror=()=>reject(r.error)})}
async function metaPut(key,value){if(!db)throw Error('Banco indisponível');return new Promise((resolve,reject)=>{const t=db.transaction('meta','readwrite');t.objectStore('meta').put(value,key);t.oncomplete=resolve;t.onerror=()=>reject(t.error)})}
function todayKey(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function backupFilename(){return `MD-Reader-${todayKey()}.json`}
async function backupPayload(){saveScroll();const documents=await tx('readonly',store=>store.getAll());return JSON.stringify({format:'md-reader-backup',version:13,created:new Date().toISOString(),libraries,activeLibraryId,prefs,documents},null,2)}
async function writeBackupHandle(handle,data){const permission=await handle.queryPermission({mode:'readwrite'});if(permission!=='granted'&&(await handle.requestPermission({mode:'readwrite'}))!=='granted')throw Error('Permissão negada');const w=await handle.createWritable();await w.write(data);await w.close()}
async function dailyBackup(update=false){
 try{
  if(!db)throw Error('Banco de dados indisponível');
  const day=todayKey(),data=await backupPayload(),saved=await metaGet('daily-backup');
  let handle=saved?.day===day?saved.handle:null;
  if(update&&!saved?.day){toast('Nenhum backup diário registrado. Use Guardar primeiro.');return}
  if(update&&saved?.day!==day){toast('Ainda não há backup de hoje. Use Guardar.');return}
  if(!update&&saved?.day===day){toast('O backup de hoje já existe. Use Atualizar.');return}
  if(handle){try{await writeBackupHandle(handle,data);await metaPut('daily-backup',{day,handle,updated:new Date().toISOString()});toast('Backup diário atualizado no mesmo arquivo.');return}catch(e){console.warn('Acesso ao arquivo diário não disponível:',e)}}
  if('showSaveFilePicker'in window){
   try{handle=await showSaveFilePicker({suggestedName:backupFilename(),types:[{description:'Backup JSON',accept:{'application/json':['.json']}}]});await writeBackupHandle(handle,data);await metaPut('daily-backup',{day,handle,updated:new Date().toISOString()});toast(update?'Backup salvo. Confirme o destino do arquivo.':'Backup diário guardado.');return}catch(e){if(e.name==='AbortError')return;console.warn(e)}
  }
  downloadFile(backupFilename(),new Blob([data],{type:'application/json'}));await metaPut('daily-backup',{day,updated:new Date().toISOString(),download:true});toast(update?'Novo download gerado: substitua manualmente o arquivo anterior.':'Backup baixado. Guarde o arquivo em local seguro.');
 }catch(e){console.error(e);toast('Não foi possível concluir o backup diário.')}
}
function showPreferences(){
 showCollection('preferencesPage','Preferências');
 const target=$('#preferencesControls');target.append(els.appearance);
 els.appearance.hidden=false;els.appearance.classList.add('preferences-embedded');
 $('#settingsTitle').hidden=true;$('#closeAppearance').hidden=true;
}
function showMaintenance(){showCollection('maintenancePage','Manutenção')}
function showInfo(kind){const github='https://github.com/magpe-stack/MD-Reader',manual=github+'/blob/main/README.md';const isManual=kind==='manual';$('#infoTitle').textContent=isManual?'Manual do MD Reader':'Projeto no GitHub';$('#infoDescription').textContent=isManual?'O manual do aplicativo será desenvolvido quando o projeto estiver concluído. O link abaixo aponta para o README do repositório.':'Acesse o código-fonte e acompanhe o desenvolvimento do MD Reader no GitHub.';const link=$('#infoLink');link.href=isManual?manual:github;link.textContent=isManual?'Abrir manual no GitHub':'Abrir repositório no GitHub';closeDrawer();$('#infoDialog').showModal()}
async function maintenanceAction(action){const out=$('#maintenanceOutput');const say=v=>out.textContent=v;
 try{switch(action){
 case 'install':if(installPrompt){await installPrompt.prompt();say('Pedido de instalação enviado ao navegador.')}else say('Use o menu do navegador → Instalar aplicativo, se disponível.');break;
 case 'uninstall':say('Abra a lista de aplicativos instalados do navegador ou do sistema, encontre MD Reader e escolha Desinstalar. Faça backup antes; dados locais podem ser removidos.');break;
 case 'updates':{const r=await navigator.serviceWorker?.getRegistration();if(r){await r.update();say('Verificação de atualização concluída. Recarregue a página para receber uma nova versão quando disponível.')}else say('Service Worker não registrado neste navegador.');break}
 case 'diagnostics':say(`IndexedDB: ${db?'disponível':'indisponível'} | HTTPS: ${isSecureContext?'sim':'não'} | Service Worker: ${'serviceWorker'in navigator?'suportado':'não suportado'} | Documentos: ${records.length}`);break;
 case 'offline':{const cache=await caches.open('md-reader-static-v13');const assets=['./index.html','./style.css','./app.js','./marked.js'];const missing=[];for(const asset of assets){if(!await cache.match(asset))missing.push(asset)}say(missing.length?'Recursos ausentes do cache: '+missing.join(', '):'Recursos essenciais encontrados no cache offline.');break}
 case 'storage':{const x=await navigator.storage?.estimate();say(x?`Uso estimado: ${(x.usage/1048576).toFixed(2)} MB; cota: ${(x.quota/1048576).toFixed(0)} MB.`:'Estimativa de armazenamento indisponível.');break}
 case 'protection':say('Os dados ficam neste navegador. Limpeza dos dados do site, desinstalação ou políticas de armazenamento podem apagá-los. Use Bibliotecas → Guardar diariamente.');break;
 case 'persist':{const ok=await navigator.storage?.persist?.();say(ok?'Persistência concedida pelo navegador.':'Persistência não concedida ou indisponível. Faça backups regulares.');break}
 case 'projects':say(`${libraries.length} bibliotecas e ${records.length} documentos registrados. Biblioteca ativa: ${libraries.find(x=>x.id===activeLibraryId)?.name||'Geral'}.`);break;
 case 'backup':$('#backupInput').click();say('Selecione um arquivo JSON de backup para verificar e restaurar, mediante confirmação.');break;
 case 'cache':if(confirm('Limpar somente caches estáticos do MD Reader? Os documentos locais serão preservados.')){const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('md-reader-static-')).map(k=>caches.delete(k)));say('Cache estático removido. Recarregue online para reconstruí-lo.')}break;
 case 'repair':{const r=await navigator.serviceWorker?.getRegistration();await r?.update();const c=await caches.open('md-reader-static-v13');await c.addAll(['./','./index.html','./style.css','./app.js','./marked.js','./highlight.min.js']);say('Recursos essenciais baixados novamente. Requer conexão com a internet.');break}
 case 'defaults':if(confirm('Restaurar somente as preferências padrão? Documentos e bibliotecas serão mantidos.')){prefs={...defaults};savePrefs();applyPrefs();syncQuickActions();say('Preferências restauradas.')}break;
 }}catch(e){console.error(e);say('Operação não concluída: '+e.message)}
}

function bind(){[['#openFileBtn',requestFile],['#openDrawerFile',requestFile],['#exampleBtn',()=>openContent('Exemplo do MD Reader.md',example,'example')],['#exampleDrawerBtn',()=>openContent('Exemplo do MD Reader.md',example,'example')],['#openUrlBtn',()=>$('#urlDialog').showModal()],['#urlDrawerBtn',()=>{closeDrawer();$('#urlDialog').showModal()}],['#menuBtn',()=>els.drawer.classList.contains('open')?closeDrawer():openDrawer()],['#closeDrawer',closeDrawer],['#drawerSearchBtn',()=>{closeDrawer();togglePanel('search')}],['#drawerFocusBtn',()=>focusMode(true)],['#aboutBtn',()=>{closeDrawer();$('#aboutDialog').showModal()}],['#closeAbout',()=>$('#aboutDialog').close()],['#searchBtn',()=>togglePanel('search')],['#appearanceBtn',()=>{if(activeView==='document'){ensureAppearanceFloating();$('#settingsTitle').hidden=false;els.appearance.classList.add('compact-reading-panel');togglePanel('appearance')}else showPreferences()}],['#settingsBtn',()=>{closeDrawer();if(activeView==='document'){ensureAppearanceFloating();$('#settingsTitle').hidden=false;els.appearance.classList.add('compact-reading-panel');els.search.hidden=true;els.appearance.hidden=false;$('#paletteSelect').focus()}else showPreferences()}],['#closeSearch',()=>els.search.hidden=true],['#closeAppearance',()=>els.appearance.hidden=true],['#prevMatch',()=>navigateMatch(matchIndex-1)],['#nextMatch',()=>navigateMatch(matchIndex+1)],['#focusBtn',()=>focusMode(!document.body.classList.contains('focus-mode'))],['#exitFocus',()=>focusMode(false)],['#favoriteBtn',()=>toggleFavorite(currentId)],['#themeQuickBtn',()=>{prefs.theme=prefs.theme==='dark'?'light':'dark';applyPrefs();savePrefs();syncQuickActions()}],['#fullscreenBtn',toggleFullscreen],['#backToTop',()=>prefs.readingMode==='page'?goPage(0):window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})],['#readingModeBtn',()=>setReadingMode(prefs.readingMode==='page'?'scroll':'page')],['#bookmarkBtn',markSelection],['#drawerBookmarkBtn',()=>{closeDrawer();markSelection()}],['#drawerPageBtn',()=>{closeDrawer();setReadingMode(prefs.readingMode==='page'?'scroll':'page')}],['#goBookmark',goBookmark],['#prevPage',()=>goPage(pageIndex-1)],['#nextPage',()=>goPage(pageIndex+1)],['#libraryMenuBtn',openLibrary],['#librariesMenuBtn',showLibraries],['#newLibraryBtn',createLibrary],['#marksMenuBtn',showMarks],['#markFromPage',()=>{if(currentId)showDocument(records.find(r=>r.id===currentId));else toast('Abra um documento para marcar.')}],['#backupBtn',guardar],['#restoreBtn',()=>$('#backupInput').click()],['#refreshBtn',atualizar],['#saveCurrentFile',saveCurrentFile],['#openSystemFile',openSystemFile],['#copySelected',copySelected],['#libraryAdd',requestFile],['#clearHistory',clearHistory],['#printBtn',()=>{closeDrawer();if(!currentId){toast('Abra um documento para imprimir.');return}clearMatches();window.print()}],['#cancelUrl',()=>$('#urlDialog').close()]].forEach(([s,fn])=>{const el=$(s);if(el)el.addEventListener('click',fn);else console.warn('Controle ausente:',s)});$('#newLibraryMenu').onclick=createLibrary;
$('#librariesQuickBtn').onclick=showLibraries;$('#backToLibraries').onclick=showLibraries;
$('#preferencesMenu').onclick=showPreferences;
$('#maintenanceMenu').onclick=showMaintenance;
$('#githubMenu').onclick=()=>showInfo('github');
$('#manualMenu').onclick=()=>showInfo('manual');
$('#infoClose').onclick=()=>$('#infoDialog').close();
$('#backupBtn').onclick=()=>dailyBackup(false);
$('#refreshBtn').onclick=()=>dailyBackup(true);
$$('[data-maint]').forEach(b=>b.onclick=()=>maintenanceAction(b.dataset.maint));
els.scrim.onclick=closeDrawer;$('#backupInput').onchange=e=>restoreBackup(e.target.files[0]);document.addEventListener('selectionchange',captureSelection);els.file.onchange=e=>handleFile(e.target.files[0]);$('#urlForm').onsubmit=e=>{e.preventDefault();loadUrl($('#urlInput').value.trim())};$('#searchInput').oninput=e=>searchText(e.target.value);$('#searchInput').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();navigateMatch(matchIndex+(e.shiftKey?-1:1))}};$('#fontFamily').onchange=e=>{prefs.fontFamily=e.target.value;applyPrefs();savePrefs();configureReadingMode(true)};$('#paletteSelect').onchange=e=>{prefs.palette=e.target.value;applyPrefs();savePrefs()};$$('[data-set-theme]').forEach(b=>b.onclick=()=>{prefs.theme=b.dataset.setTheme;applyPrefs();savePrefs();syncQuickActions()});[['#fontSize','fontSize'],['#lineHeight','lineHeight'],['#readWidth','readWidth']].forEach(([s,key])=>$(s).oninput=e=>{prefs[key]=Number(e.target.value);applyPrefs();savePrefs();configureReadingMode(true)});$$('[data-reading-mode]').forEach(b=>b.onclick=()=>setReadingMode(b.dataset.readingMode));$('#librarySearch').addEventListener('input',renderLibrary);$('#librarySort').addEventListener('change',renderLibrary);
$$('[data-library-filter]').forEach(b=>b.addEventListener('click',()=>{libraryFilter=b.dataset.libraryFilter;$$('[data-library-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));renderLibrary()}));
const dz=$('#dropZone');dz.onclick=requestFile;dz.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();requestFile()}};['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('dragging')}));['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('dragging')}));dz.addEventListener('drop',e=>handleFile(e.dataTransfer.files[0]));document.addEventListener('dragover',e=>e.preventDefault());document.addEventListener('drop',e=>{if(!dz.contains(e.target)){e.preventDefault();handleFile(e.dataTransfer.files[0])}});document.addEventListener('keydown',e=>{if(prefs.readingMode==='page'&&currentId&&!libraryVisible&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!document.querySelector('dialog[open]')&&!els.drawer.classList.contains('open')){if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();goPage(pageIndex+1)}else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();goPage(pageIndex-1)}}if(e.key==='Escape'){if(els.drawer.classList.contains('open'))closeDrawer();else if(document.body.classList.contains('focus-mode'))focusMode(false);else{els.search.hidden=true;els.appearance.hidden=true}}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='f'&&currentId&&!libraryVisible){e.preventDefault();els.search.hidden=false;els.appearance.hidden=true;$('#searchInput').focus()}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='o'){e.preventDefault();requestFile()}if(e.key==='Tab'&&els.drawer.classList.contains('open')){const focusable=[...els.drawer.querySelectorAll('button,a[href]')].filter(n=>n.getClientRects().length);const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});let touchX=0,touchY=0;document.addEventListener('touchstart',e=>{touchX=e.touches[0].clientX;touchY=e.touches[0].clientY},{passive:true});document.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-touchX,dy=e.changedTouches[0].clientY-touchY;if(prefs.readingMode==='page'&&currentId&&!libraryVisible&&Math.abs(dx)>65&&Math.abs(dy)<60&&touchX>35){goPage(pageIndex+(dx<0?1:-1));return}if(Math.abs(dx)>85&&Math.abs(dy)<60){if(dx>0&&touchX<35&&!document.body.classList.contains('focus-mode'))openDrawer();else if(dx<0&&els.drawer.classList.contains('open'))closeDrawer()}},{passive:true});window.addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(saveScroll,400);updateTocActive();$('#backToTop').hidden=prefs.readingMode==='page'||scrollY<450||!currentId||libraryVisible||document.body.classList.contains('focus-mode');if(innerWidth<=600&&!document.body.classList.contains('focus-mode')){const y=scrollY;$('#topbar').classList.toggle('hidden-on-scroll',y>110&&y>lastScroll+4);if(y<lastScroll-4)$('#topbar').classList.remove('hidden-on-scroll');lastScroll=y}},{passive:true});window.addEventListener('pagehide',saveScroll);window.addEventListener('resize',()=>{clearTimeout(pageResizeTimer);pageResizeTimer=setTimeout(()=>{if(prefs.readingMode==='page'&&currentId&&!libraryVisible)configureReadingMode(true)},180)});document.addEventListener('fullscreenchange',syncQuickActions)}
async function init(){prefs={...defaults,...storageGet('mdr-prefs-v1',{})};const savedLibraries=storageGet('mdr-libraries-v11',null);if(savedLibraries?.libraries?.length){libraries=savedLibraries.libraries;activeLibraryId=savedLibraries.activeLibraryId||'default'}installFileHandling();if(!['light','dark'].includes(prefs.theme))prefs.theme='light';if(!['original','primavera','verao','outono','inverno'].includes(prefs.palette))prefs.palette='original';if(!['sans','serif','mono','transitional','slab','humanist','geometric'].includes(prefs.fontFamily))prefs.fontFamily='sans';if(!['page','scroll'].includes(prefs.readingMode))prefs.readingMode='scroll';applyPrefs();bind();syncQuickActions();try{db=await dbOpen();await refreshRecords()}catch(e){console.error(e);toast('Armazenamento local indisponível. O leitor ainda pode abrir arquivos.')}if(db&&!records.some(r=>(r.libraryId||'default')==='default'&&r.id==='example:md-reader-welcome')){
 try{await tx('readwrite',store=>store.put({id:'example:md-reader-welcome',name:'Bem-vindo ao MD Reader.md',source:'example',libraryId:'default',content:example,opened:Date.now(),favorite:false,marks:[],scroll:0,readPage:0}));await refreshRecords()}catch(e){console.warn('Não foi possível adicionar o exemplo:',e)}
 }const last=storageGet('mdr-last-v1',null);if(last&&records.some(r=>r.id===last))await openSaved(last);else {setView('emptyState','MD Reader');renderLists()}setTimeout(()=>{$('#splash').classList.add('dismiss');setTimeout(()=>$('#splash').remove(),400)},4000);if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(e=>console.warn('PWA indisponível:',e));}
const origShow=showDocument;showDocument=function(rec,restore){origShow(rec,restore);try{localStorage.setItem('mdr-last-v1',JSON.stringify(rec.id))}catch{}};
init().catch(e=>{console.error('Falha ao iniciar MD Reader:',e);const splash=document.querySelector('#splash');if(splash){splash.classList.add('dismiss');setTimeout(()=>splash.remove(),400)}const empty=document.querySelector('#emptyState');if(empty)empty.hidden=false;const notice=document.querySelector('#toast');if(notice){notice.textContent='Não foi possível iniciar completamente. Atualize a página.';notice.classList.add('show')}});
})();
