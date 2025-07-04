import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { z } from 'zod';
import { EnvService } from '../../env/env.service';
import { Request } from 'express';
import { ACCESS_TOKEN_KEY } from './constants/access-token-key';
import { Buffer } from 'node:buffer';
import * as cookie from 'cookie'

const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
  iat: z.number().positive(),
  exp: z.number().positive()
});

export type UserPayload = z.infer<typeof tokenPayloadSchema>;


function extractAccessTokenFromHeader(req: Request) {
  const cookies = cookie.parse(req.headers.cookie || '')
  const accessToken = cookies[ACCESS_TOKEN_KEY]

  if (!accessToken) return null
  
  return accessToken;
}

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
