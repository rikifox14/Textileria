import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTipocomprobanteComponent } from './dashboard-tipocomprobante.component';

describe('DashboardTipocomprobanteComponent', () => {
  let component: DashboardTipocomprobanteComponent;
  let fixture: ComponentFixture<DashboardTipocomprobanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardTipocomprobanteComponent]
    });
    fixture = TestBed.createComponent(DashboardTipocomprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
