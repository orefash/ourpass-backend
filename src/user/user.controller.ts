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

    @Delete()
    delete(@Param() param: {userId: number}){
        return this.userService.deleteUser(param);
    }

    @Patch()
    edit(@Body() body: any, @Param() param: {userId: number}){
        return this.userService.editUser(body, param);
    }

    @Post()
    login(@Body() body:any){
        return this.userService.loginUser(body);
    }

    @Post()
    logout(@Param() param: {userId: number}){
        return this.userService.logoutUser(param);
    }

    @Post()
    forgotPassword(@Param() param: {email: string}){
        return this.userService.forgotPassword(param);
    }

    @Post()
    resetPassword(@Body() body: any){
        return this.userService.resetPassword(body)
    }

    @Post()
    getPosts(@Param() param: {userId: number}){
        return this.userService.getUserPosts(param);
    }
}