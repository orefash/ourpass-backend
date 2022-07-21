
import { Entity, ObjectID, ObjectIdColumn, Column, BeforeInsert } from 'typeorm';
import { Factory } from "nestjs-seeder";
const crypto = require("crypto");



@Entity('posts')
export class PostEntity {
    @ObjectIdColumn() id: ObjectID;

    @Factory(() => {
        const id = crypto.randomBytes(16).toString("hex");

        return id
      })  
    @Column() 
    ownerId: string;

    @Factory(() => {
        const minAge = 18;
        const maxAge = 30;
        const num = Math.round(Math.random() * (maxAge - minAge) + minAge);
        return `test${num}@mail.com`
      })      
    @Column() 
    ownerEmail: string;

    @Factory(faker => faker.random.arrayElement(["News", "Business", "Politics"]))   
    @Column() 
    category: string;

    @Factory(() => {
        const minAge = 18;
        const maxAge = 30;
        const num = Math.round(Math.random() * (maxAge - minAge) + minAge);
        return `Post: ${num}`
      }) 
    @Column() 
    text: string;

   
}