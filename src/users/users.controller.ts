import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dt';
import { UsersService } from './users.service';

//users controller
@Controller('users')
export class UsersController {
  //injection of UsersService
  //one instance of UsersService for this controller
  constructor(private usersService: UsersService) {}
  //GET /users
  @Get()
  //method to get all users
  getAllUsers() {
    console.log('Fetching all users');
    //call service method to get all users
    return this.usersService.findAll();
  }
  //GET /users/1
  @Get('/1')
  //method to get user by ID 1
  getUserById1() {
    console.log('Fetching user with ID 1');
    //call service method to get all users and find user with ID 1
    //the  find is method of findAll() result  de un array users
    return this.usersService.findAll().find((user) => user.id === '1');
  }
  //GET /users/2
  @Get('/2')
  //method to get user by ID 2
  getUserById2() {
    console.log('Fetching user with ID 2');
    //call service method to get all users and find user with ID 1
    //the  find is method of findAll() result  de un array users
    return this.usersService.findAll().find((user) => user.id === '2');
  }
  //GET /users/id
  @Get(':id')
  //method to get user by dynamic ID
  getUserById(@Param('id') id: string) {
    console.log(`Fetching user with IN ID ${id}`);
    //call service method to find user by ID
    const user = this.usersService.findById(id);
    return user;
  }
  //POST /users
  @Post()
  //method to create a new user
  //createUser(@Body() body: { name: string; email: string }) {
  createUser(@Body() body: CreateUserDto) {
    console.log('Creating a new user', body);
    //call service method to create a new user
    const newUser = this.usersService.createUser(body);
    return {
      message: `Usuario con id ${newUser.id} creado exitosamente`,
      newUser,
    };
  }
  //DELETE /users/id
  @Delete(':id')
  //method to delete a user by ID
  deleteUsareById(@Param('id') id: string) {
    console.log(`Deleting user with ID ${id}`);
    //call service method to delete user by ID
    const deletedUser = this.usersService.deleteUser(id);
    //return deletedUser;
    return {
      message: `Usuario con id ${id} eliminado exitosamente`,
      deletedUser,
    };
  }
  //Put /users/id
  @Put(':id')
  //method to update a user by ID and body
  updateUserById(@Param('id') id: string, @Body() changes: UpdateUserDto) {
    console.log(`Updating user with ID ${id}`, changes);
    //call service method to update user by ID
    const updatedUser = this.usersService.updateUser(id, changes);
    //return updatedUser
    return {
      message: `Usuario con id ${updatedUser.id} actualizado exitosamente`,
      updatedUser,
    };
  }
}
