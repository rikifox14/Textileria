import { TestBed } from '@angular/core/testing';

import { DocSalidaProductoService } from './docsalidaproducto.service';

describe('DocsalidaproductoService', () => {
  let service: DocSalidaProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocSalidaProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
