import { CalendarEventsService } from './../calendar-events.service';
import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { addDays, startOfDay } from 'date-fns';

@Component({
  selector: 'app-one-week-calendar',
  templateUrl: './one-week-calendar.component.html',
  styleUrls: ['./one-week-calendar.component.css']
})
export class OneWeekCalendarComponent implements OnInit {

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  events: CalendarEvent[] = []

  constructor(service:CalendarEventsService) {
    this.events = service.getData()
   }

  ngOnInit(): void {
  }

}
