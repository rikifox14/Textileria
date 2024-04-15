import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPersonaComponent } from './dashboard-persona.component';

describe('DashboardPersonaComponent', () => {
  let component: DashboardPersonaComponent;
  let fixture: ComponentFixture<DashboardPersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardPersonaComponent]
    });
    fixture = TestBed.createComponent(DashboardPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
