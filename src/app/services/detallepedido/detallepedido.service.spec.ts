import { TestBed } from '@angular/core/testing';

import { DetallePedidoService } from './detallepedido.service';

describe('DetallepedidoService', () => {
  let service: DetallePedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallePedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
