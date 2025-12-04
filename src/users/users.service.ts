import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UsersService {
  //property to hold users data tiped as User array from user.model.ts
  private users: User[] = [
    { id: '1', name: 'John Doe', email: 'jdoe@test.com' },
    { id: '2', name: 'Jane Smith', email: 'jsmith@test.com' },
    { id: '3', name: 'Alice Johnson pentes', email: 'ajohnson@test.com' },
    { id: '4', name: 'Alice finner', email: 'afinner@test.com' },
  ];
  //method to get all users
  findAll() {
    //if no users, throw error
    if (!this.users) {
      throw new NotFoundException('No users found');
    }
    return this.users;
  }
  //method to find user by ID
  findById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    // Forbidden access to user with ID 3
    if (user.id === '3') {
      throw new ForbiddenException('No tienes permiso para acceder a este usuario.');
    }
    return user;
  }
}
