import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRolComponent } from './dashboard-rol.component';

describe('DashboardRolComponent', () => {
  let component: DashboardRolComponent;
  let fixture: ComponentFixture<DashboardRolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardRolComponent]
    });
    fixture = TestBed.createComponent(DashboardRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
