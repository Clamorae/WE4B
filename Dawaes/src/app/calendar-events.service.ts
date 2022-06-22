import { CalendarEvent } from 'angular-calendar';
import { Injectable, Injector } from '@angular/core';
import { addDays, parseISO, startOfDay } from 'date-fns';
import { Observable } from 'rxjs';
import { getAuth } from 'firebase/auth';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { debug } from 'console';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventsService {
  //not used in the final project but left for showcase

  toReturn:CalendarEvent[]=[]

  getDataUser(email:string|null|undefined):CalendarEvent[]{

    const q = query(collection(this.injector.get('A'), "Calendar"),where("User","==",email));
    const observable = onSnapshot(q, (querySnapshot) => {
      this.toReturn = [];
      querySnapshot.forEach((doc) => {
          const data = doc.data();
            this.toReturn.push({
              start:parseISO(data['Start']),
              title:data['Title'],
              end:parseISO(data['End'])
            })
       });
     });
     return this.toReturn
  }

  getDataEtablissement(etablissement:string):CalendarEvent[]{
    const q = query(collection(this.injector.get('A'), "Calendar"),where("Etablissement","==",etablissement));
    const observable = onSnapshot(q, (querySnapshot) => {
      this.toReturn = [];
      querySnapshot.forEach((doc) => {
          const data = doc.data();
            this.toReturn.push({
              start:parseISO(data['Start']),
              title:data['Title'],
              end:parseISO(data['End'])
            })
       });
     });
     return this.toReturn
  }

  constructor(private injector: Injector) { }
}
