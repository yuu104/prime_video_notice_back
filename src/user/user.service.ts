import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  findById(user_id: string): Promise<User[]> {
    return this.userRepository.findById(user_id);
  }

  createUser(createUserDto: CreateUserDto): Promise<number> {
    return this.userRepository.createUser(createUserDto);
  }
}
