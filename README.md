<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


# First steps
1. Clone the repository
2. Install dependencies
    ```
    npm install
    ```
3. NestJS is required to be installed in your machine
    ```
    npm i -g @nestjs/cli
    ```
4. Create and install database local
   ```
   docker-compose up -d
   ```
5. Reconstruir base de datos con la semilla
   ```http request
   GET http://localhost:3000/seed
   ```
6. Clonar el archivo __.env.template__ y renombrar la copia a __.env__
y rellenar las variables con los valores que corresponda
## STOCK
- MongoDB
- NestJS
