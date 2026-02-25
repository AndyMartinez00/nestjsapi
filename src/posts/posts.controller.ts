import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const newPost = await this.postsService.create(createPostDto);
    return newPost;
    /*  return plainToInstance(PostResponseDto, newPost, {
      excludeExtraneousValues: true,
    }); */
  }

  @Get()
  async findAll() {
    const posts = await this.postsService.findAll();
    return posts;
    /* return plainToInstance(PostResponseDto, posts, {
      excludeExtraneousValues: true,
    }); */
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postsService.findOne(id);
    return post;
    /* return plainToInstance(PostResponseDto, post, {
      excludeExtraneousValues: true,
    }); */
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    const updatedPost = await this.postsService.update(id, updatePostDto);
    return updatedPost;
    /* return plainToInstance(PostResponseDto, updatedPost, {
      excludeExtraneousValues: true,
    }); */
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
