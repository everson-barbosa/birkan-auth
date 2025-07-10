import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { EnvService } from '../../env/env.service';
import { JwtConfigModule } from 'src/security/jwt/jwt-config.module';

@Module({
  imports: [PassportModule, JwtConfigModule],
  providers: [JwtStrategy, EnvService],
})
export class AuthModule {}
