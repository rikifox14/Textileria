import { TestBed } from '@angular/core/testing';

import { UsuarioAccesoService } from './usuarioacceso.service';

describe('UsuarioaccesoService', () => {
  let service: UsuarioAccesoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioAccesoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
