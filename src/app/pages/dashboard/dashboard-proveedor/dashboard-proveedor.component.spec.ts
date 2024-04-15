import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProveedorComponent } from './dashboard-proveedor.component';

describe('DashboardProveedorComponent', () => {
  let component: DashboardProveedorComponent;
  let fixture: ComponentFixture<DashboardProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardProveedorComponent]
    });
    fixture = TestBed.createComponent(DashboardProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
