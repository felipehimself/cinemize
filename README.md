## Cinemize

Trata-se de uma rede social em que os usuários podem postar sugestões de filmes e séries, avaliação, comentário, gênero e onde assistir. Os usuários também podem seguir outros usuários e favoritas postagens.

O projeto possui 7 páginas:

- ```/```: Signup, exibe formulário no qual o usuário cria sua conta;
- ```/login```: Para caso o usuário já possua conta;
- ```/home```: Mostra os posts do usuário e das contas que o mesmo segue;
- ```/profile```: Exibe o eprfil do usuário logado; 
- ```/profile/favorites```: São exibidos as postagens que foram salvas como favorito pelo usuário;
- ```/user/[userName]```: Redireciona para o perfil do usuário que começou a seguir o usuário logado;
- ```/user/posts/[postId]```: Mostra a postagem do usuário logado que foi curtida por outro usuário;


## Sumário

- [Tecnologias utilizadas](#tecnologias)
- [Instruções para rodar o projeto](#instrucoes)
- [Organização e estruturação do projeto](#organizacao)
- [Desenvolvimento](#desenvolvimento)
- [Imagens](#imagens)

## Tecnologias Utilizadas <a name="tecnologias"></a>

### Frontend

- [**NextJS**](https://nextjs.org/)
- [**TailwindCSS**](https://tailwindcss.com/)
- [**React Hook Form**](https://react-hook-form.com/)
- [**Yup**](https://github.com/jquense/yup/)
- [**React Redux**](https://react-redux.js.org/)
- [**Redux Tookit**](https://redux-toolkit.js.org/)
- [**React Icons**](https://react-icons.github.io/react-icons/)
- [**Framer Motion**](https://www.framer.com/)
- [**React Loading Icons**](https://github.com/dkress59/react-loading-icons/)
- [**UUID**](https://github.com/uuidjs/uuid/)
- [**Axios**](https://axios-http.com/docs/intro)
- [**React Rating Stars Component**](https://www.npmjs.com/package/react-rating-stars-component)

### Backend
- [**Mongoose**](https://mongoosejs.com/)
- [**Jose**](https://github.com/panva/jose)
- [**Cookie**](https://github.com/jshttp/cookie/)
- [**BcryptJS**](https://github.com/dcodeIO/bcrypt.js)


## Instruções para rodar o projeto <a name="instrucoes"></a>

### Será necessário ter instalado na sua máquina:

```
Git
NodeJS
```

- Clone o repositório com o comando **git clone**:

```
git clone https://github.com/felipehimself/cinemize.git
```

- Entre no diretório que acabou de ser criado:

```
cd cinemize
```

- Faça a instalação das dependências do projeto:

```
npm install
```

## Organização e estruturação do projeto <a name="organizacao"></a>

O projeto está estruturado da seguinte forma:

```
+---components
|   |   Main.tsx
|   |
|   +---AccountForm
|   |       AccountForm.tsx
|   |       Styles.module.css
|   |
|   +---BottomTab
|   |       BottomTab.tsx
|   |       Styles.module.css
|   |
|   +---Button
|   |       Button.tsx
|   |       Styles.module.css
|   |
|   +---ButtonLink
|   |       ButtonLink.tsx
|   |       Styles.module.css
|   |
|   +---CardProduct
|   |       CardProduct.tsx
|   |       Styles.module.css
|   |
|   +---CartBar
|   |       CartBar.tsx
|   |       Styles.module.css
|   |
|   +---CartItem
|   |       CartItem.tsx
|   |       Styles.module.css
|   |
|   +---ErrorMessage
|   |       ErrorMessage.tsx
|   |       Styles.module.css
|   |
|   +---Header
|   |       Header.tsx
|   |       Styles.module.css
|   |
|   +---Loading
|   |       Loading.tsx
|   |       Styles.module.css
|   |
|   +---ModalCupom
|   |       ModalCupom.tsx
|   |       Styles.module.css
|   |
|   \---Topbar
|           Styles.module.css
|           Topbar.tsx
|
+---features
|       cartSlice.ts
|
+---hooks
|       hooks.ts
|
+---lib
|       createModel.ts
|       framerMotion.ts
|       hotToast.ts
|       yup.ts
|
+---models
|       Order.ts
|       Product.ts
|       User.ts
|
+---pages
|   |   index.tsx
|   |   _app.tsx
|   |   _document.tsx
|   |
|   +---about
|   |       index.tsx
|   |
|   +---account
|   |       my-account.tsx
|   |
|   +---api
|   |   +---account
|   |   |       index.ts
|   |   |
|   |   +---auth
|   |   |       login.ts
|   |   |       logout.ts
|   |   |       signup.ts
|   |   |
|   |   +---order
|   |   |       index.ts
|   |   |
|   |   \---product
|   |           index.ts
|   |
|   +---auth
|   |       login.tsx
|   |       signup.tsx
|   |
|   +---cart
|   |       index.tsx
|   |
|   +---product
|   |       [id].tsx
|   |
|   \---search
|           index.tsx
|
+---public
|   |   favicon.ico
|   |   icon-192x192.png
|   |   icon-256x256.png
|   |   icon-384x384.png
|   |   icon-512x512.png
|   |   manifest.json
|   |   sw.js
|   |   vercel.svg
|   |   workbox-6a1bf588.js
|   |
|   \---assets
|           no-search.svg
|           pizza.jpg
|
+---store
|       store.ts
|
+---styles
|       About.module.css
|       Cart.module.css
|       Global.module.css
|       globals.css
|       Index.module.css
|       Login.module.css
|       MyAccount.module.css
|       Product.module.css
|       Search.module.css
|       Signup.module.css
|
+---ts
|   +---enums
|   |       enums.ts
|   |
|   +---interfaces
|   |       interfaces.ts
|   |       user.ts
|   |
|   \---types
|           types.ts
|
\---utils
        constants.ts
        functions.ts   
```

## Desenvolvimento <a name="desenvolvimento"></a>

### Frontend

#### [**NextJS**](https://nextjs.org/)

O projeto foi desenvolvido com o framework NextJS, que tem como base o React. Foi utilizada a abordagem ```getServerSideProps```, para gerar as páginas de forma dinâmica com dados sendo servidos pelo banco de dados. A proteção de rotas e a persistência de login foram feitas por meio da utilização de middleware para validar se o usuário está autenticado por meio da verificação do token armazenado nos cookies. 

#### [**TailwindCSS**](https://tailwindcss.com/)

Para estilização dos elementos. 

#### [**React Hook Form**](https://react-hook-form.com/) e [**Yup**](https://github.com/jquense/yup/).

Para controle das informações informadas e validação dos campos dos formulários.

#### [**Redux Toolkit**](https://redux-toolkit.js.org/) e [**React Redux**](https://react-redux.js.org/)

Para controle de estados entre as telas da aplicação.

#### [**React Icons**](https://react-icons.github.io/react-icons/)

Para ícones SVG utilizados na aplicação.

#### [**Framer Motion**](https://www.framer.com/)

Para animações e transições.

#### [**React Loading Icons**](https://github.com/dkress59/react-loading-icons/)

Para demonstração de espera na transição de páginas e chamadas HTTP.

#### [**UUID**](https://github.com/uuidjs/uuid/)

Para gerar identificadores únicos de cada pedido do cliente.

#### [**Axios**](https://axios-http.com/docs/intro)

Para realizar chamadas HTTP.

#### [**React Rating Stars Component**](https://www.npmjs.com/package/react-rating-stars-component)

Componente para selecionar a nota dada para a postagem (filme ou série)


### Backend

#### [**Mongoose**](https://mongoosejs.com/)

Abordagem NOSQL utilizado como banco de dados da aplicação.

#### [**Jose**](https://github.com/panva/jose)

Utilizado para geração do JSON Web Token (JWT).

#### [**Cookie**](https://github.com/jshttp/cookie/)

Utilizado para serializar e armazenar o JWT nos cookies da requisição.

#### [**BcryptJS**](https://github.com/dcodeIO/bcrypt.js)

Utilizado para criptografar as senhas dos usuários antes de salvar no banco de dados.


## Imagens <a name="imagens" ></a>

<img src='./app-screen-shots/signup.JPG' alt='página para criar conta' width="600" /> 
<img src='./app-screen-shots/login.JPG' alt='página para efetuar login' width="600" /> 
<img src='./app-screen-shots/home.JPG' alt='página home' width="600" /> 
<img src='./app-screen-shots/profile.JPG' alt='página perfil do usuário' width="600" /> 
<img src='./app-screen-shots/favoritos.JPG' alt='página de favoritos' width="600" /> 
<img src='./app-screen-shots/user-posts.JPG' alt='página da postagem do usuário que foi curtida por outro usuário' width="600" /> 
<img src='./app-screen-shots/search.JPG' alt='campo para pesquisa de usuário' width="600" />
<img src='./app-screen-shots/notificacoes.JPG' alt='campo que mostra as notificações do usuário' width="600" /> 
<img src='./app-screen-shots/form.JPG' alt='formulário para criar postagem' width="600" /> 

<img src='./app-screen-shots/signup-mobile.JPG' alt='página para criar conta' width="340" /> 
<img src='./app-screen-shots/login-mobile.JPG' alt='página para efetuar login' width="340" /> 
<img src='./app-screen-shots/home-mobile.JPG' alt='página home' width="340" /> 
<img src='./app-screen-shots/profile-mobile.JPG' alt='página perfil do usuário' width="340" />
<img src='./app-screen-shots/favoritos-mobile.JPG' alt='página de favoritos' width="340" /> 
<img src='./app-screen-shots/user-posts-mobile.JPG' alt='página da postagem do usuário que foi curtida por outro usuário' width="340" /> 
<img src='./app-screen-shots/search-mobile.JPG' alt='página home' width="340" /> 
<img src='./app-screen-shots/notificacoes-mobile.JPG' alt='campo que mostra as notificações do usuário' width="340" /> 
<img src='./app-screen-shots/form-mobile.JPG' alt='página home' width="340" /> 

