import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstanst } from './jwt.constants';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]),
  JwtModule.register({
      secret : jwtConstanst.secret
  })
],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
