import { Controller, Get, Param, Post, Body, NotFoundException, Delete, Put, UnprocessableEntityException, ForbiddenException } from '@nestjs/common';

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
    { id: '4', name: 'Alice finner', email: 'afinner@test.com' },
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
    // Forbidden access to user with ID 3
    if (user.id === '3') {
      throw new ForbiddenException('No tienes permiso para acceder a este usuario.');
    }
    return user;
  }

  //POST /users
  @Post()
  //method to create a new user
  //createUser(@Body() body: { name: string; email: string }) {
  createUser(@Body() body: User) {
    console.log('Creating a new user', body);
    //valida del objeto body
    const { name, email } = this.validarNuevoUsuario(body);
    //generate new ID
    const maxId = this.users.reduce((max, u) => {
      const current = Number(u.id);
      return Number.isNaN(current) ? max : Math.max(max, current);
    }, 0);
    //const maxId = this.users.reduce((max, u) => Math.max(max, Number(u.id)), 0);
    const id = String(maxId + 1);
    const newUser: User = { id, name: name, email: email };
    //add new user to users array
    this.users.push(newUser);
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
  //Put /users/id
  @Put(':id')
  //method to update a user by ID and body
  updateUserById(@Param('id') id: string, @Body() changes: User) {
    console.log(`Updating user with ID ${id}`, changes);
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    const { name, email } = this.validarNuevoUsuario(changes, id);
    changes.name = name;
    changes.email = email;
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
}
