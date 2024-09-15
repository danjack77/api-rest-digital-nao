import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { find } from 'rxjs';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        private jwtService : JwtService
      ) {}

    async register(userObject: RegisterAuthDto){
        const { password } = userObject;
        const plainToHash = await hash(password,10)
        userObject = { ...userObject, password: plainToHash}
        const usuario = this.usuarioRepository.create(userObject);
        return await this.usuarioRepository.save(usuario);
    }

    async login(userObjectLogin: LoginAuthDto) {
        const { correo, password} = userObjectLogin;
        const findUser = await this.usuarioRepository.findOneBy({ correo });
        if(!findUser) new HttpException('USER_NOT_FOUND',404);
        
        const checkPassword = await compare(password,findUser.password)
        
        if(!checkPassword)  throw new HttpException('PASSWORD_INCORRECT',403);

        const payload = { id: findUser.id, name: findUser.nombre};
        const token = this.jwtService.sign(payload);

        const data = {
            user : findUser,
            token
        }

        return data;
    }


}
