import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDocentradaproductoComponent } from './dashboard-docentradaproducto.component';

describe('DashboardDocentradaproductoComponent', () => {
  let component: DashboardDocentradaproductoComponent;
  let fixture: ComponentFixture<DashboardDocentradaproductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardDocentradaproductoComponent]
    });
    fixture = TestBed.createComponent(DashboardDocentradaproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
