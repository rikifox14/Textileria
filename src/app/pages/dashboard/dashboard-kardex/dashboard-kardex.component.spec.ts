import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardKardexComponent } from './dashboard-kardex.component';

describe('DashboardKardexComponent', () => {
  let component: DashboardKardexComponent;
  let fixture: ComponentFixture<DashboardKardexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardKardexComponent]
    });
    fixture = TestBed.createComponent(DashboardKardexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
