import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCargoComponent } from './dashboard-cargo.component';

describe('DashboardCargoComponent', () => {
  let component: DashboardCargoComponent;
  let fixture: ComponentFixture<DashboardCargoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardCargoComponent]
    });
    fixture = TestBed.createComponent(DashboardCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
