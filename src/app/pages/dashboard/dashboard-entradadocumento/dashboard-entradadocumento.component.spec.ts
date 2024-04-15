import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEntradadocumentoComponent } from './dashboard-entradadocumento.component';

describe('DashboardEntradadocumentoComponent', () => {
  let component: DashboardEntradadocumentoComponent;
  let fixture: ComponentFixture<DashboardEntradadocumentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardEntradadocumentoComponent]
    });
    fixture = TestBed.createComponent(DashboardEntradadocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
