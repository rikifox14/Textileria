import { TestBed } from '@angular/core/testing';

import { TipoTelaService } from './tipotela.service';

describe('TipoTelaService', () => {
  let service: TipoTelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoTelaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
