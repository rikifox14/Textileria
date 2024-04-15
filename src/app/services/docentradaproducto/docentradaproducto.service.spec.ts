import { TestBed } from '@angular/core/testing';

import { DocEntradaProductoService } from './docentradaproducto.service';

describe('DocentradaproductoService', () => {
  let service: DocEntradaProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocEntradaProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
