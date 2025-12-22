--ejcuatar serivor de desarollo
PS D:\content\vpn\platzi\nestjs\my-blog-api> npm run start:dev

--crenado un controler con el CLI de nest [nest g controller users]
PS D:\content\vpn\platzi\nestjs\my-blog-api> nest g controller users

--formats con prettier
Para abrir la paleta de comandos,
puede usar COMMAND + SHIFT + P en macOS
o CTRL + SHIFT + P en Windows.
En la paleta de comandos, busque format y seleccione Format Document.
DTO: (Data Transfer Object) -->(Objeto de Transferencia de Datos)

--instalando clas validator npm i --save class-validator class-transformer
PS D:\content\vpn\platzi\nestjs\my-blog-api> npm i --save class-validator class-transformer
added 5 packages, and audited 735 packages in 16s

136 packages are looking for funding
run `npm fund` for details

4 vulnerabilities (2 moderate, 2 high)

To address all issues, run:
npm audit fix

Run `npm audit` for details.

--para dar fromato a todo el proyecto npm run format
PS D:\content\vpn\platzi\nestjs\my-blog-api> npm run format

> my-blog-api@0.0.1 format
> prettier --write "src/**/\*.ts" "test/**/\*.ts"

src/app.controller.spec.ts 162ms
src/app.controller.ts 8ms
src/app.module.ts 6ms
src/app.service.ts 2ms
src/main.ts 6ms (unchanged)
src/users/user.dt.ts 3ms (unchanged)
src/users/users.controller.spec.ts 6ms
src/users/users.controller.ts 53ms (unchanged)
test/app.e2e-spec.ts 9ms

--crenado un servicio con el CLI de nest [nest g service users]
PS D:\content\vpn\platzi\nestjs\my-blog-api> nest g service users
CREATE src/users/users.service.ts (93 bytes)
CREATE src/users/users.service.spec.ts (471 bytes)
UPDATE src/app.module.ts (394 bytes)

--instalando Configuration [.env] npm i --save @nestjs/config
PS D:\content\vpn\platzi\nestjs\my-blog-api> npm i --save @nestjs/config

added 3 packages, and audited 712 packages in 8s

137 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities

--modulo crear y organizar módulos en una aplicación NestJS [nest g mo users]
PS D:\content\vpn\platzi\nestjs\my-blog-api> nest g mo users
CREATE src/users/users.module.ts (86 bytes)
UPDATE src/app.module.ts (645 bytes)

--instalar TypeORM y conectarlo a PostgreSQL npm install @nestjs/typeorm typeorm pg
PS D:\content\vpn\platzi\nestjs\my-blog-api> npm install --save @nestjs/typeorm typeorm pg

added 36 packages, and audited 748 packages in 34s

151 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities

[GET] http://localhost:3000/
Hello World
[GT]http://localhost:3000/users-count/
Fetching users count and details from UsersService to verify injection works in AppController
[GET] http://localhost:3000/users
Fetching all users
[GET] http://localhost:3000/users/1
Fetching user with ID 1
[GET] http://localhost:3000/users/2
Fetching user with ID 2
[GET] http://localhost:3000/users/3
Fetching user with IN ID 3
[POST] http://localhost:3000/users/
{"id": "2","name": "Jane Smith","email": "jsmith@test.com"}
Creating a new user
[DELETE] http://localhost:3000/users/2
Deleting user with ID 2
[PUT] http://localhost:3000/users/3
{"name":"Ruleser Smith actulizado","email":"rsmith@test.com"}
Updating user with ID 3 { name: 'Ruleser Smith actulizado', email: 'rsmith@test.com' }
