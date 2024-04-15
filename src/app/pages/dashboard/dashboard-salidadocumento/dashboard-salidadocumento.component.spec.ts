import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSalidadocumentoComponent } from './dashboard-salidadocumento.component';

describe('DashboardSalidadocumentoComponent', () => {
  let component: DashboardSalidadocumentoComponent;
  let fixture: ComponentFixture<DashboardSalidadocumentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardSalidadocumentoComponent]
    });
    fixture = TestBed.createComponent(DashboardSalidadocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
