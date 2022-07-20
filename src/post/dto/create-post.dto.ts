import { IsEmail, IsNotEmpty } from "class-validator";
import { ObjectID } from "typeorm";

export class CreatePostDto { 
   
    @IsNotEmpty() ownerId: ObjectID;
    @IsNotEmpty() ownerEmail: string;
    @IsNotEmpty() category: string;
    @IsNotEmpty() text: string;
}
