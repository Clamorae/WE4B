import { CalendarEvent } from 'angular-calendar';
import { Injectable } from '@angular/core';
import { addDays, startOfDay } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventsService {

  toReturn:CalendarEvent[]=[]

  getData():CalendarEvent[]{

    this.toReturn = []
    //TODO - fetch la bdd ici plutôt que d'instancier en hard coded
    this.toReturn = [
      {
        start: startOfDay(new Date()),
        title: 'An event with no end date',
      },
      {
        start: addDays(new Date(),1),
        title:"just a test",
        end:addDays(new Date(),2)
      }
  ]

    return this.toReturn;
  }

  constructor() { }
}
