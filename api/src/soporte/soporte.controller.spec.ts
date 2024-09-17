import { Test, TestingModule } from '@nestjs/testing';
import { SoporteController } from './soporte.controller';
import { SoporteService } from './soporte.service';
import { Ticket } from './entities/ticket.entity';

describe('SoporteController', () => {
  let controller: SoporteController;
  let service: SoporteService;

  const mockSoporteService = {
    findAll: jest.fn(() => Promise.resolve([{ id: 1, cliente: 'Cliente 1', asunto: 'Problema', descripcion: 'Descripción del problema', estado: 'Abierto', fecha: new Date() }])),
    findOne: jest.fn((id: number) => Promise.resolve({ id, cliente: 'Cliente 1', asunto: 'Problema', descripcion: 'Descripción del problema', estado: 'Abierto', fecha: new Date() })),
    create: jest.fn((ticket: Ticket) => Promise.resolve(ticket)),
    update: jest.fn((id: number, ticket: Partial<Ticket>) => Promise.resolve({ id, ...ticket })),
    remove: jest.fn((id: number) => Promise.resolve())
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoporteController],
      providers: [
        { provide: SoporteService, useValue: mockSoporteService }
      ],
    }).compile();

    controller = module.get<SoporteController>(SoporteController);
    service = module.get<SoporteService>(SoporteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

   it('debería obtener todos los tickets', async () => {
    const tickets = await controller.findAll();
    expect(tickets).toEqual([{ id: 1, cliente: 'Cliente 1', asunto: 'Problema', descripcion: 'Descripción del problema', estado: 'Abierto', fecha: new Date() }]);
  });

  it('debería obtener un ticket por id', async () => {
    const ticket = await controller.findOne('1');
    expect(ticket).toEqual({ id: 1, cliente: 'Cliente 1', asunto: 'Problema', descripcion: 'Descripción del problema', estado: 'Abierto', fecha: new Date() });
  });

  it('debería crear un nuevo ticket', async () => {
    const newTicket = { id: 2, cliente: 'Cliente 2', asunto: 'Nuevo Problema', descripcion: 'Descripción del nuevo problema', estado: 'Abierto', fecha: new Date() };
    const ticket = await controller.create(newTicket as Ticket);
    expect(ticket).toEqual(newTicket);
  });

  it('debería actualizar un ticket', async () => {
    const updatedTicket = { asunto: 'Asunto Actualizado', estado: 'Cerrado' };
    const ticket = await controller.update('1', updatedTicket);
    expect(ticket).toEqual({ id: 1, ...updatedTicket });
  });
});
