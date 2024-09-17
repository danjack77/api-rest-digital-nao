import { Test, TestingModule } from '@nestjs/testing';
import { InventarioController } from './inventario.controller';
import { InventarioService } from './inventario.service';
import { Inventario } from './entities/inventario.entity';

describe('InventarioController', () => {
  let controller: InventarioController;
  let service: InventarioService;


  const mockInventarioService = {
    findAll: jest.fn(() => Promise.resolve([{ id: 1, producto: 'Producto 1', cantidad: 10, precio: 100 }])),
    findOne: jest.fn((id: number) => Promise.resolve({ id, producto: 'Producto 1', cantidad: 10, precio: 100 })),
    create: jest.fn((inventario: Inventario) => Promise.resolve(inventario)),
    update: jest.fn((id: number, inventario: Partial<Inventario>) => Promise.resolve({ id, ...inventario })),
    remove: jest.fn((id: number) => Promise.resolve())
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventarioController],
      providers: [
        { provide: InventarioService, useValue: mockInventarioService }
      ],
    }).compile();

    controller = module.get<InventarioController>(InventarioController);
    service = module.get<InventarioService>(InventarioService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('debería obtener todos los inventarios', async () => {
    const inventarios = await controller.findAll();
    expect(inventarios.datos).toEqual([{ id: 1, producto: 'Producto 1', cantidad: 10, precio: 100 }]);
  });

  it('debería obtener un inventario por id', async () => {
    const inventario = await controller.findOne('1');
    expect(inventario.datos).toEqual({ id: 1, producto: 'Producto 1', cantidad: 10, precio: 100 });
  });

  it('debería crear un nuevo inventario', async () => {
    const newInventario = { id: 2, producto: 'Producto 2', cantidad: 20, precio: 200 };
    const inventario = await controller.create(newInventario as Inventario);
    expect(inventario.datos).toEqual(newInventario);
  });

  it('debería actualizar un inventario', async () => {
    const updatedInventario = { producto: 'Producto Actualizado', cantidad: 30, precio: 300 };
    const inventario = await controller.update('1', updatedInventario);
    expect(inventario.datos).toEqual({ id: 1, ...updatedInventario });
  });

  it('debería eliminar un inventario', async () => {
    await controller.remove('1');
    expect(mockInventarioService.remove).toHaveBeenCalledWith(1);
  });
});
