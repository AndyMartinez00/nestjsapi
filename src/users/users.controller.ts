import { Controller, Get, Param, Post, Body, NotFoundException, Delete, Put, UnprocessableEntityException, ForbiddenException } from '@nestjs/common';
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
  /*
  //Put /users/id
  @Put(':id')
  //method to update a user by ID and body
  updateUserById(@Param('id') id: string, @Body() changes: UpdateUserDto) {
    console.log(`Updating user with ID ${id}`, changes);
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    //valida email duplicado si los cambios incluyen email
    if (changes.email) {
      this.validarEmailDuplicado(changes.email, id);
    }
    const existingUser = this.users[userIndex];
    const updatedUser = {
      ...existingUser,
      ...changes,
    };
    this.users[userIndex] = updatedUser;
    //return updatedUser;
    return {
      message: `Usuario con id ${updatedUser.id} actualizado exitosamente`,
      updatedUser,
    };
  }

  // ======================================================
  // 🔐 Función privada de validación dentro del controlador
  // ======================================================
  private validarNuevoUsuario(body: User, idActual: string | null = null) {
    const name = (body.name || '').trim();
    const email = (body.email || '').trim().toLowerCase();

    // Validación: nombre obligatorio
    if (!name) {
      throw new UnprocessableEntityException('El nombre es obligatorio.');
    }

    // Validación: email obligatorio
    if (!email) {
      throw new UnprocessableEntityException('El correo es obligatorio.');
    }

    // Validación: formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new UnprocessableEntityException('El correo no tiene un formato válido.');
    }

    // Validación: email duplicado
    //const emailExists = this.users.some((u) => u.email.toLowerCase() === email && (idActual ? u.id !== idActual : true));
    const emailExists = this.users.some(function (u) {
      // Uso de función tradicional para mayor claridad
      // Verifica si el email ya existe en otro usuario
      // Si idActual es proporcionado, excluye ese usuario de la verificación
      // Retorna true si encuentra un email duplicado
      return u.email.toLowerCase() === email && (idActual ? u.id !== idActual : true);
    });

    if (emailExists) {
      throw new UnprocessableEntityException('Ya existe un usuario con ese correo.');
    }

    // Retornar valores ya normalizados
    return { name, email };
  }
  // ======================================================
  */
}
