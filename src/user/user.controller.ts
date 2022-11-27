import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findById(id);
    return user[0];
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<number> {
    return this.userService.createUser(createUserDto);
  }
}
