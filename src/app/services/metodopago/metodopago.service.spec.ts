import { TestBed } from '@angular/core/testing';

import { MetodoPagoService} from './metodopago.service';

describe('MetodopagoService', () => {
  let service: MetodoPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetodoPagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
