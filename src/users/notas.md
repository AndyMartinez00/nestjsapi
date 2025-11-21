--ejcuatar serivor de desarollo
PS D:\content\vpn\platzi\nestjs\my-blog-api> npm run start:dev
--crenado un controler con el CLI de nest [nest g controller users]
PS D:\content\vpn\platzi\nestjs\my-blog-api> nest g controller users

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

