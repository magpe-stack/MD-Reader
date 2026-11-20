# MD Reader v11

Leitor Markdown PWA offline-first, sem login e sem backend.

## Novidades

- **Leitura → Marcadores**: página com trechos selecionados, posições e botões para voltar ao documento.
- **Marcar**: selecione uma palavra ou frase no texto e clique no ícone de marcador. Sem seleção, registra a posição.
- **Biblioteca → Minhas Bibliotecas**: crie coleções temáticas. Cada livro pode ser movido pela lista suspensa em seu cartão.
- **Biblioteca → Guardar**: exporta backup JSON com documentos, URLs carregadas, bibliotecas, favoritos, marcadores e preferências.
- **Biblioteca → Restaurar**: importa backup JSON do MD Reader.
- **Biblioteca → Atualizar**: recarrega a URL do documento atual. Arquivos locais devem ser selecionados novamente por restrições do navegador.
- **Arquivo → Sistema**: tenta usar File System Access API; se indisponível, usa o seletor convencional.
- **Arquivo → Salvar**: salva o conteúdo Markdown em arquivo, usando File System Access API quando disponível ou download.
- **Arquivo → Copiar**: copia a seleção ou, se não houver seleção, o Markdown do documento.

## Compatibilidade e limites

O manifesto registra associação a arquivos Markdown, mas a abertura direta pelo explorador depende do navegador e do sistema operacional (em geral PWAs instalados em Chromium desktop). Não é possível garantir duplo clique em todos os sistemas. As APIs de arquivos e área de transferência dependem de HTTPS, permissões e suporte do navegador.

Os marcadores usam deslocamentos no texto renderizado e são restaurados quando o conteúdo não mudou. Se o documento for editado ou atualizado, alguns marcadores podem deixar de corresponder exatamente ao trecho original. O texto citado continua no backup e na página Marcadores.

A opção **Guardar** produz um arquivo JSON no dispositivo; não envia dados para servidores. Mantenha cópias externas, pois o armazenamento do navegador pode ser apagado.

## Publicação

Envie todos os arquivos da raiz para o repositório GitHub Pages, sem criar subpastas. Não apague os dados do site para atualizar, pois isso apagaria a biblioteca local.
