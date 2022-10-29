<h1 align="center">
    <img alt="NextLevelWeek" title="#NextLevelWeek" src="./assets/banner.png" />
</h1>

<h4 align="center"> 
	CINEFAN
</h4>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/tgmarinho/nlw1?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/tgmarinho/nlw1">

  	
  <a href="https://www.twitter.com/tgmarinho/">
    <img alt="Siga no Twitter" src="https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2Ftgmarinho%2Fnlw1">
  </a>
	
  
  <a href="https://github.com/tgmarinho/nlw1/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/tgmarinho/nlw1">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
   <a href="https://github.com/tgmarinho/nlw1/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/tgmarinho/nlw1?style=social">
  </a>
</p>


## 💻 Sobre o projeto

♻️ Ecoleta - é uma forma de conectar empresas e entidades de coleta de resíduos orgânicos e inorgânicos as pessoas que precisam descartar seus resíduos de maneira ecológica.

As empresas ou entidades poderão se cadastrar na plataforma web enviando:
- uma imagem do ponto de coleta
- nome da entidade, email e whatsapp
- e o endereço para que ele possa aparecer no mapa
- além de selecionar um ou mais ítens de coleta: 
  - lâmpadas
  - pilhas e baterias
  - papéis e papelão
  - resíduos eletrônicos
  - resíduos orgânicos
  - óleo de cozinha

Os usuários terão acesso ao aplicativo móvel, onde poderão:
- navegar pelo mapa para ver as instituições cadastradas
- entrar em contato com a entidade através do E-mail ou do WhatsApp

Projeto desenvolvido durante a **NLW - Next Level Week** oferecida pela [Rocketseat](rs).
O NLW é uma experiência online com muito conteúdo prático, desafios e hacks onde o conteúdo fica disponível durante uma semana.


## 🎨 Layout

O layout da aplicação está disponível no Wireframe.cc:

<a href="https://wireframe.cc/pro/pp/635115ec2575591">
  <img alt="Made by tgmarinho" src="https://img.shields.io/badge/Acessar%20Layout-Wireframe-brightgreen">
</a>

### Web

<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./assets/web.svg" width="400px">

  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./assets/sucesso-web.svg" width="400px">
</p>

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js][nodejs]
- [React][reactjs]
- [Next.JS][nextjs]
- [TypeScript][typescript]


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

Feito com 💜 por [Nayla Gomes](https://www.linkedin.com/in/naygo/) 👩‍💻 e [Vinicius Marinho](https://www.linkedin.com/in/vinicius-alexsander-lima-marinho/).

[nodejs]: https://nodejs.org/
[typescript]: https://www.typescriptlang.org/
[reactjs]: https://reactjs.org
[nextjs]: https://nextjs.org/
[yarn]: https://yarnpkg.com/
[vscode]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[license]: https://opensource.org/licenses/MIT
