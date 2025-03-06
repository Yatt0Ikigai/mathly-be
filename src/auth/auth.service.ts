import { Injectable } from '@nestjs/common';
import { UserService } from 'src/prisma/user/user.service';

export type UserDetails = {
  email: string;
  displayName: string;
};

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(details: UserDetails) {
    const user = await this.userService.user({
      email: details.email,
    });

    if (user) return user;
    return await this.userService.createUser({
      email: details.email,
      name: details.displayName,
    });
  }

  async findUser(id: string) {
    return await this.userService.user({
      id,
    });
  }
}
