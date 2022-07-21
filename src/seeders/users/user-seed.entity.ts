import { Entity, Column, BeforeInsert, ObjectIdColumn, ObjectID } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Factory } from "nestjs-seeder";

@Entity('users')
export class UserEntity {
    
    @ObjectIdColumn() id: ObjectID;
    
    @Factory(faker => faker.name.findName())
    @Column() 
    username: string;
    
    @Factory(() => {
        const minAge = 18;
        const maxAge = 30;
        const num = Math.round(Math.random() * (maxAge - minAge) + minAge);
        return `test${num}@mail.com`
      })      
    @Column() 
    email: string;

    @Factory('password')
    @Column() 
    password: string;

    @BeforeInsert()  async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }
}