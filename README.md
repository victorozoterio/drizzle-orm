# Fundamentos da WEB

<a href="./.github/fundamentals.png" target="_blank">
    <img alt="Fundamentos do Desenvolvimento de Software" src="./.github/fundamentals.png" width="100%" />    
</a>

## Configuração das variáveis de ambiente

Crie os arquivos `.env` e `.env.test` na raiz do projeto com o seguinte conteúdo:

```bash
# .env
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/desafio"

# .env.test
NODE_ENV=test
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/desafio_test"
```

# Formas de enviar dados em uma requisição

- Search Params -> Usado para fazer filtros, ou seja, são parâmetro opcionais
- Route Params -> Usado para identificar recursos, ou seja, são parâmetro obrigatórios
- Request Body -> Usado em requisições PUT ou POST para enviar dados
- Headers -> Usado para enviar metadados

# Relacionamentos

Todo relacionamento N:N gera uma tabela pivot, que no caso é a tabela de inscrições.

# Sobre o Node

O node a partir da versão 22 já entende TypeScript, porém é necessário fazer as importações e incluir .ts no final, exemplo:

```Typescript
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
```

# Como saber se uma Lib foi feita com TS ou JS?

Se você entrar no npmjs.com e a lib estiver como DT, então você precisa instalar o pacote de tipagem separadamente, exemplo:

```Bash
npm i supertest @types/supertest -D
```

Já quando a lib estiver como TS, significa que a lib foi feita em TypeScript, portanto o pacote de tipagem já vem incluso, exemplo:

```Bash
npm i fastify
```

# Sobre a Lib supertest

O supertest permite fazer requisições HTTP para a aplicação, é uma forma de fazer um fetch sem precisar subir o servidor.

# Principal diferença entre o test Unit e E2E

Unit -> Testas os caminhos infelizes (Bad Paths)
E2E -> Testas o caminho feliz (Happy Path)

Será feito apenas os testes E2E dessa aplicação, onde de fato fazemos requisições HTTP, esse tipo de teste é o mais pesado que tem.

# O que é Hash?

Hash é tipo uma criptografia, porém ele só tem o processo de ida, ou seja, é impossível deshashear algo. Pegando o exemplo de uma senha então, como é possível saber a senha posta está correta? simples, será salvo no banco de dados o hash da senha definida e na hora de fazer o login será feito o hash da senha inserida, caso o hash da senha inserida seja igual ao hash salvo no banco de dados, então a senha está correta.

Até mesmo sistemas de sincronização de arquivos com a nuvem usam o sistema de hash (SHA-256), por exemplo, o One Drive pega todos os arquivos que existem em uma pasta, gera um pequeno hash e salva no banco de dados, caso tu modifique qualquer arquivo o hash será diferente do que está salvo no banco de dados, e é exatamente assim que o sistema sabe que os dados não estão sincronizados.

# Por que usar o Argon2 ao invés o Bcrypt?

Porque o Argon2 é mais rápido no processo de geração de senhas e consome menos recursos para fazer o hash da senha.

# Diferença entre autenticação Stateful vs Stateless

Stateful é o nome que damos para algum código/aplicação/funcionalidade que precisa guardar um estado para continuar funcionando. Já o Stateless não precisa guardar um estado para continuar funcionando.

## Stateful

```JSON
POST /sessions
{ "headers" : { "Code": "A3H6C" } }

Tabela: sessions

id
user_id
code
expires_at
```

Meu frontend envia o code via Headers, o backend verifica se esse code está na minha tabela sessions, se estiver então essa pessoa está logada. Essa forma de autenticação é ótima para fazer Revoke, ou seja, revogar um acesso, para isso basta o admin apagar o registro de sessão do usuário que ele deseja revogar o acesso.

# Stateless

```JSON

POST /sessions
{ "headers" : { "Authorization": "131141fsfsfs.232334fdfaadda.aafsaae2321d" } }

"131141fsfsfs" = Header (algoritmo utilizado e tipo do token)
"232334fdfaadda" = Payload (informações dentro do token, ex: userUuid)
"aafsaae2321d" = assinatura para comprovar que o token não foi modificado
```

Meu frontend envia um token via Headers, o backend verifica se esse token foi gerado a partir do SECRE, se foi então a pessoa está logada. Esse token não tem problema estar visível no frontend pois as pessoas que tiverem acesso a esse token não vão conseguir criar outros tokens

# Diferença entre criptografia de chave simétrica x assimétrica

Chave simétrica é quando existe apenas uma chave, ou seja, essa chave é usada para criar tokens e também para validar tokens criados a partir dessa mesma chave.

Chave assimétricas é quando existem duas chaves, uma privada para criar tokens e uma pública para validar tokens criados a partir da chave privada.

Chaves assimétricas (Privada/Pública - SSH)

# O que é uma data em Unix Epoch?

É o número de segundos (ou milissegundos) que se passaram desde 1 de janeiro de 1970. É uma forma de representar uma data sem precisar escrever uma data de fato.
