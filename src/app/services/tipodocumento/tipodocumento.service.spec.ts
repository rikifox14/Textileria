import { TestBed } from '@angular/core/testing';

import { TipoDocumentoService } from './tipodocumento.service';

describe('TipodocumentoService', () => {
  let service: TipoDocumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoDocumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
