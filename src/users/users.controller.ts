import { Controller, Get, Param, NotFoundException } from '@nestjs/common';

//interface User definition
interface User {
  id: string;
  name: string;
  email: string;
}

//users controller
@Controller('users')
export class UsersController {
  private users: User[] = [
    { id: '1', name: 'John Doe', email: 'jdoe@test.com' },
    { id: '2', name: 'Jane Smith', email: 'jsmith@test.com' },
    { id: '3', name: 'Alice Johnson pentes', email: 'ajohnson@test.com' },
  ];
  //GET /users
  @Get()
  //method to get all users
  getAllUsers() {
    console.log('Fetching all users');
    return this.users;
  }

  //GET /users/1
  @Get('/1')
  //method to get user by ID 1
  getUserById1() {
    console.log('Fetching user with ID 1');
    return this.users.find((user) => user.id === '1');
  }

  //GET /users/2
  @Get('/2')
  //method to get user by ID 2
  getUserById2() {
    console.log('Fetching user with ID 2');
    return this.users.find((user) => user.id === '2');
  }
  //GET /users/id
  @Get(':id')
  //method to get user by dynamic ID
  getUserById(@Param('id') id: string) {
    console.log(`Fetching user with IN ID ${id}`);
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }
}
