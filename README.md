# brocoders.com - Todo App

## Description

This project was created as a test task in recruiting processes at [brocoders.com](https://brocoders.com/).
The goal of this project is - to create Create REST API for the Todo App.

Application:

- should be created using [NestJS Boilerplate](https://github.com/brocoders/nestjs-boilerplate)
- should use [PostgreSQL](https://www.postgresql.org/) as a database for storing  todo-s;  

Application stack:

- [NestJS](https://redux.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker Compose](https://docs.docker.com/compose/)

Application requirements:

1. Todo
    1. Users can create many to-do lists (For example: Shopping List, Learn, Daily Tasks, etc).
    2. Users can delete their to-do list.
    3. Users can create an infinite number of to-do lists.
    4. It should be displayed with infinite scrolling.
    5. The endpoint on 1 page must show not greater than 50 todo lists
2. Validations:
    1. Todo’s title max is 128 characters.
    2. Each to-do list can contain many items (example: Shopping List (apples, milk), training (NodeJS, PostgreSQL), etc.).
    3. Users can mark items as done or undone.
    4. Users can create, edit, and delete items.
3. Security
    1. Users can create, view, edit, or delete only their to-do lists.
4. Documentation
    1. Create documentation for endpoints (Swagger).

---

## Comfortable development

```bash
git clone --depth 1 https://github.com/brocoders/nestjs-boilerplate.git my-app
cd my-app/
cp env-example .env
```

Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`

Change `MAIL_HOST=maildev` to `MAIL_HOST=localhost`

Run additional container:

```bash
docker compose up -d postgres adminer maildev
```

```bash
npm install

npm run migration:run

npm run seed:run

npm run start:dev
```

---

[Full documentation here](https://github.com/brocoders/nestjs-boilerplate)
