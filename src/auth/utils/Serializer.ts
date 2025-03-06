import { PassportSerializer } from '@nestjs/passport';
import { AuthService, UserDetails } from '../auth.service';

export class SessionSerializer extends PassportSerializer {
  constructor(private readonly AuthService: AuthService) {
    super();
  }

  serializeUser(user: UserDetails, done: Function) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.AuthService.findUser(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}
