import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDocsalidaproductoComponent } from './dashboard-docsalidaproducto.component';

describe('DashboardDocsalidaproductoComponent', () => {
  let component: DashboardDocsalidaproductoComponent;
  let fixture: ComponentFixture<DashboardDocsalidaproductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardDocsalidaproductoComponent]
    });
    fixture = TestBed.createComponent(DashboardDocsalidaproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
