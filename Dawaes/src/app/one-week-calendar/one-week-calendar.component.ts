import { Component, OnInit } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-one-week-calendar',
  templateUrl: './one-week-calendar.component.html',
  styleUrls: ['./one-week-calendar.component.css']
})
export class OneWeekCalendarComponent implements OnInit {

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  constructor() { }

  ngOnInit(): void {
  }

}
