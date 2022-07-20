import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObjectID } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('v1/posts')
export class PostController {
    
    constructor(private readonly postService:
        PostService) { }

        @Post("/")
        @UseGuards(AuthGuard('jwt')) 
        createPost(@Body() body: CreatePostDto){
            return this.postService.create(body);
        }

        @Get("/")
        getAllPosts(){
            return this.postService.get();
        }

        
}
