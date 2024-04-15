import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDetallepedidoComponent } from './dashboard-detallepedido.component';

describe('DashboardDetallepedidoComponent', () => {
  let component: DashboardDetallepedidoComponent;
  let fixture: ComponentFixture<DashboardDetallepedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardDetallepedidoComponent]
    });
    fixture = TestBed.createComponent(DashboardDetallepedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
