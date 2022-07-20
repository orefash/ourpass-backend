
import { Entity, ObjectID, ObjectIdColumn, Column, BeforeInsert } from 'typeorm';

@Entity('posts')
export class PostEntity {
    @ObjectIdColumn() id: ObjectID;
    @ObjectIdColumn() ownerId: ObjectID;
    @Column() ownerEmail: string;
    @Column() category: string;
    @Column() text: string;

   
}