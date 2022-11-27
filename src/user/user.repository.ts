import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserRepository extends PrismaService {
  async findById(user_id: string): Promise<User[]> {
    const user = await this.$queryRaw<
      User[]
    >`SELECT * FROM users WHERE id=${user_id}`;

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<number> {
    const { id, mail } = createUserDto;
    const result = await this
      .$executeRaw`INSERT INTO users (id, mail) VALUES (${id}, ${mail})`;

    return result;
  }
}
