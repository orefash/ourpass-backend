import { seeder } from "nestjs-seeder";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./seeders/users/user-seed.entity";
import { UsersSeeder } from "./seeders/users/user.seeder";
import { PostEntity } from "./seeders/posts/post-seed.entity";
import { PostsSeeder } from "./seeders/posts/post.seeder";

seeder({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mongodb',
        url: "{ YOUR DB uRI }",
        database: process.env.MONGO_DB,
        entities: [
          __dirname + '/**/*.entity{.ts,.js}',
        ],
        // ssl: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
      }),
      TypeOrmModule.forFeature([UserEntity, PostEntity])],
  
}).run([UsersSeeder, PostsSeeder]);