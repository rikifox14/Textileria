import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTipoDocumentoComponent } from './dashboard-tipodocumento.component';

describe('DashboardTipodocumentoComponent', () => {
  let component: DashboardTipoDocumentoComponent;
  let fixture: ComponentFixture<DashboardTipoDocumentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardTipoDocumentoComponent]
    });
    fixture = TestBed.createComponent(DashboardTipoDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
