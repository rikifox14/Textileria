import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDocsalidaComponent } from './dashboard-docsalida.component';

describe('DashboardDocsalidaComponent', () => {
  let component: DashboardDocsalidaComponent;
  let fixture: ComponentFixture<DashboardDocsalidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardDocsalidaComponent]
    });
    fixture = TestBed.createComponent(DashboardDocsalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
