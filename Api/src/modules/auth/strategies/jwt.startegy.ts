import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      private _configService: ConfigService,
      private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _configService.get<string>('JWT_SECRET'),
      usernameField: 'email' 
    });
  }
 
  async validate(payload: any) {
    // console.log('payload', payload);
    
    return { userId: payload.sub, usernameField: payload.email, isAdmin: payload.isAdmin, regions: payload.regions };
  }
}