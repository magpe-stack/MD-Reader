## Novidades da v32

- O sumário lateral agora navega para a página correta também no **Modo Página**, sem depender do comportamento padrão de âncoras.
- Marcadores de trechos tentam recuperar a passagem pelo texto exato quando os deslocamentos mudam após pequenas edições. Se houver ocorrências repetidas, priorizam a mais próxima da posição original.
- Corrigido o diagnóstico de Manutenção para verificar o cache `md-reader-core-v32` (a v31 consultava indevidamente o cache v30).
- Service Worker e recursos offline versionados para v32.
- Os resultados da Manutenção continuam dentro de seus cartões; o Splash e as preferências foram preservados.

**Limitação:** se o texto do trecho for alterado, não é possível garantir sua recuperação; o leitor informa quando não encontra correspondência.

## Novidades da v31

- Modo Página: controle deslizante para ir diretamente a qualquer página, acessível por teclado.
- Indicador de página atualizado ao navegar; atalhos Home e End quando o foco está na leitura.
- Retomada proporcional da posição de leitura ao mudar o tamanho da janela, fonte ou largura da coluna.
- Repaginação quando imagens terminam de carregar, preservando o progresso.
- Mantidos os cartões e diagnósticos de Manutenção e o Splash aprovado na v30.

# MD Reader — Manual do Usuário

**Versão 30 · PWA Markdown · Português brasileiro**

O **MD Reader** é um aplicativo de leitura de arquivos Markdown (`.md`), com bibliotecas temáticas, marcadores, preferências de leitura e funcionamento offline após o carregamento dos recursos. É gratuito, não exige cadastro e guarda documentos e configurações no navegador do dispositivo. Não é um editor de Markdown nem um serviço de sincronização em nuvem.

> **Antes de atualizar ou fazer manutenção:** crie e confira um backup externo. O IndexedDB e o armazenamento local pertencem ao navegador e podem ser perdidos se os dados do site forem apagados.

## Índice

