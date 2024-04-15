import { TestBed } from '@angular/core/testing';

import { DetalleVentaService } from './detalleventa.service';

describe('DetalleventaService', () => {
  let service: DetalleVentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleVentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
