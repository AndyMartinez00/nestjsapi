import { ForbiddenException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

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
    const userIndex = this.findUserIndexById(id);
    const user = this.users[userIndex];
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
    const userIndex = this.findUserIndexById(id);
    //elimina el usuario del array
    const deletedUser = this.users.splice(userIndex, 1)[0];
    return deletedUser;
  }
  //method to update a user by ID
  updateUser(id: string, changes: UpdateUserDto) {
    const userIndex = this.findUserIndexById(id);
    //valida email duplicado si los cambios incluyen email
    if (changes.email) {
      this.validarEmailDuplicado(changes.email, id);
    }
    //actualiza el usuario
    const existingUser = this.users[userIndex];
    const updatedUser = {
      ...existingUser,
      ...changes,
    };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }
  //metodo privado para retronar posiionn del usuario en el array
  private findUserIndexById(id: string): number {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return userIndex;
  }
}
