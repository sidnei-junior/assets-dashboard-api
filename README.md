# assets-dashboard-api

## Executar local

- Clonar repositório: 

```git clone https://github.com/sidnei-junior/assets-dashboard-api.git```

- Navegue até a pasta do projeto e execute o comando que instala as dependências

```cd assets-dashboard-api```

```npm install```

- Execute o script para iniciar o projeto

```npm run start```

- Agora basta usar sua ferramenta cliente favorita para testar as rotas

## Deploy

<img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white"/>

\<host\>: https://assets-dashboard-api.herokuapp.com

## Tecnologias

<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /><img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />

## Padrões de projeto

- Clean Code
- Clean Architecture
- Test Driven Development (TDD)

## Link para coleção de requisições

<img src="https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white"/> 

https://drive.google.com/drive/folders/1r17S9kAZKPf3LVyYkw8FTGniRXwMlHTn?usp=sharing

## Regras de negócio

[⭕] Todo usuário está associado a uma empresa

[✔️] Toda unidade está associada a uma empresa

[✔️] Todo ativo está associado a uma unidade

[✔️] O usuário que pode criar qualquer entidade tem a permissão de admin

## Casos de uso

### Usuário (Account)

[✔️] Adicionar Conta de Usuário - POST \<host\>/api/signup

[✔️] Fazer Login - POST \<host\>/api/login

### Empresa (Company)

[✔️] Adicionar Empresa - POST \<host\>/api/companies

[✔️] Listar Empresas - GET \<host\>/api/companies

[✔️] Atualizar Dados da Empresa - PUT \<host\>/api/companies/:companyId

[✔️] Deletar Empresa - DELETE \<host\>/api/companies/:companyId

### Unidade (Unit)

[✔️] Adicionar Unidade - POST \<host\>/api/units

[✔️] Listar Unidades da Empresa - GET \<host\>/api/units/:companyId

[✔️] Atualizar Dados da Unidade - PUT \<host\>/api/units/:unitId

[✔️] Deletar Unidade - DELETE \<host\>/api/units/:unitId

### Ativo (Asset)

[✔️] Adicionar Ativo - POST \<host\>/api/assets

[✔️] Listar Ativos da Unidade - GET \<host\>/api/assits/:unitId

[✔️] Listar Ativos da Empresa - GET \<host\>/api/assits/units/:companyId

[✔️] Atualizar Dados do Ativo - PUT \<host\>/api/assits/:assitId

[✔️] Deletar Ativo - DELETE \<host\>/api/assits/:assitId
