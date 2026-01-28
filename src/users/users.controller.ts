import { Controller, Get, Param, Post, Body, Delete, Put, ParseIntPipe, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dt';
import { UsersService } from './users.service';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dtos/user-response.dt';

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
  //GET /users/id
  @Get(':id')
  //method to get user by dynamic ID
  getUserById(@Param('id', ParseIntPipe) id: number) {
    console.log(`Fetching user with IN ID ${id}`);
    //call service method to find user by ID
    const user = this.usersService.findById(id);
    return user;
  }
  //GET /userprofile/id
  @Get('profile/:id')
  //method to get user profile by dynamic ID
  getUserProfileById(@Param('id', ParseIntPipe) id: number) {
    console.log(`Fetching user profile with IN ID ${id}`);
    //call service method to find user by ID
    const user = this.usersService.findUserWithProfileById(id);
    //retornamos el usuario transformado a UserResponseDto
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  //POST /users
  @Post()
  //method to create a new user
  //createUser(@Body() body: { name: string; email: string }) {
  //usando DTO para mejor estructura y validación
  @UseInterceptors(ClassSerializerInterceptor)
  createUser(@Body() body: CreateUserDto) {
    console.log('Creating a new user', body);
    //call service method to create a new user
    const newUser = this.usersService.createUser(body);
    //retornamos el usuario transformado a UserResponseDto
    return plainToInstance(UserResponseDto, newUser, {
      excludeExtraneousValues: true,
    });
  }
  //DELETE /users/id
  @Delete(':id')
  //method to delete a user by ID
  deleteUsareById(@Param('id', ParseIntPipe) id: number) {
    console.log(`Deleting user with ID ${id}`);
    //call service method to delete user by ID
    const deletedUser = this.usersService.deleteUser(id);
    //return deletedUser;
    return deletedUser;
  }
  //Put /users/id
  @Put(':id')
  //method to update a user by ID and body
  updateUserById(@Param('id', ParseIntPipe) id: number, @Body() changes: UpdateUserDto) {
    console.log(`Updating user with ID ${id}`, changes);
    //call service method to update user by ID
    const updatedUser = this.usersService.updateUser(id, changes);
    //return updatedUser
    return updatedUser;
  }
}