1. [Primeiro acesso](#primeiro-acesso)
2. [Navegação e bibliotecas](#navegação-e-bibliotecas)
3. [Abrir e ler documentos](#abrir-e-ler-documentos)
4. [Marcadores e favoritos](#marcadores-e-favoritos)
5. [Preferências](#preferências)
6. [Guardar, Atualizar e Restaurar](#guardar-atualizar-e-restaurar)
7. [Manutenção](#manutenção)
8. [Instalação e integração com o sistema](#instalação-e-integração-com-o-sistema)
9. [Atalhos e acessibilidade](#atalhos-e-acessibilidade)
10. [Problemas comuns](#problemas-comuns)
11. [Privacidade, limitações e publicação](#privacidade-limitações-e-publicação)

## Primeiro acesso

Abra o MD Reader pelo endereço publicado no GitHub Pages. Na tela **Início**, você pode escolher **Abrir arquivo .md**, **Carregar URL pública** ou **Ler exemplo**. A opção **Continuar lendo** apresenta documentos recentes disponíveis neste navegador. O exemplo de boas-vindas é adicionado à biblioteca Geral quando o armazenamento está disponível.

O aplicativo usa **IndexedDB** para os documentos e parte dos metadados; bibliotecas e preferências também utilizam armazenamento local. Os dados não são compartilhados automaticamente entre dispositivos, navegadores ou perfis de usuário.

## Navegação e bibliotecas

Abra o menu lateral para acessar **Início**, **Bibliotecas**, **Marcadores**, **Sistema** e **Ajuda**. O grupo Bibliotecas contém os comandos **Criar**, **Abrir**, **Guardar**, **Atualizar** e **Restaurar**. Clicar no logotipo do cabeçalho leva à página **Minhas Bibliotecas**.

Em **Bibliotecas → Criar**, dê um nome à nova coleção. **Bibliotecas → Abrir** exibe a biblioteca ativa. A página **Minhas Bibliotecas** permite selecionar uma coleção; os documentos são mostrados em cartões. Use **+ Adicionar** para importar outro Markdown. Há pesquisa, ordenação e filtros de favoritos e leituras em andamento. O seletor de biblioteca no cartão permite mover um documento para outra coleção.

Uma biblioteca com documentos não deve ser excluída antes que os arquivos sejam movidos ou excluídos. Excluir um documento do MD Reader remove a cópia armazenada no navegador, **não** o arquivo original que está no disco.

## Abrir e ler documentos

Use **Abrir arquivo .md** ou arraste um arquivo Markdown para a área de importação. O aplicativo também aceita o carregamento por URL pública, sujeito às permissões de acesso e políticas de CORS do servidor. URLs privadas ou que exigem autenticação podem não funcionar.

O conteúdo Markdown é renderizado para leitura, com títulos, listas, tabelas, tarefas, código e notas de rodapé. O sumário lateral permite navegar entre títulos; o conjunto de ferramentas próximo à régua oferece pesquisa, favorito, marcador, aparência, formato, foco, cópia, exportação e compartilhamento. O conteúdo Markdown é tratado como entrada não confiável e passa por sanitização antes da exibição.

**Modo Rolagem:** o documento é percorrido verticalmente. **Modo Página:** o conteúdo é dividido para navegação por páginas, com botões e gestos de deslizar. A posição de leitura é lembrada quando o armazenamento funciona corretamente. A divisão pode mudar ao alterar a fonte, a largura ou o tamanho da janela.

**Salvar Markdown** exporta uma cópia do documento armazenado. Não edita o arquivo original no dispositivo. **Copiar** usa a seleção de texto quando houver; **Compartilhar** depende da API nativa do navegador, podendo oferecer alternativas.

## Marcadores e favoritos

Para marcar um trecho, selecione uma palavra ou frase e use o comando **Marcar**. Sem seleção, o aplicativo registra a posição de leitura. A página **Marcadores** agrupa os registros por biblioteca e documento e oferece acesso ao local salvo. Marcas de trecho usam deslocamentos no texto renderizado; se o conteúdo for modificado, a posição pode não coincidir com o trecho original.

O comando **Favorito** identifica documentos para localização rápida. Favoritos não substituem backups.

## Preferências

Em **Sistema → Preferências**, ajuste:

- **Temas:** paletas Original, Primavera, Verão, Outono e Inverno, com modos claro e escuro.
- **Tipografia:** famílias sans-serif, serif, mono, transitional, slab, humanist e geometric.
- **Dimensões de leitura:** tamanho da fonte, espaçamento entre linhas e largura da coluna.
- **Formato de leitura:** Rolagem ou Página.

As preferências são lembradas no navegador. O painel compacto de aparência também pode ser aberto durante a leitura.

## Guardar, Atualizar e Restaurar

Esses comandos são diferentes e **não devem ser confundidos**:

### Guardar — criar backup

Em **Bibliotecas → Guardar**, o aplicativo gera um JSON com bibliotecas, documentos, marcadores, favoritos e preferências. O nome diário segue o padrão `MD-Reader-AAAA-MM-DD.json`. Escolha uma pasta segura no dispositivo, como `GUARDAR`, e mantenha também uma cópia externa.

### Atualizar — gravar o backup do dia

Em **Bibliotecas → Atualizar**, o aplicativo tenta atualizar o backup diário existente. Quando o navegador conserva uma referência de arquivo e permite a gravação, pode solicitar permissão. Se essa referência não estiver disponível, o navegador compatível abre **Salvar como**: escolha a pasta e o mesmo nome do arquivo diário e confirme a substituição quando o sistema solicitar.

**Importante:** o aplicativo não consegue escolher silenciosamente uma pasta do Windows nem garantir que o navegador retenha permissões entre sessões. Em navegadores sem a API de gravação, pode ser necessário baixar uma nova cópia e substituir o backup manualmente. Verifique a data e o conteúdo do arquivo salvo.

### Restaurar — importar backup

Em **Bibliotecas → Restaurar**, selecione um JSON de backup do MD Reader e confira a confirmação apresentada. A restauração pode substituir os dados locais atuais. Antes de restaurar, faça um backup do estado atual para poder voltar atrás.

### Verificar backup sem restaurar

Em **Sistema → Manutenção → Verificar backup JSON**, selecione o arquivo para conferir seu formato e consistência estrutural **sem importar nem substituir** os dados do aplicativo. A verificação estrutural não é uma garantia criptográfica de integridade ou de recuperação completa: teste restaurações em ambiente separado quando os dados forem importantes.

## Manutenção

A página **Sistema → Manutenção** usa cartões; o resultado de cada ação aparece **dentro do respectivo cartão**. Os comandos são:

| Cartão | O que faz |
| --- | --- |
| Instalar aplicativo | Abre o convite nativo, quando disponível, ou apresenta instruções. |
| Desinstalar — instruções | Explica como remover o PWA pelo navegador ou sistema. |
| Verificar atualizações | Solicita ao Service Worker uma verificação de versão. |
| Diagnóstico | Exibe informações sobre versão, HTTPS, IndexedDB, Service Worker, cache, persistência e documentos. |
| Integração com Windows e Android | Verifica suporte a seletores de arquivo, compartilhamento e abertura pelo sistema. |
| Barra de título integrada | Verifica a disponibilidade do Window Controls Overlay. |
| Verificar disponibilidade offline | Confere recursos essenciais presentes no cache. |
| Armazenamento | Exibe uso e cota aproximados, conforme o navegador. |
| Proteção do armazenamento | Explica riscos de perda de dados locais. |
| Solicitar persistência | Pede ao navegador proteção adicional contra remoção automática, quando suportada. |
| Verificar bibliotecas | Audita IDs, nomes, conteúdo e vínculos, sem alterar registros. |
| Verificar backup JSON | Examina um arquivo JSON sem restaurá-lo. |
| Limpar cache do aplicativo | Exclui caches estáticos, **não** os documentos do IndexedDB; requer conexão para reconstrução. |
| Reparar arquivos do aplicativo | Solicita novamente recursos essenciais para o cache, com conexão. |
| Restaurar configurações padrão | Redefine preferências de leitura, mantendo bibliotecas e documentos. |

**Cuidado:** limpar o cache offline não equivale a limpar os dados do site. Nunca use a opção do navegador **Limpar dados do site** como método de atualização: isso pode apagar documentos, bibliotecas e permissões de arquivo.

## Instalação e integração com o sistema

O MD Reader é um PWA. No Edge ou Chrome compatível, procure **Instalar aplicativo** no navegador ou use o cartão correspondente em Manutenção. No Android, a instalação depende do navegador; no iPhone/iPad, use **Compartilhar → Adicionar à Tela de Início**, quando oferecido.

O manifesto declara atalhos para **Minhas Bibliotecas**, **Abrir Markdown** e **Marcadores**, além de associação de arquivos Markdown em plataformas compatíveis. A presença dessas declarações não garante que o sistema operacional permita abrir `.md` com duplo clique. A **barra de título integrada** só funciona quando o aplicativo instalado e o navegador suportam Window Controls Overlay; caso contrário, a janela tradicional é preservada.

## Atalhos e acessibilidade

- `Ctrl+O` (ou `⌘+O`): abrir arquivo.
- `Ctrl+F` (ou `⌘+F`): pesquisar no documento aberto.
- **Modo Página:** setas esquerda/direita ou Page Up/Page Down, quando o foco não estiver em um controle interativo.
- `Esc`: fechar menu ou painel, ou sair do modo foco, conforme o contexto.
- `Tab` e `Shift+Tab`: navegar pelos controles. O menu lateral retém o foco enquanto está aberto.

O aplicativo inclui rótulos acessíveis, indicação de foco, navegação por títulos, suporte a telas pequenas e regras de movimento reduzido. A presença desses recursos não constitui certificação formal WCAG 2.1; testes com leitores de tela e dispositivos reais continuam recomendados.

## Problemas comuns

### Atualizar abre uma janela diferente da esperada

O comando deve tentar gravar o arquivo diário; sem referência persistente, pode abrir **Salvar como**. Escolha a pasta `GUARDAR`, informe o nome existente e confirme a substituição. Se surgir uma janela **Abrir**, confirme que a versão publicada e o Service Worker são os atuais em **Manutenção → Diagnóstico**. Não sobrescreva outro JSON por engano.

### Meu backup não aparece na pasta

Confira a pasta correta, a extensão `.json` e os filtros do seletor. O Windows pode associar `.json` a outro aplicativo, sem alterar o conteúdo do arquivo. Não renomeie para `.md`.

### O aplicativo continua na versão antiga

Com conexão ativa, abra **Manutenção → Verificar atualizações** e recarregue. Confira a versão no **Diagnóstico**. Em caso de falha persistente, faça backup e use **Reparar arquivos do aplicativo**. Evite limpar os dados do site.

### O documento não abre offline

Abra o MD Reader online pelo menos uma vez para armazenar os recursos essenciais. Documentos já importados podem estar no IndexedDB; URLs remotas precisam de rede se ainda não foram importadas. Use **Verificar disponibilidade offline** e teste com a conexão desligada.

### O navegador não permite instalar ou compartilhar

A API pode não existir na plataforma, ou o aplicativo pode não estar instalado em contexto seguro. Utilize os comandos alternativos de abertura, cópia ou download. A associação nativa de arquivos é opcional.

### A biblioteca está vazia após mudar de navegador

Os dados não são sincronizados. Volte ao navegador/perfil original e exporte um backup; em seguida, restaure-o no novo ambiente.

### Os marcadores apontam para outra posição

Alterações no conteúdo, na tipografia ou na paginação podem mudar a localização. Consulte o trecho salvo na página Marcadores.

## Privacidade, limitações e publicação

O MD Reader não exige conta nem possui servidor próprio de documentos. A abertura de URLs públicas faz requisições à origem informada. O conteúdo importado é armazenado localmente e poderá ser perdido por limpeza de dados, troca de dispositivo, falha do navegador ou políticas de armazenamento.

Para publicar no GitHub Pages, envie **todos os arquivos do ZIP diretamente para a raiz do repositório**: `index.html`, `style.css`, `app.js`, `manifest.json`, `sw.js`, bibliotecas JavaScript, ícones e este `README.md`. Não altere os nomes dos arquivos sem atualizar suas referências. Use HTTPS, recarregue após a publicação e confira **Sistema → Manutenção → Diagnóstico**.

**Versão 30:** estabilização do diagnóstico de instalação, revisão de navegação por teclado, contenção de conteúdo largo, cache versionado e manual completo. Nenhuma atualização de versão substitui a necessidade de testar o backup e a restauração com dados de teste.
