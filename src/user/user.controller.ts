import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller("/v1/users")
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getUsers(){
        return this.userService.get();
    }

    @Post()
    create(@Body() body: any){
        return this.userService.createUser(body);
    }

    @Delete("/:userId")
    delete(@Param() param: {userId: number}){
        return this.userService.deleteUser(param);
    }

    @Patch("/:userId")
    edit(@Body() body: any, @Param() param: {userId: number}){
        return this.userService.editUser(body, param);
    }

    @Post("/login")
    login(@Body() body:any){
        return this.userService.loginUser(body);
    }

    @Post("/logout")
    logout(@Body() body: any){
        return this.userService.logoutUser(body);
    }

    @Post("/forgotPassword")
    forgotPassword(@Body() body: any){
        return this.userService.forgotPassword(body);
    }

    @Post("/resetPassword")
    resetPassword(@Body() body: any){
        return this.userService.resetPassword(body)
    }

    @Post("/:userId/posts")
    getPosts(@Param() param: {userId: number}){
        return this.userService.getUserPosts(param);
    }
}