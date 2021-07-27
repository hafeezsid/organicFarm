import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDashboardMainComponent } from './tutor-dashboard-main.component';

describe('TutorDashboardMainComponent', () => {
  let component: TutorDashboardMainComponent;
  let fixture: ComponentFixture<TutorDashboardMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorDashboardMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDashboardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
