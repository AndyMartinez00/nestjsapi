import { ForbiddenException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './user.dt';

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
  //method to create a new user
  createUser(body: CreateUserDto) {
    //valida email duplicado
    this.validarEmailDuplicado(body.email);
    //generate new ID
    const maxId = this.users.reduce((max, u) => {
      const current = Number(u.id);
      return Number.isNaN(current) ? max : Math.max(max, current);
    }, 0);
    //creamos el nuevo usuario
    const id = String(maxId + 1);
    const newUser: User = { id: id, name: body.name, email: body.email };
    this.users.push(newUser);
    return newUser;
  }
  // Validación: email duplicado
  private validarEmailDuplicado(email: string, idActual: string | null = null): boolean {
    const emailLower = email.toLowerCase();

    const emailExists = this.users.some(function (u) {
      return u.email.toLowerCase() === emailLower && (idActual ? u.id !== idActual : true);
    });

    if (emailExists) {
      throw new UnprocessableEntityException('Ya existe un usuario con ese correo.');
    }

    return false; // no hay duplicado
  }
  //method to delete a user by ID
  deleteUser(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    //const user = this.users.find((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    const deletedUser = this.users.splice(userIndex, 1)[0];
    return deletedUser;
  }
}
