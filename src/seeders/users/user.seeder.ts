import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Seeder, DataFactory } from "nestjs-seeder";
import { Repository } from "typeorm";
import { UserEntity } from "./user-seed.entity";

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(@InjectRepository(UserEntity) private readonly user: Repository<UserEntity>) {}

  async seed(): Promise<any> {
    // Generate 10 users.
    const users = DataFactory.createForClass(UserEntity).generate(10);

    // Insert into the database.
    const nusers = this.user.create(users);
    await this.user.save(users);
    return nusers;
  }

  async drop(): Promise<any> {
    return this.user.delete({});
  }
}