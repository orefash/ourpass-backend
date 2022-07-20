import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObjectID } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller("v1/users")
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    getUsers() {
        return this.userService.get();
    }


    @Delete("/:userId")
    delete(@Param() param: { userId: string }) {
        return this.userService.deleteUser(param);
    }

    @Patch("/:userId")
    edit(@Body() body: any, @Param() param: { userId: number }) {
        return this.userService.editUser(body, param);
    }


    @Post("/logout")
    logout(@Body() body: any) {
        return this.userService.logoutUser(body);
    }

    @Post("/forgotPassword")
    forgotPassword(@Body() body: any) {
        return this.userService.forgotPassword(body);
    }

    @Post("/resetPassword")
    resetPassword(@Body() body: any) {
        return this.userService.resetPassword(body)
    }


    @Get("/:ownerId/posts")    
    @UseGuards(AuthGuard('jwt')) 
    getPostsByUser(@Param() param: { ownerId: ObjectID }) {
        return this.userService.getUserPosts(param);
    }
}