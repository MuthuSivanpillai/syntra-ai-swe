import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body('fullName') fullName: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: string,
    @Body('companyName') companyName?: string,
    @Body('universityName') universityName?: string,
  ) {
    return this.userService.createUser(
      fullName,
      email,
      password,
      role,
      companyName,
      universityName,
    );
  }

  @Get()
  async getAllUsers() {
    return this.userService.findAllUsers();
  }
}
