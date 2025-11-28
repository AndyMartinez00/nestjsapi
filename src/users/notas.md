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

[GET] http://localhost:3000/
Hello World
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
