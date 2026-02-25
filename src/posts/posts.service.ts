import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    //inyeccion del repositorio de posts
    @InjectRepository(Post)
    //repositorio de posts
    private postsRepository: Repository<Post>,
  ) {}

  //method to create a new post
  async create(createPostDto: CreatePostDto) {
    //crea un nuevo post
    try {
      //guarda el nuevo post en la base de datos
      const newPost = await this.postsRepository.save({
        //propiedades del post a crear, incluyendo el userId para asociar el post con un usuario
        //spread operator para copiar las propiedades del createPostDto al nuevo post
        ...createPostDto,
        //asocia el post con el usuario utilizando el userId proporcionado
        user: { id: createPostDto.userId }, //asocia el post con el usuario utilizando el userId proporcionadoS
      });
      //retorna el nuevo post creado buscando el post por su ID para incluir las relaciones necesarias (como el nombre del autor)
      return this.findPostById(newPost.id);
    } catch {
      throw new ForbiddenException('Error al crear el post.');
    }
  }

  //method to get all posts
  async findAll() {
    //obtiene todos los posts de la base de datos
    const posts = await this.postsRepository.find({
      order: {
        id: 'ASC',
      },
      relations: ['user.profile'],
    });
    //si no hay posts, lanza una excepcion
    if (posts.length === 0) {
      throw new NotFoundException('No se encontraron posts.');
    }
    //retorna los posts encontrados
    return posts;
  }

  //method to find post by ID
  async findOne(id: number) {
    //busca el post por ID
    const post = await this.findPostById(id);
    //retorna el post encontrado
    return post;
  }

  //method to update a post by ID
  async update(id: number, updatePostDto: UpdatePostDto) {
    //busca el post por ID
    const post = await this.findPostById(id);
    //actualiza el post con los cambios proporcionados
    const updatedPost = this.postsRepository.merge(post, updatePostDto);
    //guarda el post actualizado
    try {
      const savedPost = await this.postsRepository.save(updatedPost);
      return savedPost;
    } catch {
      throw new ForbiddenException('Error al actualizar el post.');
    }
  }

  //method to delete a post by ID
  async remove(id: number) {
    //busca el post por ID
    const post = await this.findPostById(id);

    if (!post) throw new NotFoundException('Post no encontrado.');

    //elimina el post de la base de datos
    try {
      await this.postsRepository.remove(post);
      return { message: 'Post eliminado con éxito' };
    } catch {
      throw new ForbiddenException('Error al eliminar el post.');
    }
  }

  //metodo privado para retornar el post por ID
  private async findPostById(id: number) {
    //busca el post por ID, incluyendo la relación con el usuario y su perfil para obtener el nombre del autor del post
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user.profile'], //incluye la relación con el usuario y su perfil para obtener el nombre del autor del post
    });
    //si no encuentra el post, lanza una excepcion
    if (!post) {
      throw new NotFoundException(`Post con id ${id} no encontrado`);
    }
    //retorna el post
    return post;
  }
}
