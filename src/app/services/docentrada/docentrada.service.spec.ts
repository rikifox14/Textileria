import { TestBed } from '@angular/core/testing';

import { DocEntradaService } from './docentrada.service';

describe('DocentradaService', () => {
  let service: DocEntradaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocEntradaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
