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

Heroku\<host\>: https://assets-dashboard-api.herokuapp.com

## Link para coleção de requisições para Insomnia

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
