import { TestBed } from '@angular/core/testing';

import { DocSalidaService } from './docsalida.service';

describe('DocsalidaService', () => {
  let service: DocSalidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocSalidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
