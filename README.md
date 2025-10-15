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
