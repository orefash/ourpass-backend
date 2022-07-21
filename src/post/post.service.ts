import { forwardRef, HttpException, HttpStatus, Injectable, Logger, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
    constructor(
        
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        @InjectRepository(PostEntity)
        private readonly postRepo: Repository<PostEntity>,
        ) { }

        async create(userPost: CreatePostDto): Promise<PostEntity> {
            const { ownerId, ownerEmail, category, text } = userPost;  
            
            
            const user = await this.userService.findByEmail(ownerEmail); 

            Logger.log("User: ", user)
    
            const post: PostEntity = await this.postRepo.create(userPost);
            await this.postRepo.save(post);
            return post;
        }

        get(): Promise<PostEntity[]> {
            return this.postRepo.find();
        }

        getByUser({ownerId}): Promise<PostEntity[]> {
            return this.postRepo.find({ where: { ownerId }});
        }

}
