import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDocentradaComponent } from './dashboard-docentrada.component';

describe('DashboardDocentradaComponent', () => {
  let component: DashboardDocentradaComponent;
  let fixture: ComponentFixture<DashboardDocentradaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardDocentradaComponent]
    });
    fixture = TestBed.createComponent(DashboardDocentradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
