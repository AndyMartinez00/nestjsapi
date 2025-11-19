import { Controller, Get, Param, Post, Body, NotFoundException, Delete } from '@nestjs/common';

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

  //POST /users
  @Post()
  //method to create a new user
  //createUser(@Body() body: { name: string; email: string }) {
  createUser(@Body() body: User) {
    console.log('Creating a new user', body);
    const maxId = this.users.reduce((max, u) => Math.max(max, Number(u.id)), 0);
    const id = String(maxId + 1);
    const newUser: User = { id, name: body.name, email: body.email };
    this.users.push(newUser);
    return newUser;
  }
  //DELETE /users/id
  @Delete(':id')
  //method to delete a user by ID
  deleteUsareById(@Param('id') id: string) {
    console.log(`Deleting user with ID ${id}`);
    const userIndex = this.users.findIndex((user) => user.id === id);
    //const user = this.users.find((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    const deletedUser = this.users.splice(userIndex, 1)[0];
    //return deletedUser;
    return {
      message: `Usuario con id ${id} eliminado exitosamente`,
      deletedUser,
    };
  }
}
