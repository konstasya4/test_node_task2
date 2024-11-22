import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('populate')
  async populate(): Promise<{ message: string }> {
    await this.userService.populateUsers();
    return { message: 'Users populated successfully!' };
  }

  @Get('reset-problems')
  async resetProblemsAndCountTrue(): Promise<{ count: number }> {
    const count = await this.userService.resetProblemsAndCountTrue();
    return { count };
  }
}
