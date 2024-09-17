import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('registerUser', () => {
    it('should call authService.register with correct arguments', async () => {
      const registerDto: RegisterAuthDto = {
        nombre: 'testuser',
        password: 'password123',
        correo: 'test@example.com',
      };

      await controller.registerUser(registerDto);

      expect(authService.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('loginUser', () => {
    it('should call authService.login with correct arguments', async () => {
      const loginDto: LoginAuthDto = {
        correo: 'test@example.com',
        password: 'password123',
      };

      await controller.loginUser(loginDto);

      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });
  });
});
