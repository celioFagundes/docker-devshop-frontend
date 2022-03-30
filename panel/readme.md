# DevShop painel administrativo  em NextJS
- Acesse o repositório da API Backend do DevShop [API DevShop](https://github.com/celioFagundes/devshop-api)
- Acesse o repositório do site do DevShop [Site](https://github.com/celioFagundes/devshop-frontend/tree/master/site).

### Pagina inicial do Painel Admnistrativo do DevShop
![localhost_3001_dashboard](https://user-images.githubusercontent.com/77676047/159090336-06e187fc-179c-4948-9618-d3f41d0cc164.png)

### Sobre o projeto
  Projeto DevShop , criação e gerenciamento de produtos utilizando NextJs, NestJs, Typescript, Javascript, TypeORM ,Postgres e AWS S3. Este é um projeto FullStack que conta com  3 repositórios :
  - Painel administrativo desenvolvido com NextJs para criação e gerenciamento dos produtos, incluindo cadastro e validação dos usuários que possuem permissão para usar o painel utilizando JWT Tokens e inserção de imagens dos produtos e marcas utilizando AWS S3.  
  - Uma API Backend desenvolvida com NestJs, Typescript , GraphQL, TypeORM , Postgres e AWS S3.
    - Acesse o repositório da API Backend do DevShop [API DevShop](https://github.com/celioFagundes/devshop-api)
  - Site DevShop, com exibição dos produtos, marcas e categorias cadastrados, com opções de escolha dos produtos de acordo com o tamanho ou tensão elétrica  
    - Acesse o repositório do site do DevShop [Site](https://github.com/celioFagundes/devshop-frontend/tree/master/site).

### Sobre o painel administrativo do DevShop

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
Desenvolvido com NextJs e GraphQL, consiste no gerenciamento dos produtos, categorias e marcas do DevShop armazenados no banco de dados Postgres. 
</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
Permite a criação, edição e remoção de todos os produtos, categorias e marcas e também permite o upload de imagens dos produtos e de logos para as marcas
Gerenciamento dos usuários que possuem acesso ao painel, como criação, edição e remoção do usuário, assim como  a visualização e invalidação  das sessôes de cada usuário 
</br>

### Funcionalidades
- Criação, edição e remoção dos produtos, marcas e categorias cadastrados no banco de dados
- Criação, edição e remoção dos usuarios que possuem acesso ao painel
- Autorização de ações do usuário baseada em sua role sendo elas administrador ou usuário
- Visualização e invalidação das sessoôes de cada usuário 
- Criação, edição e remoção de variações do produto. como tamanho para roupas(exemplo: P,M,G, 38,40) ou tensão elétrica para eletrônicos(110V, 120V ou Bivolt)
- Validação de todos os formulários de criação e edição utilizando Formik e Yup

### Tecnologias utilizadas
- [NextJs](https://nextjs.org/) 
- [GraphQl](https://graphql.org/) 
- [useSWR](https://swr.vercel.app/)
- [TailwindCSS](https://tailwindcss.com/)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)
- [DateFns](https://date-fns.org/)
- [React Icons](https://react-icons.github.io/react-icons)
- [Recharts](https://recharts.org/en-US/)

### Desempenho
- Responsividade em dispostivos movéis

## Paginas
### Pagina inicial do DevShop
Informações gerais(dados ficitios apenas para exemplo)
![localhost_3001_dashboard](https://user-images.githubusercontent.com/77676047/159090336-06e187fc-179c-4948-9618-d3f41d0cc164.png)

### Pagina inicial das abas
- Categorias
![localhost_3001_users](https://user-images.githubusercontent.com/77676047/159092821-345f4afc-b242-41fa-a60a-818a09793b5a.png)

- Produtos
![localhost_3001_users (1)](https://user-images.githubusercontent.com/77676047/159092869-63606b59-dda1-4ee6-83d5-4dad3c275fe2.png)

- Marcas
![localhost_3001_users (2)](https://user-images.githubusercontent.com/77676047/159092903-0e764ae3-86b5-4cab-8f09-69a0f67464ea.png)

- Usuários
![localhost_3001_users (3)](https://user-images.githubusercontent.com/77676047/159092936-fd12c364-fe34-4615-955a-61dc1b785b37.png)

### Pagina de criação/edição das abas (apenas o texto do botão muda na página de edição)
- Categorias
![localhost_3001_users (4)](https://user-images.githubusercontent.com/77676047/159093224-da66cac6-e295-4cd8-97b9-1b0553072ed6.png)

- Produtos(formulário
![formproduct](https://user-images.githubusercontent.com/77676047/159095332-83875e96-4105-4c82-9ffd-0fba3d7e696b.png)

- Marcas
![localhost_3001_users (6)](https://user-images.githubusercontent.com/77676047/159093344-d0dd6a50-bb98-43bb-839b-61a270fd6ea1.png)

- Usuários
![localhost_3001_users (7)](https://user-images.githubusercontent.com/77676047/159093378-9fcb8f9a-4219-409c-803d-c65673cf615b.png)

### Upload de imagens dos produtos
![localhost_5000_products_create (1)](https://user-images.githubusercontent.com/77676047/159095435-46e2cdf9-49d6-4497-93d0-b159a5a898da.png)

### Sessões do usuário
![localhost_5000_products_create (2)](https://user-images.githubusercontent.com/77676047/159095489-09566abd-c001-4a5d-b31b-9d6d1542bcd5.png)

### Página de Login
![localhost_3001_ (1)](https://user-images.githubusercontent.com/77676047/159259749-af558af0-df28-4cab-8bef-53f613385223.png)




