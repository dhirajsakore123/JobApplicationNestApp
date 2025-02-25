import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from `Authorization` header
      ignoreExpiration: false, // Reject expired tokens
      secretOrKey: 'your_secret_key', // Must match the `JwtModule` secret
    });
  }

  async validate(payload: any) {
    // This function runs after token validation
    return { userId: payload.sub, email: payload.email }; // Attaches user info to `req.user`
  }
}
