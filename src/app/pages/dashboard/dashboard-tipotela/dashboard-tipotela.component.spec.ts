import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTipotelaComponent } from './dashboard-tipotela.component';

describe('DashboardTipotelaComponent', () => {
  let component: DashboardTipotelaComponent;
  let fixture: ComponentFixture<DashboardTipotelaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardTipotelaComponent]
    });
    fixture = TestBed.createComponent(DashboardTipotelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
