import { Entity, ObjectID, ObjectIdColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class UserEntity {
    @ObjectIdColumn() id: ObjectID;
    @Column() username: string;
    @Column() email: string;
    @Column() password: string;

    @BeforeInsert()  async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }
}