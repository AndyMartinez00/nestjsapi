import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    //injection of AppService and UsersService
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  //GET /users-count
  @Get('users-count')
  //method to get the count of users
  getUsersCount() {
    console.log('Fetching users count and details from UsersService to verify injection works in AppController');
    //call service method to get all users and return the count
    const users = this.usersService.findAll();
    return { count: users.length, users: users };
  }
}
