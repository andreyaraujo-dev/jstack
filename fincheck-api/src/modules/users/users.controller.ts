import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ActiveUserId } from '../../shared/decorators/active-user-id';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async me(@ActiveUserId() userId: string) {
    return this.usersService.getUserById(userId);
  }
}
