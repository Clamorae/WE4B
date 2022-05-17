import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneWeekCalendarComponent } from './one-week-calendar.component';

describe('OneWeekCalendarComponent', () => {
  let component: OneWeekCalendarComponent;
  let fixture: ComponentFixture<OneWeekCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneWeekCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneWeekCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
