import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { hash, compare } from 'bcrypt';
import { HttpException } from '@nestjs/common';


jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let usuarioRepository: Repository<Usuario>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Usuario),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
    usuarioRepository = module.get<Repository<Usuario>>(getRepositoryToken(Usuario));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should hash the password and save the user', async () => {
      const registerDto: RegisterAuthDto = {
        nombre: 'John Doe',
        correo: 'john@example.com',
        password: '123456',
      };

      (hash as jest.Mock).mockResolvedValue('hashedPassword');
      const createdUser = { id: 1, ...registerDto, password: 'hashedPassword',rol:'admin',correo:'examen@gmail.com' };
      jest.spyOn(usuarioRepository, 'create').mockReturnValue(createdUser);
      jest.spyOn(usuarioRepository, 'save').mockResolvedValue(createdUser);

      const result = await service.register(registerDto);

      expect(hash).toHaveBeenCalledWith('123456', 10);
      expect(usuarioRepository.create).toHaveBeenCalledWith({ ...registerDto, password: 'hashedPassword' });
      expect(usuarioRepository.save).toHaveBeenCalledWith(createdUser);
      expect(result).toEqual(createdUser);
    });
  });

  describe('login', () => {
    it('should return user data and token if login is successful', async () => {
      const loginDto: LoginAuthDto = {
        correo: 'john@example.com',
        password: '123456',
      };

      const user = {
        id: 1,
        nombre: 'John Doe',
        correo: 'john@example.com',
        password: 'hashedPassword',
        rol: ''
      };

      jest.spyOn(usuarioRepository, 'findOneBy').mockResolvedValue(user);
      (compare as jest.Mock).mockResolvedValue(true);
      jwtService.sign = jest.fn().mockReturnValue('jwt_token');

      const result = await service.login(loginDto);

      expect(usuarioRepository.findOneBy).toHaveBeenCalledWith({ correo: 'john@example.com' });
      expect(compare).toHaveBeenCalledWith('123456', 'hashedPassword');
      expect(jwtService.sign).toHaveBeenCalledWith({ id: 1, name: 'John Doe' });
      expect(result).toEqual({
        user,
        token: 'jwt_token',
      });
    });

    it('should throw an exception if the user is not found', async () => {
      jest.spyOn(usuarioRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.login({ correo: 'notfound@example.com', password: '123456' }))
        .rejects
        .toThrow(new HttpException('USER_NOT_FOUND', 404));
    });

    it('should throw an exception if the password is incorrect', async () => {
      const user = {
        id: 1,
        nombre: 'John Doe',
        correo: 'john@example.com',
        password: 'hashedPassword',
        rol:'admin'
      };

      jest.spyOn(usuarioRepository, 'findOneBy').mockResolvedValue(user);
      (compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login({ correo: 'john@example.com', password: 'wrongpassword' }))
        .rejects
        .toThrow(new HttpException('PASSWORD_INCORRECT', 403));
    });
  });
});
