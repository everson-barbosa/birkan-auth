import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { z } from 'zod';
import { EnvService } from '../../env/env.service';
import { Buffer } from 'node:buffer';
import { extractAccessTokenFromHeader } from './helpers/access-token-cookie.helper';

const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
  iat: z.number().positive(),
  exp: z.number().positive(),
});

export type UserPayload = z.infer<typeof tokenPayloadSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: EnvService) {
    const publicKey = config.get('JWT_PUBLIC_KEY');

    super({
      jwtFromRequest: extractAccessTokenFromHeader,
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: UserPayload) {
    return tokenPayloadSchema.parse(payload);
  }
}
