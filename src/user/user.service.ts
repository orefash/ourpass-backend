import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostService } from 'src/post/post.service';
import { toUserDto } from 'src/shared/mapper';
import { comparePasswords } from 'src/shared/utils';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {

    constructor(
        @Inject(forwardRef(() => PostService))
        private readonly postService: PostService,
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,) { }

    async findOne(options?: object): Promise<UserDto> {
        try {
            const user = await this.userRepo.findOne(options);

            
            return toUserDto(user);
        } catch (error) {
            return null
        }
    }

    async findByLogin({ email, password }: LoginUserDto): Promise<UserDto> {
        const user = await this.userRepo.findOne({ where: { email } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        // compare passwords    
        const areEqual = await comparePasswords(user.password, password);

        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return toUserDto(user);
    }

    async findByPayload({ id }: any): Promise<UserDto> {
        return await this.findOne({
            where: { id }
        });
    }

    async findByEmail({ email }: any): Promise<UserDto> {
        try {
            const user = await this.userRepo.findOne({where: {email}});

            
            return toUserDto(user);
        } catch (error) {
            return null
        }
    }

    async create(userDto: CreateUserDto): Promise<UserDto> {
        const { username, password, email } = userDto;

        // check if the user exists in the db    
        const userInDb = await this.userRepo.findOne({
            where: { email }
        });
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const user: UserEntity = await this.userRepo.create({ username, password, email, });
        await this.userRepo.save(user);
        return toUserDto(user);
    }

    get(): Promise<UserEntity[]> {
        return this.userRepo.find();
    }

    async deleteUser(param: { userId: string }) {
        try {
            let status = { success: false, message: "User Does not Exist" }
            const result = await this.userRepo.delete(param.userId);
            if (result && result.affected === 1) {
                status = {
                    success: true,
                    message: "Successfully deleted USer"
                }

            }
            return status;
        } catch (error) {
            throw new HttpException('Delete Error', HttpStatus.BAD_REQUEST);
        }

    }

    editUser(param: { userId: number }, body: any) {
        return { message: `User Edit successfully`, param, body }
    }

    // loginUser(body: any){
    //     return {message: "User login", body}
    // }

    logoutUser(body: any) {
        return { message: "User logout", body }
    }

    forgotPassword(body: any) {
        return { message: "Forgot Password", body }
    }

    resetPassword(body: any) {
        return { message: "Reset Password", body }
    }

    async getUserPosts({ ownerId }) {
        return await this.postService.getByUser({ ownerId })
    }
}
