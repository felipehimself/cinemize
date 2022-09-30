cada usuário terá um field posts
field posts será um array com IDS de posts
ao publicar um post, usuário dará push do id do post em seu field posts
ao mesmo tempo, este post (ID, Conteúdo) será direcionado para a coleção posts
coleção posts será um array com a estrutura {userName: ... , content: ..., id: ..., likedBy: ['userNameS']}