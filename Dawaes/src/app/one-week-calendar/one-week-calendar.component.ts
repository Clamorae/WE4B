import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { startOfDay } from 'date-fns';

@Component({
  selector: 'app-one-week-calendar',
  templateUrl: './one-week-calendar.component.html',
  styleUrls: ['./one-week-calendar.component.css']
})
export class OneWeekCalendarComponent implements OnInit {

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
