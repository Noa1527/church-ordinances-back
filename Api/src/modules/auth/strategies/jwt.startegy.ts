import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      private configService: ConfigService,
      private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      usernameField: 'email' 
    });
  }

  // async validate(payload: any) {
  //   return { userId: payload.sub, usernameField: payload.email, isAdmin: payload.isAdmin };
  // }
  async validate(payload: any) {
    // const isBlacklisted = this.authService.isBlacklisted(payload.jti);
    // if (isBlacklisted) {
    //   throw new UnauthorizedException();
    // }
    return { userId: payload.sub, usernameField: payload.email, isAdmin: payload.isAdmin };
  }
}