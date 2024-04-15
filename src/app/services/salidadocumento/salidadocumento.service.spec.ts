import { TestBed } from '@angular/core/testing';

import { SalidaDocumentoService } from './salidadocumento.service';

describe('SalidadocumentoService', () => {
  let service: SalidaDocumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalidaDocumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
