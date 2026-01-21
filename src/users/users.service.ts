import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    //inyeccion del repositorio de usuarios
    @InjectRepository(User)
    //repositorio de usuarios
    private usersRepository: Repository<User>,
  ) {}

  //method to get all users
  async findAll() {
    //obtiene todos los usuarios de la base de datos
    const users = await this.usersRepository.find({
      order: {
        id: 'ASC',
      },
    });
    //si no hay usuarios, lanza una excepcion
    if (users.length === 0) {
      throw new NotFoundException('No se encontraron usuarios.');
    }
    //retorna los usuarios encontrados
    return users;
  }
  //method to find user by ID
  async findById(id: number) {
    //busca el usuario por ID
    const user = await this.findUserIndexById(id);
    //si el ID es 3, lanza una excepcion de acceso prohibido
    if (user.id === 3) {
      throw new ForbiddenException('No tienes permiso para acceder a este usuario.');
    }
    return user;
  }
  //method to create a new user
  async createUser(body: CreateUserDto) {
    //crea un nuevo usuario
    try {
      //guarda el nuevo usuario en la base de datos
      const newUser = await this.usersRepository.save(body);
      //retorna el nuevo usuario creado
      return newUser;
    } catch {
      throw new ForbiddenException('Error al crear el usuario.');
    }
  }
  //method to delete a user by ID
  async deleteUser(id: number) {
    //busca el usuario por ID
    const user = await this.findUserIndexById(id);
    //elimina el usuario
    await this.usersRepository.delete(user.id);
    //retorna un mensaje de confirmacion
    return { message: `Usuario con id ${user.id} eliminado correctamente` };
  }
  //method to update a user by ID
  async updateUser(id: number, changes: UpdateUserDto) {
    //busca el usuario por ID
    //const user = await this.findUserIndexById(id);
    const user = await this.findUserWithProfileById(id);
    //actualiza el usuario con los cambios proporcionados
    //console.log('Usuario antes de la actualización:', user);
    const updatedUser = this.usersRepository.merge(user, changes);
    //console.log('Usuario después de la actualización:', updatedUser);
    //guarda el usuario actualizado
    try {
      const savedUser = await this.usersRepository.save(updatedUser);
      return savedUser;
    } catch {
      throw new ForbiddenException('Error al actualizar el usuario.');
    }
  }
  //metodo privado para retronar posiionn del usuario en el array
  private async findUserIndexById(id: number) {
    //busca el usuario por ID
    const user = await this.usersRepository.findOneBy({ id });
    //si no encuentra el usuario, lanza una excepcion
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    //retorna el usuario
    return user;
  }

  //metodo privado para retronar el usuario con su profile por ID
  private async findUserWithProfileById(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return user;
  }
}
