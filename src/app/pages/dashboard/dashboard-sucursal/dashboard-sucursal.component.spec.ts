import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSucursalComponent } from './dashboard-sucursal.component';

describe('DashboardSucursalComponent', () => {
  let component: DashboardSucursalComponent;
  let fixture: ComponentFixture<DashboardSucursalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardSucursalComponent]
    });
    fixture = TestBed.createComponent(DashboardSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
