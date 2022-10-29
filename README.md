<h1 align="center">
    <img alt="CINEFAN" title="#CINEFAN" src="./assets/banner-com-img-brilho-na-img.png" />
</h1>

## 🎬 Sobre o projeto

O presente projeto é site que apresenta um repositório de informações de filmes. Você pode registrar seus filmes favoritos, filmes que já assistiu e descobrir inúmeros outros através do filtro presente no site.

Os usuários terão acesso a aplicação mobile, onde poderão:

- Usuário sem cadastro:
  - Ver os filmes mais populares, filmes que estão no cinema e os próximos lançamentos
  - Ver os detalhes dos filmes, como gênero, duração, sinopse, elenco e onde ele está disponível
  - Pesquisar por filmes utilizando a busca avançada
  - Sortear um filme para ser assistido
  - Se cadastrar na plataforma
- Usuário cadastrado, além das funcionalidades para os usuários sem cadastro, também é possível:
  - Salvar filmes como favoritos
  - Salvar filmes para serem assistidos
  - Salvar filmes já assistidos
  - Criar e participar de grupos
    - E ao entrar em um grupo você pode criar ou participar de sessões

## 💻 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js][nodejs]
- [React][reactjs]
- [Next.JS][nextjs]
- [TypeScript][typescript]

## 🎨 Layout

O layout da aplicação está disponível no Wireframe.cc:

<a href="https://wireframe.cc/pro/pp/635115ec2575591">
  <img src="https://img.shields.io/badge/Acessar%20Layout-Wireframe-brightgreen">
</a>

### Web

<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">
  <img alt="Tela descubra" title="Tela descubra" src="./assets/tela-descubra.png" width="400px">
</p>

## 📁 Estrutura de pastas

A pasta “src” (acrônimo para source), contém as pastas mais importantes do projeto com a maior parte dos arquivos referentes ao site, criados e escritos pelos desenvolvedores.

- **Context**: aqui mantivemos os arquivos que utilizam do context api, um gerenciador de estado global.

- **Pages**: Nesta página estão os códigos escritos em React para as paginas

- **Services**: Para a requisição de serviços externos, como o back-end, a pasta “services” contém arquivos no formato TS para a realização dessa comunicação, seguindo o padrão REST.

- **Components**: são trechos de código que se repetem, onde nenhuma (ou pouca informação) é diferente, e podem ser utilizados em mais de uma página.

- **Models**: Nesta pasta estão os models dos objetos que serão retornados das requisições aos serviços externos.

- **Utils**: Responsável por manter códigos com funções auxiliares

- **Styles**: Responsável por manter arquivos de estilo e o arquivo de configuração do tema da aplicação.

## 🚀 Como executar o projeto

💡É necessário que o [Back End](https://github.com/ViniciusAlexsander/backend-tcc) esteja sendo executado para funcionar.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js][nodejs].
Além disto é bom ter um editor para trabalhar com o código como [VSCode][vscode]

### 🧭 Rodando a aplicação web (Front End)

```bash
# Clone este repositório
$ git clone https://github.com/ViniciusAlexsander/frontend-tcc

# Acesse a pasta do projeto no seu terminal/cmd
$ cd frontend-tcc

# Instale as dependências
$ npm install

# Faça uma cópia do arquivo .env.example e altere para .env.local e substitua os valores das variáveis de ambiente
NEXT_PUBLIC_MOVIE_DB_API_KEY= (sua chave de api)
NEXT_PUBLIC_URL_BFF= (url do seu backend)
NEXT_PUBLIC_URL_MOVIES_API=https://api.themoviedb.org/3


# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000
```

## 😯 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
   > Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](https://github.com/firstcontributions/first-contributions)

## 📝 Licença

Este projeto esta sobe a licença MIT.

Feito com 💜 por [Nayla Gomes 👩‍💻](https://www.linkedin.com/in/naygo/) e [Vinicius Marinho 👨‍💻](https://www.linkedin.com/in/vinicius-alexsander-lima-marinho/).

[nodejs]: https://nodejs.org/
[typescript]: https://www.typescriptlang.org/
[reactjs]: https://reactjs.org
[nextjs]: https://nextjs.org/
[yarn]: https://yarnpkg.com/
[vscode]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[license]: https://opensource.org/licenses/MIT
