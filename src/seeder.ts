import { seeder } from "nestjs-seeder";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./seeders/users/user-seed.entity";
import { UsersSeeder } from "./seeders/users/user.seeder";

seeder({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mongodb',
        // url: process.env.MONGO_URI,
        url: "mongodb+srv://admin:admin@cluster0.b0egw.mongodb.net/ourpass2?retryWrites=true&w=majority",
        database: process.env.MONGO_DB,
        entities: [
          __dirname + '/**/*.entity{.ts,.js}',
        ],
        // ssl: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
      }),
      TypeOrmModule.forFeature([UserEntity])],
  
}).run([UsersSeeder]);