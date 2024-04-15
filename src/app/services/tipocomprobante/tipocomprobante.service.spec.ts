import { TestBed } from '@angular/core/testing';

import { TipoComprobanteService } from './tipocomprobante.service';

describe('TipocomprobanteService', () => {
  let service: TipoComprobanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoComprobanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
