# MD Reader — Manual Completo do Usuário

**Um guia para descobrir, organizar e aproveitar a leitura de documentos Markdown**

O MD Reader é um leitor de documentos digitais criado para transformar arquivos de texto Markdown em páginas agradáveis de ler. Ele permite reunir documentos em bibliotecas, continuar leituras interrompidas, guardar passagens importantes, pesquisar palavras, escolher a aparência do texto e manter cópias de segurança. Tudo isso por meio de uma interface que pode ser utilizada no computador ou no celular.

Este manual foi escrito para quem está conhecendo o aplicativo pela primeira vez. Não é necessário saber programar, conhecer linguagens de marcação ou ter experiência com aplicativos de leitura. Cada função será explicada desde o princípio, com exemplos, orientações práticas, cuidados e soluções para dificuldades comuns.

> **A orientação mais importante deste manual:** os documentos importados são armazenados no navegador utilizado. Para não depender exclusivamente desse armazenamento, faça backups regularmente e conserve uma cópia em outro local.

---

## Índice

1. [Conhecendo o MD Reader](#1-conhecendo-o-md-reader)
2. [O que é Markdown](#2-o-que-é-markdown)
3. [Primeiro acesso](#3-primeiro-acesso)
4. [Entendendo a interface](#4-entendendo-a-interface)
5. [Como abrir documentos](#5-como-abrir-documentos)
6. [Organizando bibliotecas](#6-organizando-bibliotecas)
7. [Lendo documentos](#7-lendo-documentos)
8. [Modo Rolagem](#8-modo-rolagem)
9. [Modo Página](#9-modo-página)
10. [Pesquisa e navegação por títulos](#10-pesquisa-e-navegação-por-títulos)
11. [Marcadores e favoritos](#11-marcadores-e-favoritos)
12. [Preferências e personalização](#12-preferências-e-personalização)
13. [Foco e tela cheia](#13-foco-e-tela-cheia)
14. [Copiar, salvar e compartilhar](#14-copiar-salvar-e-compartilhar)
15. [Guardar, Atualizar e Restaurar](#15-guardar-atualizar-e-restaurar)
16. [Instalação e funcionamento offline](#16-instalação-e-funcionamento-offline)
17. [Ferramentas de Manutenção](#17-ferramentas-de-manutenção)
18. [Atalhos de teclado](#18-atalhos-de-teclado)
19. [Acessibilidade e conforto](#19-acessibilidade-e-conforto)
20. [Solução de problemas](#20-solução-de-problemas)
21. [Privacidade e segurança dos dados](#21-privacidade-e-segurança-dos-dados)
22. [Boas práticas de uso](#22-boas-práticas-de-uso)
23. [Glossário](#23-glossário)
24. [Perguntas frequentes](#24-perguntas-frequentes)
25. [Roteiro de aprendizado](#25-roteiro-de-aprendizado)

---

## 1. Conhecendo o MD Reader

Imagine uma estante de livros. Nela, você guarda romances, artigos, anotações, manuais e outros textos. Quando deseja ler alguma coisa, procura o documento, abre na página em que parou e continua a leitura. O MD Reader funciona de maneira semelhante, mas a estante está dentro do navegador do seu dispositivo.

Seu objetivo principal é **ler**, e não escrever ou editar documentos. O aplicativo recebe textos Markdown e apresenta seu conteúdo de forma organizada, respeitando títulos, subtítulos, parágrafos, listas, tabelas e outros elementos. Assim, um arquivo que parece simples quando aberto em um editor de texto pode ganhar uma apresentação semelhante à de um livro ou artigo digital.

O MD Reader oferece recursos especialmente úteis para pessoas que trabalham com textos longos. Você pode criar coleções temáticas, localizar palavras, usar títulos como pontos de navegação, marcar trechos interessantes e adaptar a tipografia ao seu conforto. Também é possível escolher entre leitura contínua e leitura dividida em páginas.

O aplicativo é uma **PWA**, sigla de *Progressive Web App*. Em termos simples, trata-se de um site preparado para funcionar de modo semelhante a um aplicativo instalado. Dependendo do navegador e do sistema operacional, você poderá colocá-lo na tela inicial ou na lista de aplicativos, abrir sua própria janela e utilizar os documentos armazenados mesmo sem conexão com a internet.

O MD Reader não exige que você crie uma conta. Não há um serviço de sincronização automática entre dispositivos. Essa simplicidade tem uma consequência importante: **a responsabilidade por manter cópias de segurança é do usuário**.

### O que o MD Reader faz

Ele abre arquivos Markdown, organiza documentos em bibliotecas, guarda o progresso de leitura, oferece pesquisa e marcadores, permite alterar a aparência da página, exporta documentos e disponibiliza ferramentas de diagnóstico e backup.

### O que o MD Reader não faz

Ele não substitui um editor de textos, não corrige automaticamente o conteúdo de um documento, não transforma qualquer página da internet em Markdown e não sincroniza bibliotecas com uma conta na nuvem. Também não garante que arquivos armazenados apenas no navegador sobrevivam à limpeza dos dados do site ou à troca do aparelho.

Compreender essa diferença ajuda a utilizar o aplicativo com segurança e expectativas adequadas.

## 2. O que é Markdown

Markdown é uma maneira simples de organizar textos utilizando sinais comuns do teclado. Seu nome costuma aparecer abreviado como **MD**, e os arquivos geralmente terminam com a extensão `.md`.

Talvez você já tenha encontrado um arquivo chamado `README.md` em um projeto de software. O termo *README* significa, aproximadamente, “leia-me”. Esses arquivos costumam conter instruções, explicações e documentação. O formato Markdown também é muito usado em livros, artigos, diários, notas de estudo e documentação técnica.

A principal característica do Markdown é separar o conteúdo de sua apresentação. Em vez de escolher manualmente o tamanho de cada título ou desenhar uma lista com o mouse, a pessoa escreve pequenos símbolos que indicam a estrutura do texto.

Veja um exemplo:

```markdown
# Minha viagem

Hoje comecei a escrever meu diário.

## Lugares visitados

- Museu
- Biblioteca
- Jardim

**Este foi um dia especial.**
```

Quando aberto em um leitor Markdown, esse conteúdo aparece com um título principal, um subtítulo, uma lista e uma frase em destaque. Os sinais `#`, `-` e `**` são interpretados como instruções de formatação.

### Elementos que você poderá encontrar

**Títulos:** organizam o assunto em partes. Um documento pode ter um título principal, capítulos e subseções.

**Parágrafos:** são os blocos normais de texto, semelhantes aos de um livro.

**Negrito e itálico:** destacam palavras ou expressões.

**Listas:** apresentam itens com marcadores ou números.

**Links:** são endereços que podem levar a outras páginas ou documentos.

**Imagens:** aparecem dentro do texto quando suas referências estão disponíveis e podem ser carregadas.

**Tabelas:** organizam informações em linhas e colunas.

**Blocos de código:** mostram comandos ou trechos de programação em uma apresentação diferenciada.

**Listas de tarefas:** podem apresentar caixas marcadas ou desmarcadas, conforme o conteúdo do documento.

**Notas de rodapé:** acrescentam explicações complementares, quando o documento utiliza uma sintaxe reconhecida pelo leitor.

Você não precisa memorizar os símbolos. O MD Reader interpreta o arquivo e apresenta o resultado para leitura. Caso queira aprender a escrever Markdown, poderá fazê-lo depois, utilizando um editor apropriado.

### Markdown não é a mesma coisa que PDF

Um PDF procura conservar uma apresentação fixa, com páginas e posições determinadas. Já o Markdown é mais flexível: o texto se adapta à largura da tela, à fonte escolhida e ao tamanho das letras. Isso explica por que um mesmo documento pode ocupar quantidades diferentes de páginas no computador e no celular.

## 3. Primeiro acesso

Abra o endereço do MD Reader em um navegador compatível. Você encontrará a tela inicial, com o nome do aplicativo, uma apresentação breve e opções para começar.

Os comandos mais importantes nesse momento são **Abrir arquivo .md**, **Carregar URL pública** e **Ler exemplo**.

Se você nunca utilizou Markdown, comece por **Ler exemplo**. Essa opção permite experimentar a interface sem precisar procurar um arquivo no computador. Observe como os títulos, os parágrafos e os demais elementos aparecem na área de leitura.

Em seguida, experimente o menu principal, acessado pelo ícone de três linhas no cabeçalho. Ele reúne as páginas de organização, preferências, manutenção e ajuda.

A seção **Continuar lendo**, quando há documentos disponíveis, permite retomar materiais já utilizados. O conteúdo exibido depende do que está armazenado naquele navegador e perfil.

### Um primeiro exercício

Abra o exemplo, role a página, procure um título, altere o tamanho da fonte e retorne à tela inicial. Depois, abra novamente o documento. Esse pequeno exercício apresenta os fundamentos da navegação sem envolver arquivos pessoais importantes.

### O que significa salvar no navegador

Ao importar um documento, o MD Reader mantém uma cópia local para uso posterior. Essa cópia não equivale a uma sincronização na internet. Se você abrir o aplicativo em outro computador, outro navegador ou outro perfil, a biblioteca poderá estar vazia.

O arquivo original, guardado no disco ou em outra pasta, continua independente da cópia do MD Reader.

## 4. Entendendo a interface

A interface foi organizada para que a maior parte da tela seja dedicada à leitura. Há um cabeçalho, uma área central e controles que aparecem conforme a atividade.

### Cabeçalho

Na parte superior, o botão de menu abre a navegação principal. O nome do aplicativo identifica a interface, e o título do documento informa o que está aberto. Há também atalhos para bibliotecas, pesquisa, favoritos, modo de leitura, marcadores, tema, foco, tela cheia e aparência.

Alguns controles podem estar desativados quando nenhum documento está aberto. Isso é normal: não é possível marcar um trecho ou favoritar um texto inexistente.

### Menu principal

O menu contém **Início**, **Bibliotecas**, **Marcadores**, **Sistema** e **Ajuda**.

O grupo **Bibliotecas** reúne **Criar**, **Abrir**, **Guardar**, **Atualizar** e **Restaurar**. Esses comandos tratam da organização dos documentos e de suas cópias de segurança.

O grupo **Sistema** contém **Preferências** e **Manutenção**. É nele que você personaliza a experiência e verifica o funcionamento do aplicativo.

O grupo **Ajuda** oferece **Sobre**, **GitHub**, **Manual** e **Atalhos**. A página de atalhos é especialmente útil para quem prefere utilizar o teclado.

Os grupos do menu podem ser expandidos e recolhidos. Se uma opção não estiver visível, toque ou clique no título do grupo correspondente.

### Área central

A área central muda conforme a página escolhida. Ela pode mostrar a tela inicial, as bibliotecas, uma coleção específica, os marcadores, as preferências, a manutenção ou o próprio documento.

Durante a leitura, controles auxiliares podem aparecer perto do texto. Não é necessário compreender todos imediatamente. Comece pelas funções básicas e explore os demais recursos aos poucos.

## 5. Como abrir documentos

Há três maneiras principais de começar uma leitura: selecionar um arquivo do dispositivo, arrastar um arquivo para o aplicativo ou carregar um endereço público.

### Abrir um arquivo do dispositivo

Na tela inicial, clique em **Abrir arquivo .md**. O navegador apresentará uma janela para escolher um arquivo. Procure a pasta em que ele está salvo, selecione o documento e confirme.

Os arquivos mais comuns têm nomes como `anotacoes.md`, `manual.md` ou `capitulo-01.markdown`. O seletor também pode aceitar outras extensões associadas ao Markdown, conforme o navegador.

Depois da importação, o MD Reader apresenta o conteúdo e o mantém em seu armazenamento local, quando esse recurso está disponível.

Se você não sabe onde encontrar um arquivo `.md`, utilize inicialmente **Ler exemplo**. Outra possibilidade é criar um pequeno arquivo de teste em um editor de texto, salvar com a extensão `.md` e importá-lo.

### Arrastar e soltar

Em computadores, a tela inicial possui uma área para receber arquivos. Abra a pasta que contém o documento, clique no arquivo, mantenha o botão do mouse pressionado e arraste-o até essa área. Solte para iniciar a importação.

Se esse gesto não funcionar, utilize o botão **Abrir arquivo .md**. O recurso de arrastar depende das condições do navegador e do sistema.

### Carregar URL pública

A opção **Carregar URL pública** permite informar o endereço de um arquivo Markdown disponível na internet. Um endereço de exemplo seria:

`https://exemplo.com/documentos/manual.md`

O endereço precisa usar HTTPS e permitir que o navegador acesse o arquivo. Alguns servidores bloqueiam esse tipo de leitura por meio de uma política chamada **CORS**. Isso não significa necessariamente que o endereço esteja errado; pode ser uma restrição do servidor.

Páginas que exigem login, endereços internos e arquivos que não são disponibilizados diretamente podem não funcionar.

Quando o carregamento é bem-sucedido, o conteúdo pode ser guardado localmente para leituras posteriores. A atualização do arquivo remoto não deve ser confundida com sincronização automática: uma cópia importada pode continuar mostrando o conteúdo que foi salvo anteriormente.

### Atenção aos documentos originais

Importar um arquivo não apaga o original. Da mesma forma, excluir a cópia da biblioteca do MD Reader não significa excluir o arquivo que permanece na pasta do computador.

## 6. Organizando bibliotecas

Uma biblioteca é uma coleção de documentos. Pense nela como uma pasta temática dentro do aplicativo.

Você pode criar uma biblioteca chamada **Literatura**, outra chamada **Estudos** e uma terceira chamada **Manuais**. Cada uma terá seus próprios documentos. Essa separação facilita encontrar materiais sem misturar assuntos diferentes.

### Criar uma biblioteca

Abra **Bibliotecas → Criar** ou acesse **Minhas Bibliotecas** e utilize **+ Nova**. Informe um nome claro, que represente o conteúdo que pretende guardar.

Prefira nomes como “Crônicas”, “Pesquisa histórica” ou “Documentação de projetos”. Nomes descritivos são mais úteis do que títulos genéricos, especialmente quando a quantidade de coleções aumenta.

### Abrir uma biblioteca

Em **Minhas Bibliotecas**, selecione a coleção desejada. O aplicativo mostrará seus documentos em cartões. Para acrescentar um novo arquivo, use **+ Adicionar**.

O botão **‹ Minhas Bibliotecas** retorna à visão geral das coleções.

### Localizar um documento

Dentro de uma biblioteca, existe o campo **Buscar na biblioteca**. Ele permite procurar documentos pelo título ou pelo conteúdo, conforme a indexação disponível no aplicativo.

Esse recurso é diferente da pesquisa dentro de um documento aberto. A busca da biblioteca ajuda a escolher *qual documento* você deseja ler. A busca do leitor ajuda a encontrar *uma passagem dentro do documento*.

### Ordenar documentos

O seletor **Ordenar** oferece critérios como **Mais recentes**, **Título A–Z** e **Mais antigos**. A ordenação não altera o conteúdo dos documentos; apenas muda a maneira como eles aparecem na tela.

### Filtrar documentos

Os filtros **Todos**, **Favoritos** e **Em leitura** ajudam a reduzir a lista. O filtro de favoritos mostra os documentos destacados por você. O filtro de leituras em andamento ajuda a recuperar materiais que ainda estão sendo acompanhados.

### Mover e excluir

Quando disponível no cartão do documento, o seletor de biblioteca permite transferi-lo para outra coleção. Antes de excluir uma biblioteca, confira se ela contém documentos importantes. Mova ou salve os arquivos necessários e faça backup.

A exclusão de uma cópia local não deve ser usada como método de organização sem antes verificar o que será removido.

## 7. Lendo documentos

Depois de abrir um arquivo, observe primeiro sua estrutura. O título principal costuma aparecer no início. Subtítulos dividem o conteúdo em assuntos menores. Listas, tabelas e blocos de código recebem apresentações adequadas à leitura.

O MD Reader procura preservar a hierarquia do documento, mas a qualidade da organização depende também de como o arquivo foi escrito. Um texto sem títulos continuará sendo um texto sem títulos; o aplicativo não inventa capítulos.

### Continuar uma leitura

O aplicativo registra informações de progresso quando o armazenamento local está funcionando. Ao retornar a um documento, ele pode recuperar sua posição de leitura.

Essa retomada é uma conveniência, não uma garantia absoluta. Alterações no documento, na fonte, na largura da janela ou no modo de leitura podem mudar a posição visual de um trecho.

### Ler textos extensos

Para textos longos, experimente reduzir a largura da coluna. Linhas muito extensas exigem movimentos maiores dos olhos. Uma coluna mais estreita costuma facilitar a leitura contínua.

Se o texto parecer pequeno, aumente a fonte. Se os parágrafos parecerem muito próximos, amplie o espaçamento entre linhas. Não existe uma configuração ideal para todas as pessoas.

### Elementos especiais

Tabelas largas e blocos de código podem precisar de deslocamento horizontal próprio, especialmente em telas pequenas. Imagens dependem de seus endereços e da disponibilidade dos recursos. Um documento salvo localmente pode continuar acessível offline enquanto uma imagem remota deixa de aparecer por falta de conexão.

Links externos podem abrir outras páginas e exigir internet. Tenha cuidado com endereços desconhecidos.

## 8. Modo Rolagem

O **Modo Rolagem** apresenta o documento como uma página contínua. Você avança descendo o texto, do mesmo modo que faz em um site ou artigo.

Esse formato é especialmente indicado para leitura rápida, consultas frequentes e documentos com muitas tabelas ou blocos de código.

Para ativá-lo, abra **Preferências**, localize **Formato de leitura** e escolha **Rolagem**. Também é possível alternar o formato pelo controle de modo de leitura do cabeçalho.

No computador, utilize a roda do mouse, o touchpad ou a barra de rolagem. No celular, deslize o dedo para cima ou para baixo.

### Voltar ao início

Em situações apropriadas, o leitor oferece um botão de retorno ao começo do documento. Esse comando evita a necessidade de percorrer manualmente todo o texto de volta.

### Quando escolher Rolagem

Use esse modo quando desejar acompanhar o documento de maneira contínua, comparar trechos próximos ou percorrer rapidamente diferentes seções. Ele também pode ser mais previsível quando o conteúdo contém elementos de altura variável.

## 9. Modo Página

O **Modo Página** divide o conteúdo em partes que podem ser percorridas individualmente. Ele oferece uma experiência mais próxima da leitura de um livro digital.

Para ativá-lo, utilize o controle de formato de leitura ou escolha **Página** nas preferências.

Na parte inferior da leitura, aparece uma pequena pílula com dois números separados por uma barra vertical. Por exemplo:

**`12 | 85`**

O primeiro número indica a página atual: nesse exemplo, a página 12. O segundo indica o total de páginas calculado para o documento: 85.

### Avançar e voltar

Utilize os botões de página anterior e seguinte. Em condições apropriadas, também é possível navegar pelas setas do teclado, pelas teclas Page Up e Page Down ou por gestos horizontais no celular.

Os gestos foram pensados para a área do documento. Deslizar sobre controles interativos ou determinadas áreas de código não deve ser confundido com uma intenção de mudar de página.

### Ir diretamente a outra página

Clique ou toque na pílula de numeração. Um seletor de páginas será exibido. Ajuste-o para avançar até a região desejada. Para fechá-lo, clique fora do painel ou pressione **Esc**.

Esse recurso é útil quando você sabe aproximadamente onde está a passagem procurada, mas não deseja avançar página por página.

### Por que o total de páginas pode mudar?

O total não é uma propriedade fixa do arquivo Markdown. Ele é calculado conforme o espaço disponível.

Se você aumentar o tamanho da fonte, cada página comportará menos texto. Se reduzir a largura da janela, o texto ocupará mais linhas. Imagens carregadas posteriormente também podem alterar a divisão.

Por isso, uma página 20 no computador pode corresponder a outra posição num celular. Para reencontrar passagens importantes, prefira os marcadores e os títulos, em vez de depender apenas do número da página.

## 10. Pesquisa e navegação por títulos

Em documentos extensos, procurar manualmente uma palavra pode ser cansativo. O MD Reader oferece ferramentas para chegar mais rapidamente ao trecho desejado.

### Pesquisa no documento

Com o documento aberto, utilize o botão de busca no cabeçalho ou o atalho **Ctrl + F**. Digite uma palavra ou expressão.

A pesquisa ajuda a encontrar ocorrências dentro do documento atual. Quando houver vários resultados, utilize os comandos de navegação para passar de uma ocorrência à seguinte ou voltar à anterior.

Pressionar **Enter** avança entre ocorrências; **Shift + Enter** retorna à anterior, conforme o contexto da pesquisa.

Para melhores resultados, comece com termos específicos. Procurar “biblioteca” pode encontrar muitas ocorrências, enquanto “restaurar biblioteca” tende a restringir a busca.

### Sumário ou régua de títulos

Quando o documento contém títulos reconhecíveis, o leitor pode apresentar uma navegação estruturada por eles. Pense nisso como o índice de um livro.

Em vez de percorrer dezenas de páginas até encontrar um capítulo, selecione o título correspondente. O aplicativo tentará levar a leitura à seção desejada, inclusive no Modo Página.

Se o documento não tiver títulos, o sumário poderá ser limitado ou não oferecer divisões úteis. Isso depende da estrutura do arquivo original.

### Pesquisa não substitui organização

A busca encontra palavras. O sumário revela a estrutura. Os marcadores guardam passagens escolhidas por você. Essas ferramentas são complementares e ficam mais úteis quando utilizadas juntas.

## 11. Marcadores e favoritos

Marcadores e favoritos parecem semelhantes, mas cumprem funções diferentes.

Um **favorito** destaca um documento inteiro. Um **marcador** registra um ponto específico ou um trecho dentro dele.

### Adicionar um documento aos favoritos

Abra o documento e utilize o botão de estrela no cabeçalho. Depois, na biblioteca, escolha o filtro **Favoritos** para localizar os documentos destacados.

Essa função é útil para materiais consultados frequentemente, como um manual de referência ou um texto de estudo.

### Marcar um trecho

Selecione uma palavra, frase ou passagem do documento e utilize o comando **Marcar**. O aplicativo registra a seleção para que você possa retornar a ela posteriormente.

Se não houver texto selecionado, o marcador pode representar a posição atual de leitura. Isso é útil para guardar um ponto de parada.

### Consultar marcadores

Abra **Marcadores** no menu. A página reúne os registros por documento e biblioteca, permitindo voltar aos locais salvos.

Ao guardar uma passagem, escolha trechos suficientemente distintos. Uma frase muito comum pode aparecer diversas vezes no mesmo documento, dificultando a recuperação exata após alterações.

### Limitações dos marcadores

Se o conteúdo original for alterado, a posição do trecho pode mudar. O leitor procura recuperar passagens com base nas informações salvas, mas não pode garantir a localização quando o texto foi reescrito ou removido.

Marcadores também dependem do armazenamento local. Inclua-os em seus backups.

## 12. Preferências e personalização

As preferências permitem adaptar a apresentação do texto ao seu gosto. Abra **Sistema → Preferências** ou utilize o botão de aparência durante a leitura.

### Paletas de cores

O aplicativo oferece cinco paletas: **MD Reader Original**, **MD Reader Primavera**, **MD Reader Verão**, **MD Reader Outono** e **MD Reader Inverno**.

Cada paleta reúne uma combinação visual própria. Experimente-as com o mesmo documento e escolha aquela que torna a leitura mais agradável. Não é necessário alterar a paleta para cada arquivo; a preferência pode ser lembrada no navegador.

### Claro e escuro

O modo **Claro** utiliza uma apresentação voltada a fundos luminosos. O modo **Escuro** reduz a luminosidade geral da interface.

A escolha depende do ambiente, do brilho da tela e da preferência pessoal. Um tema escuro não é obrigatoriamente melhor para todas as pessoas, assim como o claro não é sempre a melhor escolha.

### Famílias tipográficas

A família tipográfica determina o desenho das letras. O MD Reader oferece opções como **Sans-serif**, **Serif**, **Monoespaçada**, **Transicional**, **Slab serif**, **Humanista** e **Geométrica**.

Fontes serifadas apresentam pequenos acabamentos nas extremidades de certas letras. Fontes sem serifa costumam ter desenho mais simples. Fontes monoespaçadas atribuem largura semelhante aos caracteres, sendo familiares a quem lê código.

Experimente diferentes famílias em um texto longo, não apenas no título. O conforto percebido depois de alguns parágrafos é mais importante que a primeira impressão.

### Tamanho da fonte

O controle de tamanho permite aumentar ou diminuir as letras. O intervalo disponível no aplicativo vai de **14 a 26**, em passos definidos pelo controle.

Se você precisar aproximar muito o rosto da tela, aumente a fonte. Se o texto ocupar espaço demais e dificultar a visão do conjunto, reduza-a um pouco.

### Espaçamento entre linhas

Esse ajuste determina a distância vertical entre linhas de um parágrafo. O intervalo disponível vai aproximadamente de **1,4 a 2,2**.

Um espaçamento maior pode facilitar o acompanhamento da linha seguinte. Em excesso, porém, pode fragmentar a leitura. Experimente mudanças pequenas e observe o resultado.

### Largura da coluna

A largura da coluna controla o espaço horizontal destinado ao texto, dentro dos limites da tela. No aplicativo, o ajuste utiliza valores entre **540 e 1000**.

Em monitores grandes, uma coluna mais estreita evita linhas excessivamente compridas. No celular, o espaço disponível já é menor, de modo que o resultado depende das dimensões do aparelho.

### Persistência das preferências

Os ajustes são lembrados no armazenamento local. Se você limpar os dados do site ou mudar de navegador, poderá precisar configurá-los novamente ou restaurá-los de um backup compatível.

## 13. Foco e tela cheia

Duas funções ajudam a reduzir distrações, mas não são iguais.

### Modo Foco

O **Modo Foco** procura dar prioridade ao conteúdo, reduzindo elementos de interface que não são necessários naquele momento. É indicado para sessões prolongadas de leitura.

Ative-o pelo botão correspondente no cabeçalho. Para sair, utilize o controle **Sair do foco** ou pressione **Esc**, quando aplicável.

Se parecer que certos botões desapareceram, verifique se o Modo Foco está ativo antes de concluir que existe um problema.

### Tela cheia

O comando **Tela cheia** solicita ao navegador que utilize uma área maior da tela, ocultando parte da interface do próprio navegador quando a plataforma permite.

Em computadores, o comportamento pode variar conforme o navegador e o modo de instalação. No celular, alguns elementos do sistema continuam visíveis.

A tela cheia não modifica os documentos. Ela apenas muda a apresentação da janela.

### Como combinar os dois recursos

Para uma leitura concentrada, escolha a fonte e a largura da coluna, ative o Modo Foco e, se desejar, entre em tela cheia. Para consultar menus ou realizar tarefas de organização, retorne à apresentação normal.

## 14. Copiar, salvar e compartilhar

Essas funções permitem utilizar o conteúdo fora do MD Reader, mas cada uma realiza uma tarefa diferente.

### Copiar texto

O comando de cópia utiliza o texto selecionado quando existe uma seleção apropriada. Sem seleção, o comportamento depende do comando disponível no leitor.

Depois de copiar, abra outro aplicativo e utilize **Colar**. Em computadores, o atalho costuma ser **Ctrl + V**; no macOS, **⌘ + V**.

A área de transferência pode exigir permissões do navegador. Se a cópia falhar, tente selecionar o trecho manualmente e utilizar o comando padrão do sistema.

### Salvar Markdown

**Salvar Markdown** permite exportar uma cópia do documento armazenado, normalmente em formato `.md`.

Isso não significa que o arquivo original, existente em outra pasta, tenha sido editado. O MD Reader é um leitor. A exportação é uma maneira de obter uma cópia do conteúdo.

### Compartilhar

O botão **Compartilhar** utiliza recursos de compartilhamento do navegador quando estão disponíveis.

Se você selecionar um trecho, o aplicativo procura compartilhar apenas essa seleção como texto. Sem seleção, procura compartilhar o documento completo como arquivo Markdown, quando o destino aceita esse formato.

Em alguns computadores ou navegadores, o compartilhamento nativo pode não estar disponível. Nesses casos, o aplicativo pode oferecer a cópia do texto como alternativa.

### Quando o compartilhamento não funciona

O navegador pode não oferecer a função, o aplicativo de destino pode rejeitar arquivos `.md` ou a operação pode ser cancelada. Cancelar não equivale a concluir o envio.

Se precisar garantir que alguém receba o documento, utilize **Salvar Markdown** e anexe o arquivo manualmente ao aplicativo de mensagens ou e-mail de sua preferência.

## 15. Guardar, Atualizar e Restaurar

Esta é uma das partes mais importantes do manual. O MD Reader mantém dados no navegador, e o navegador não deve ser tratado como o único lugar seguro para documentos importantes.

Um **backup** é uma cópia de segurança. No MD Reader, o backup é um arquivo **JSON**, formato utilizado para registrar bibliotecas, documentos e outras informações estruturadas.

Você não precisa aprender a escrever JSON. Basta utilizar os comandos do aplicativo e guardar o arquivo em local seguro.

### Guardar: criar uma cópia de segurança

Abra **Bibliotecas → Guardar**. O aplicativo prepara um arquivo com os dados necessários ao backup. O nome diário segue o padrão:

`MD-Reader-AAAA-MM-DD.json`

As letras representam o ano, o mês e o dia. Por exemplo, um arquivo criado em determinada data poderá se chamar `MD-Reader-2027-09-10.json`.

Escolha uma pasta fácil de identificar. Uma sugestão é criar uma pasta chamada **Backups do MD Reader**.

Depois de salvar, confirme que o arquivo realmente aparece nessa pasta. Não confie apenas na mensagem exibida pelo navegador.

### Atualizar: renovar o backup existente

O comando **Atualizar** serve para gravar um estado mais recente no backup diário.

Em navegadores compatíveis, o aplicativo pode conservar uma referência ao arquivo utilizado anteriormente e solicitar permissão para gravar novamente. Quando essa referência não estiver disponível, poderá abrir uma janela **Salvar como**.

Nesse caso, localize a pasta correta, escolha o arquivo diário correspondente e confirme a substituição apenas depois de verificar o nome.

**Atenção:** substituir um backup antigo elimina o conteúdo anterior daquele arquivo. Se você deseja conservar um histórico, mantenha cópias adicionais com nomes ou pastas diferentes.

### Por que o navegador pede autorização?

Por segurança, os navegadores não permitem que um site escreva livremente em qualquer pasta do computador. O usuário precisa escolher o destino e, em determinadas situações, conceder permissão novamente.

Isso é uma proteção do sistema, não necessariamente um defeito do MD Reader.

### Restaurar: recuperar dados de um backup

Abra **Bibliotecas → Restaurar** e selecione um arquivo JSON produzido pelo MD Reader. Leia cuidadosamente as mensagens de confirmação.

A restauração pode substituir o estado atual do armazenamento local. Por isso, **antes de restaurar um backup antigo, guarde uma cópia do estado atual**.

Depois da operação, confira as bibliotecas, os documentos, os marcadores e as preferências. Não descarte o backup utilizado antes de verificar o resultado.

### Verificar backup sem restaurar

Em **Sistema → Manutenção**, existe o comando **Verificar backup JSON**. Ele examina a estrutura do arquivo sem importar seus dados para o aplicativo.

Esse é um cuidado útil antes de restaurar. Contudo, uma verificação estrutural não garante que todos os documentos serão recuperados perfeitamente. Para materiais importantes, realize também um teste de restauração em um ambiente separado.

### Uma rotina simples de segurança

Ao terminar uma sessão importante, utilize **Guardar** ou **Atualizar**, conforme sua intenção. Verifique a presença do arquivo na pasta. Periodicamente, copie-o para outro dispositivo ou serviço de armazenamento de sua escolha.

Se possível, mantenha pelo menos uma cópia que não seja substituída diariamente. Isso permite recuperar um estado anterior caso um erro passe despercebido.

## 16. Instalação e funcionamento offline

O MD Reader pode ser utilizado diretamente pelo navegador. Em ambientes compatíveis, também pode ser instalado como PWA.

### Instalar no computador

Abra o aplicativo no Edge ou Chrome. Procure a opção de instalação oferecida pelo navegador ou acesse **Sistema → Manutenção → Instalar**.

Se a instalação estiver disponível, siga as instruções exibidas. O aplicativo poderá aparecer na lista de programas ou abrir em uma janela própria.

A disponibilidade depende do navegador, do sistema operacional e das condições técnicas da página.

### Instalar no Android

Abra o MD Reader em um navegador compatível. Utilize a opção de instalação ou adição à tela inicial, quando apresentada. Depois, procure o ícone do aplicativo na tela inicial ou na lista de aplicativos.

### E no iPhone ou iPad?

O procedimento pode envolver o menu **Compartilhar** do navegador e a opção **Adicionar à Tela de Início**. As possibilidades variam conforme a versão do sistema e o navegador utilizado.

### O que significa offline?

*Offline* significa sem conexão com a internet. Depois que os recursos essenciais do aplicativo foram armazenados, o MD Reader pode funcionar sem rede e abrir documentos que já estejam guardados localmente.

Isso não significa que todo endereço remoto ficará disponível. Um arquivo ainda não importado, uma imagem externa ou um link da internet poderá exigir conexão.

### Como testar

Primeiro, abra o aplicativo com internet e importe um documento. Em seguida, utilize **Verificar disponibilidade offline** na Manutenção. Depois, desligue a conexão e tente abrir novamente o aplicativo e o documento armazenado.

Faça esse teste antes de depender do MD Reader em uma viagem ou local sem cobertura.

## 17. Ferramentas de Manutenção

A página **Sistema → Manutenção** reúne funções de diagnóstico, proteção e recuperação. Cada ferramenta aparece em seu próprio cartão, e os resultados são apresentados no cartão correspondente.

Esses comandos não precisam ser executados todos os dias. Utilize-os quando desejar verificar o estado do aplicativo ou investigar um problema.

### Instalar

Verifica a possibilidade de instalação e, quando disponível, apresenta o convite nativo. Se o navegador não oferecer essa opção, o aplicativo pode mostrar orientações.

### Desinstalar — instruções

Explica como remover o aplicativo pelo sistema ou navegador. Desinstalar não deve ser confundido com apagar dados locais: o efeito sobre os dados depende da plataforma e das opções escolhidas.

Faça backup antes de qualquer remoção.

### Verificar atualizações

Solicita uma verificação dos recursos do aplicativo. Uma atualização pode depender da conexão, do Service Worker e do recarregamento da página.

Não confunda atualização do aplicativo com atualização de um arquivo Markdown remoto.

### Diagnóstico

Apresenta informações técnicas sobre o ambiente, como recursos de armazenamento, conexão segura, cache e componentes de funcionamento.

O diagnóstico é útil quando você precisa entender por que uma função não está disponível. Não é necessário compreender cada termo técnico; observe especialmente mensagens de indisponibilidade ou erro.

### Integração com Windows e Android

Verifica recursos que permitem ao aplicativo conversar com funções nativas do sistema, como seleção de arquivos, compartilhamento e abertura de documentos.

Um recurso indisponível não significa que o leitor inteiro deixou de funcionar. Geralmente significa apenas que aquela integração não é oferecida pelo navegador ou sistema.

### Barra de título integrada

Examina a possibilidade de integrar a interface do aplicativo à barra de título da janela em ambientes compatíveis. Se a função não estiver disponível, a janela tradicional continua sendo utilizada.

### Verificar disponibilidade offline

Confere se recursos essenciais estão presentes no cache. Se a verificação indicar arquivos ausentes, conecte-se à internet e utilize a ferramenta de reparação.

### Armazenamento

Mostra estimativas de uso e capacidade disponibilizadas pelo navegador. Esses números podem ser aproximados e não representam necessariamente todo o espaço livre do computador.

### Proteção do armazenamento

Apresenta orientações sobre os riscos de perda de dados locais. Leia essas informações antes de realizar limpezas no navegador.

### Solicitar persistência

Pede ao navegador uma proteção adicional contra a remoção automática de dados locais, quando a API correspondente está disponível.

A persistência pode ser negada ou limitada pela plataforma. Mesmo quando concedida, **não substitui o backup**.

### Verificar bibliotecas

Examina a consistência de informações das coleções e dos documentos, procurando problemas de estrutura ou vínculos. É uma verificação, não uma ferramenta de recuperação garantida.

### Verificar backup JSON

Permite selecionar um backup para análise estrutural sem executar a restauração. É recomendável utilizar essa função antes de importar um arquivo antigo.

### Limpar cache do aplicativo

Remove recursos estáticos armazenados em cache. Em princípio, essa ação não é o mesmo que apagar os documentos guardados no IndexedDB.

Entretanto, o aplicativo poderá precisar de internet para baixar novamente os arquivos necessários ao funcionamento. Evite limpar o cache imediatamente antes de ficar offline.

### Reparar arquivos do aplicativo

Tenta recuperar recursos essenciais do aplicativo, utilizando a conexão com a internet. É uma opção apropriada quando a verificação offline identifica arquivos ausentes ou quando há suspeita de cache incompleto.

### Restaurar configurações padrão

Reverte preferências de apresentação para seus valores iniciais, preservando bibliotecas e documentos conforme a função prevista.

Isso é diferente de restaurar um backup. Também é diferente de limpar os dados do site pelo navegador.

## 18. Atalhos de teclado

Os atalhos ajudam quem utiliza o MD Reader no computador. No macOS, os comandos com **Ctrl** podem utilizar **⌘**, conforme indicado na página **Ajuda → Atalhos**.

| Ação | Atalho |
|---|---|
| Abrir arquivo Markdown | `Ctrl + O` |
| Buscar no documento | `Ctrl + F` |
| Próxima ocorrência da busca | `Enter` |
| Ocorrência anterior | `Shift + Enter` |
| Abrir a página de atalhos | `Ctrl + /` |
| Página seguinte no Modo Página | `→` ou `Page Down` |
| Página anterior no Modo Página | `←` ou `Page Up` |
| Primeira página | `Home` |
| Última página | `End` |
| Fechar menu ou painel, conforme o contexto | `Esc` |
| Avançar entre controles | `Tab` |
| Voltar entre controles | `Shift + Tab` |
| Acionar um botão em foco | `Enter` ou `Espaço` |

Os atalhos de paginação dependem de um documento aberto, do Modo Página ativo e de o foco não estar em um campo ou controle que utilize essas mesmas teclas.

Se um atalho não funcionar, clique primeiro na área de leitura e tente novamente. Alguns navegadores reservam determinadas combinações para suas próprias funções.

## 19. Acessibilidade e conforto

Acessibilidade significa criar condições para que mais pessoas consigam utilizar o aplicativo, incluindo quem navega pelo teclado, utiliza tecnologias assistivas ou precisa de ajustes visuais.

O MD Reader possui rótulos para controles, indicação visual de foco, navegação por teclado, suporte a diferentes tamanhos de tela e preferências de leitura.

### Navegação sem mouse

Pressione **Tab** para avançar entre controles e **Shift + Tab** para retornar. Quando um botão estiver selecionado, utilize **Enter** ou **Espaço** para acioná-lo.

Ao abrir o menu, a navegação por teclado é direcionada aos controles do próprio menu. Ao fechá-lo, o aplicativo procura devolver o foco ao elemento anterior.

### Contraste

Se o texto estiver difícil de distinguir do fundo, experimente outra paleta ou alterne entre claro e escuro. As condições de iluminação do ambiente influenciam muito a legibilidade.

### Movimento reduzido

O aplicativo contempla preferências de redução de movimento em situações compatíveis. Esse recurso pode ser útil para pessoas sensíveis a animações.

### Leitores de tela

Rótulos e estruturas semânticas podem facilitar o uso com leitores de tela. Entretanto, o comportamento depende da combinação entre navegador, sistema e tecnologia assistiva. A presença desses recursos não equivale a uma certificação formal de acessibilidade.

### Conforto durante a leitura

Faça pausas regulares, ajuste o brilho da tela e escolha uma fonte confortável. Para textos longos, prefira uma coluna que permita acompanhar as linhas sem esforço excessivo.

## 20. Solução de problemas

Esta seção reúne situações comuns e procedimentos seguros para investigá-las.

### O aplicativo não abre

Verifique a conexão, caso esteja acessando pela primeira vez. Confirme que o endereço está correto. Se a página tiver sido publicada recentemente, aguarde a atualização dos recursos e tente recarregar.

Se o problema ocorrer apenas offline, conecte-se novamente e utilize **Reparar arquivos do aplicativo**.

### O documento aparece vazio

Confirme que o arquivo contém texto e utiliza uma extensão compatível. Abra-o em um editor simples para verificar seu conteúdo original.

Se foi carregado por URL, confirme que o endereço aponta diretamente para o arquivo e não para uma página de login ou mensagem de erro.

### O arquivo não aparece na janela de seleção

Verifique a pasta, o nome e a extensão. Alguns seletores mostram apenas tipos de arquivo aceitos. Um arquivo salvo acidentalmente como `texto.md.txt` pode não aparecer como esperado.

No Windows, a ocultação das extensões conhecidas pode dificultar a identificação. Confira o nome completo nas propriedades do arquivo.

### A URL pública não carrega

O servidor pode bloquear o acesso por CORS, exigir autenticação ou não oferecer HTTPS. Experimente baixar o arquivo por um meio autorizado e importá-lo localmente.

### O texto parece desorganizado

O Markdown pode conter títulos malformados, tabelas incompletas ou sintaxes não reconhecidas. Verifique o arquivo original. O MD Reader apresenta o conteúdo recebido, mas não corrige automaticamente erros de escrita.

### O número de páginas mudou

Isso pode ocorrer após mudar a fonte, a largura da coluna, o tamanho da janela ou o dispositivo. O Modo Página calcula a divisão de acordo com o espaço disponível.

### Um marcador não encontra o trecho

O documento pode ter sido modificado. Procure uma expressão do trecho com a ferramenta de busca. Se necessário, crie um novo marcador na posição correta.

### O modo foco escondeu os controles

Utilize **Esc** ou o botão **Sair do foco**, quando exibido. O desaparecimento temporário de elementos faz parte da proposta desse modo.

### O backup não foi encontrado

Confira a pasta de destino e procure arquivos com extensão `.json`. Verifique também a pasta de downloads padrão do navegador.

### Atualizar abriu “Salvar como”

Isso pode acontecer quando o navegador não conserva a referência ao arquivo anterior ou não permite gravar diretamente. Escolha a pasta e o nome corretos. Confirme cuidadosamente antes de substituir qualquer arquivo.

### A restauração não funcionou

Utilize **Verificar backup JSON** para examinar o arquivo. Confirme que ele foi produzido pelo MD Reader e não está vazio ou corrompido.

Não tente resolver o problema apagando os dados atuais. Guarde primeiro uma cópia do estado existente.

### O aplicativo perdeu os documentos

Verifique se está usando o mesmo navegador, perfil e dispositivo. Os dados locais não são compartilhados automaticamente.

Se houve limpeza de dados do site, troca de aparelho ou remoção do perfil, a recuperação poderá depender exclusivamente de um backup externo.

### A instalação não aparece

Nem todo navegador oferece o mesmo mecanismo de instalação. Confira se a página está sendo acessada por HTTPS e procure as instruções na Manutenção.

### O compartilhamento não abre

O navegador pode não suportar o compartilhamento nativo ou o aplicativo de destino pode não aceitar `.md`. Utilize a exportação do documento e compartilhe o arquivo manualmente.

### A leitura offline falhou

Conecte-se à internet, abra o aplicativo, verifique o cache offline e utilize a reparação se necessário. Depois teste novamente sem conexão.

### O aplicativo continua mostrando conteúdo antigo

Pode haver recursos antigos em cache. Com conexão ativa, utilize **Verificar atualizações** e recarregue. Se necessário, recorra à reparação. Não comece apagando todos os dados do site, pois isso pode eliminar documentos e preferências.

## 21. Privacidade e segurança dos dados

O MD Reader foi concebido para trabalhar principalmente com dados locais. Os documentos importados ficam associados ao navegador e ao perfil utilizados.

Isso oferece independência de uma conta online, mas exige cuidados com a conservação dos arquivos.

### O que é IndexedDB?

É um mecanismo de armazenamento oferecido pelos navegadores. Ele permite que aplicativos web guardem dados estruturados e documentos para uso posterior.

### O que é armazenamento local?

É outro recurso do navegador, geralmente utilizado para guardar preferências e informações menores. Assim como o IndexedDB, está sujeito às regras de armazenamento do navegador.

### O que é cache?

É uma área usada para conservar arquivos necessários ao funcionamento do aplicativo, como scripts, estilos e imagens. O cache ajuda a abrir o leitor mais rapidamente e a utilizá-lo offline.

### Por que os dados podem desaparecer?

Limpeza de dados do site, remoção de perfis, problemas no armazenamento, políticas do navegador e troca de dispositivo podem afetar os registros locais.

O modo de navegação privada ou anônima não deve ser utilizado para guardar bibliotecas importantes, pois seus dados podem ser descartados ao encerrar a sessão.

### Documentos confidenciais

Se outras pessoas utilizam o mesmo perfil do navegador ou têm acesso ao dispositivo desbloqueado, poderão conseguir acessar dados locais. Utilize os mecanismos de proteção do sistema operacional e evite importar informações sensíveis em aparelhos compartilhados.

### Arquivos de origem desconhecida

Não abra links suspeitos nem confie automaticamente em documentos recebidos de fontes desconhecidas. O leitor procura tratar conteúdo Markdown como entrada não confiável, mas a prudência continua necessária.

## 22. Boas práticas de uso

Uma biblioteca organizada é mais fácil de manter e proteger.

Comece criando coleções por assunto. Evite bibliotecas com nomes muito semelhantes. Ao importar documentos, confira se os títulos são identificáveis. Utilize favoritos para materiais consultados com frequência e marcadores para passagens que merecem atenção.

Escolha uma configuração visual confortável e mantenha-a por algum tempo antes de fazer novos ajustes. Alterar a aparência constantemente pode dificultar a comparação da posição de leitura, sobretudo no Modo Página.

Faça backups em intervalos proporcionais à importância dos documentos. Se você adicionou muitos arquivos ou criou diversos marcadores, não espere vários dias para guardar uma cópia.

Ao atualizar um backup diário, confirme que escolheu o arquivo correto. Se precisar preservar estados antigos, mantenha cópias separadas.

Antes de limpar o cache, reinstalar o aplicativo, mudar de navegador ou trocar de dispositivo, verifique se existe um backup recente e legível.

Para viagens, abra antecipadamente os documentos que pretende utilizar, verifique a disponibilidade offline e realize um teste sem conexão.

## 23. Glossário

**Aplicativo web:** programa utilizado por meio de um navegador.

**Backup:** cópia de segurança destinada à recuperação de dados.

**Biblioteca:** coleção temática de documentos dentro do MD Reader.

**Cache:** armazenamento de recursos que podem ser reutilizados pelo navegador.

**CORS:** política de segurança que controla quando uma página pode acessar recursos de outro endereço na internet.

**Documento:** arquivo de texto aberto ou armazenado no leitor.

**Extensão:** parte final do nome de um arquivo, como `.md` ou `.json`.

**Favorito:** indicação de que um documento merece destaque.

**HTTPS:** protocolo de comunicação segura utilizado por sites.

**IndexedDB:** banco de dados local disponibilizado pelo navegador.

**JSON:** formato de arquivo utilizado para representar dados estruturados, incluindo backups do aplicativo.

**Markdown:** formato de texto que utiliza símbolos simples para indicar títulos, listas, destaques e outros elementos.

**Marcador:** registro de uma posição ou passagem específica de um documento.

**Modo Página:** leitura dividida em páginas calculadas pelo aplicativo.

**Modo Rolagem:** leitura contínua, com deslocamento vertical.

**Offline:** condição em que o dispositivo está sem conexão com a internet.

**Paleta:** conjunto de cores utilizado na interface.

**PWA:** aplicativo web com recursos de instalação e funcionamento semelhante ao de um aplicativo convencional.

**Service Worker:** componente do navegador que pode ajudar a gerenciar recursos em cache e o funcionamento offline.

**Sincronização:** processo de manter dados atualizados entre locais ou dispositivos. O MD Reader não oferece sincronização automática de bibliotecas.

**URL:** endereço de um recurso na internet.

## 24. Perguntas frequentes

### Preciso saber programar para usar o MD Reader?

Não. Você precisa apenas abrir um arquivo Markdown ou utilizar o exemplo disponível no aplicativo. A formatação é interpretada automaticamente.

### Posso escrever um livro no MD Reader?

O aplicativo é voltado à leitura. Para escrever ou modificar o conteúdo, utilize um editor de texto ou Markdown e depois abra o arquivo no leitor.

### Posso guardar vários livros?

Você pode organizar diversos documentos em bibliotecas, respeitando o espaço e as limitações do armazenamento disponibilizado pelo navegador.

### Preciso estar conectado o tempo todo?

Não. Depois de preparar os recursos essenciais e importar os documentos, muitas atividades podem funcionar offline. Recursos remotos ainda podem exigir conexão.

### Meus documentos aparecem automaticamente no celular e no computador?

Não. Cada navegador e dispositivo mantém seu próprio armazenamento. Para transferir dados, utilize backup e restauração.

### O aplicativo altera meu arquivo original?

A importação e a leitura trabalham com uma cópia local. Exportar um documento não equivale a editar o original.

### Qual é a diferença entre Guardar e Atualizar?

Guardar cria uma cópia de segurança. Atualizar procura renovar o backup diário existente, conforme as permissões do navegador.

### Qual é a diferença entre Atualizar e Restaurar?

Atualizar grava dados atuais em um backup. Restaurar faz o caminho inverso: lê um backup e recupera dados no aplicativo.

### Posso excluir um backup depois de atualizar?

É mais seguro conservar ao menos uma cópia anterior, principalmente quando você acabou de realizar mudanças importantes.

### Posso usar o MD Reader em um computador compartilhado?

É possível, mas não é recomendável guardar documentos confidenciais em um perfil utilizado por outras pessoas.

### A página 10 será sempre a mesma?

Não necessariamente. A paginação depende da tela e das preferências. Para localizar passagens, utilize marcadores, títulos e pesquisa.

### Como sei se o aplicativo está funcionando corretamente?

Abra um documento, navegue, crie um marcador, feche e reabra o leitor. Depois confira os diagnósticos de armazenamento e disponibilidade offline. Para dados importantes, teste também o processo de backup em um ambiente seguro.

## 25. Roteiro de aprendizado

Para terminar, segue uma sequência de exercícios simples que permite conhecer o aplicativo sem pressa.

**Primeiro momento — Conhecer.** Abra o MD Reader e escolha **Ler exemplo**. Leia alguns parágrafos, observe os títulos e abra o menu principal. Retorne ao início.

**Segundo momento — Personalizar.** Entre em **Preferências**. Escolha uma paleta, experimente os modos claro e escuro, altere a fonte e ajuste o espaçamento. Observe o efeito no texto.

**Terceiro momento — Navegar.** Abra um documento com vários títulos. Utilize o sumário para visitar diferentes seções. Faça uma pesquisa por palavra e avance entre as ocorrências.

**Quarto momento — Experimentar os modos.** Leia primeiro em **Rolagem**. Depois escolha **Página**, avance e volte, observe a numeração e toque na pílula para abrir o seletor de páginas.

**Quinto momento — Organizar.** Crie uma biblioteca com um nome de sua escolha. Importe um documento de teste. Marque-o como favorito e experimente os filtros da coleção.

**Sexto momento — Guardar passagens.** Selecione uma frase interessante e crie um marcador. Abra a página **Marcadores** e retorne à passagem salva.

**Sétimo momento — Proteger.** Utilize **Guardar** para criar um backup. Localize o JSON no dispositivo e execute **Verificar backup JSON**. Não faça testes de restauração sobre dados importantes sem antes preservar uma cópia independente.

**Oitavo momento — Conferir o funcionamento.** Abra **Manutenção**, consulte o diagnóstico, verifique a disponibilidade offline e leia as orientações de proteção do armazenamento.

Ao concluir esses exercícios, você conhecerá as principais ferramentas do MD Reader e estará preparado para utilizá-lo no cotidiano.

---

## Considerações finais

O MD Reader foi criado para oferecer uma experiência de leitura organizada, flexível e confortável. Sua proposta é simples: permitir que documentos Markdown sejam tratados como materiais de leitura, com espaço para concentração, pesquisa, organização e continuidade.

Você não precisa utilizar todas as ferramentas ao mesmo tempo. Para começar, basta abrir um documento. Quando surgir a necessidade de localizar um capítulo, use o sumário. Quando encontrar uma passagem importante, crie um marcador. Quando desejar mais conforto, ajuste a tipografia. Quando sua biblioteca crescer, organize-a em coleções.

E, acima de tudo, lembre-se de guardar cópias de segurança. Um bom ambiente de leitura não depende apenas de uma interface agradável; depende também da confiança de que seus documentos poderão ser recuperados quando necessário.

**Boa leitura!**



<!-- Correção de backup: Guardar e Atualizar usam um único manipulador de clique e não iniciam downloads paralelos. -->
