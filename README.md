## Descrição

Aplicação de gerenciamento de estoque para farmácias. Utilizando as seguintes tecnologias: Node.js, NestJS, Express, TypeORM e MySQL.

## Instalação
Clone o repositório e execute o seguinte comando para instalar as dependências:
```bash
$ npm install

```

## Banco de Dados

No arquivo `src/database/typeorm-config.ts` você terá acesso a seguinte classe abaixo, onde será configurado o bando de dados, lembre-se de colocar as váriaveis de ambiente correspondentes no .env:

```tsx
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      database: process.env.DATABASE,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      host: process.env.HOST,
      port: parseInt(process.env.DB_PORT),
      timezone: process.env.TZ,
      synchronize: false,
      type: 'mysql',
      entities: [join(__dirname, '..', '**/*entity.{ts,js}')],
      migrations: [join(__dirname, '..', './database/migrations/*{ts,js}')],
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}

```

## Migrations

Para executar as migrations e criar as tabelas correspondentes no banco de dados, utilize o comando:

```bash
npm run typeorm -- -d src/database/migrations-config.ts migration:run

```

## Banco de testes - usuário admin
Na pasta `src/database` há o arquivo `bancoTeste.sql`, com alguns dados salvos para teste, inclusive um usuário admin:

```json
{
	"email":"admin@admin.com",
	"password": "123456"
}
```

## Documentação

Para acessar uma documentação básica da aplicação, você poderá visualizar localmente na aplicação utilizando a rota `/public`.

![print documentação](https://wesleygado.dev/wp-content/uploads/2024/02/doc.png)
