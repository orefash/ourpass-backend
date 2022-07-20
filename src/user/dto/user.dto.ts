
import { IsEmail, IsNotEmpty } from "class-validator";
import { ObjectID } from "typeorm";

export class UserDto {  
    @IsNotEmpty()  username: string;
    @IsNotEmpty()  email: string;
    @IsNotEmpty()  id: ObjectID;
}