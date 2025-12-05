import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    //injection of AppService and UsersService
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    //accessing a configuration value using ConfigService
    const myVar = this.configService.get<string>('MY_VAR');
    //calling method from AppService
    const message = this.appService.getHello();
    //logging values to the console
    console.log(`Configuration value MY_VAR: ${myVar}`);
    console.log(`Message from AppService: ${message}`);
    //combining and returning the message
    const united = `${message} ${myVar}`;
    return united;
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
