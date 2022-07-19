import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
}