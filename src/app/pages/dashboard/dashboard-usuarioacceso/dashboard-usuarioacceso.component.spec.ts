import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUsuarioAccesoComponent } from './dashboard-usuarioacceso.component';

describe('DashboardUsuarioaccesoComponent', () => {
  let component: DashboardUsuarioAccesoComponent;
  let fixture: ComponentFixture<DashboardUsuarioAccesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardUsuarioAccesoComponent]
    });
    fixture = TestBed.createComponent(DashboardUsuarioAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
