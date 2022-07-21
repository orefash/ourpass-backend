import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Seeder, DataFactory } from "nestjs-seeder";
import { Repository } from "typeorm";
import { PostEntity } from "./post-seed.entity";

@Injectable()
export class PostsSeeder implements Seeder {
  constructor(@InjectRepository(PostEntity) private readonly post: Repository<PostEntity>) {}

  async seed(): Promise<any> {
    // Generate 10 posts.
    const posts = DataFactory.createForClass(PostEntity).generate(5);

    // Insert into the database.
    const nposts = this.post.create(posts);
    await this.post.save(posts);
    return nposts;
  }

  async drop(): Promise<any> {
    return this.post.delete({});
  }
}