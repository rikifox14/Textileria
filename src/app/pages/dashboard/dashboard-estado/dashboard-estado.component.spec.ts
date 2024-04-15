import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEstadoComponent } from './dashboard-estado.component';

describe('DashboardEstadoComponent', () => {
  let component: DashboardEstadoComponent;
  let fixture: ComponentFixture<DashboardEstadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardEstadoComponent]
    });
    fixture = TestBed.createComponent(DashboardEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
