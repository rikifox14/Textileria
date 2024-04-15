import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMetodoPagoComponent } from './dashboard-metodopago.component';

describe('DashboardMetodopagoComponent', () => {
  let component: DashboardMetodoPagoComponent;
  let fixture: ComponentFixture<DashboardMetodoPagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardMetodoPagoComponent]
    });
    fixture = TestBed.createComponent(DashboardMetodoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
