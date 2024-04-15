import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDetalleventaComponent } from './dashboard-detalleventa.component';

describe('DashboardDetalleventaComponent', () => {
  let component: DashboardDetalleventaComponent;
  let fixture: ComponentFixture<DashboardDetalleventaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardDetalleventaComponent]
    });
    fixture = TestBed.createComponent(DashboardDetalleventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
