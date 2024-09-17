import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';

describe('UsuarioController', () => {
  let controller: UsuarioController;
  let service: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        {
          provide: UsuarioService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([new Usuario()]),
            findOne: jest.fn().mockResolvedValue(new Usuario()),
            create: jest.fn().mockResolvedValue(new Usuario()),
            update: jest.fn().mockResolvedValue(new Usuario()),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();
  
    controller = module.get<UsuarioController>(UsuarioController);
    service = module.get<UsuarioService>(UsuarioService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  




});
