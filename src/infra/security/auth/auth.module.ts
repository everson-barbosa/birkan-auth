import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtConfigModule } from '../jwt/jwt-config.module';
import { EnvService } from 'src/infra/env/env.service';

@Module({
  imports: [PassportModule, JwtConfigModule],
  providers: [JwtStrategy, EnvService],
})
export class AuthModule {}
