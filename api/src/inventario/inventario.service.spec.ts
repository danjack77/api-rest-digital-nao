import { Test, TestingModule } from '@nestjs/testing';
import { InventarioService } from './inventario.service';
import { Inventario } from './entities/inventario.entity';

describe('InventarioService', () => {
  let service: InventarioService;

  const mockRepository = {
    find: jest.fn(() => Promise.resolve([{ id: 1, producto: 'Producto 1', cantidad: 10, precio: 100 }])),
    findOne: jest.fn((id: number) => Promise.resolve({ id, producto: 'Producto 1', cantidad: 10, precio: 100 })),
    save: jest.fn((inventario: Inventario) => Promise.resolve(inventario)),
    update: jest.fn((id: number, inventario: Partial<Inventario>) => Promise.resolve({ id, ...inventario })),
    delete: jest.fn((id: number) => Promise.resolve())
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventarioService],
    }).compile();

    service = module.get<InventarioService>(InventarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('debería retornar todos los inventarios', async () => {
    const inventarios = await service.findAll();
    expect(inventarios).toEqual([{ id: 1, producto: 'Producto 1', cantidad: 10, precio: 100 }]);
  });

  it('debería retornar un inventario por id', async () => {
    const inventario = await service.findOne(1);
    expect(inventario).toEqual({ id: 1, producto: 'Producto 1', cantidad: 10, precio: 100 });
  });

  it('debería crear un nuevo inventario', async () => {
    const newInventario = { id: 2, producto: 'Producto 2', cantidad: 20, precio: 200 };
    const inventario = await service.create(newInventario as Inventario);
    expect(inventario).toEqual(newInventario);
  });

  it('debería actualizar un inventario', async () => {
    const updatedInventario = { producto: 'Producto Actualizado', cantidad: 30, precio: 300 };
    const inventario = await service.update(1, updatedInventario);
    expect(inventario).toEqual({ id: 1, ...updatedInventario });
  });

  it('debería eliminar un inventario', async () => {
    await service.remove(1);
    expect(mockRepository.delete).toHaveBeenCalledWith(1);
  });
});
