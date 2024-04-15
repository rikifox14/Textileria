import { TestBed } from '@angular/core/testing';

import { EntradaDocumentoService } from './entradadocumento.service';

describe('EntradadocumentoService', () => {
  let service: EntradaDocumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntradaDocumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
