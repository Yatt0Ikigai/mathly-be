import { PassportSerializer } from '@nestjs/passport';
import { AuthService, UserDetails } from '../auth.service';
type DeserializedUser = {
  id: string;
  email: string;
  name: string | null;
};

export class SessionSerializer extends PassportSerializer {
  constructor(private readonly AuthService: AuthService) {
    super();
  }

  serializeUser(
    user: UserDetails,
    done: (err: any, user?: UserDetails) => void,
  ) {
    done(null, user);
  }

  async deserializeUser(
    payload: { id: string },
    done: (err: any, user: DeserializedUser | null) => void,
  ) {
    const user = await this.AuthService.findUser(payload.id);
    return user
      ? done(null, { email: user.email, id: user.email, name: user.name })
      : done(null, null);
  }
}
