import { FirebaseService } from './../services/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CalendarEventsService } from './../calendar-events.service';
import { Component, OnInit, Injector } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { addDays, parseISO, startOfDay } from 'date-fns';
import { getAuth } from 'firebase/auth';
import { query,collection,where, onSnapshot } from 'firebase/firestore';

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
  etablMail!:string

  constructor(service:CalendarEventsService,private router: Router,private firebaseService:FirebaseService, private injector:Injector,private _Activatedroute:ActivatedRoute) {

    this.events=[]
    
    if(this.router.url=="/utilisateur"){
      const db = this.injector.get('A');
      const auth = getAuth()
      const user = auth.currentUser;
      const q = query(collection(db, "Calendar"), where("User", "==", user?.email));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.events=service.getDataUser(user?.email)
      });
    }

    if(this.router.url.split('/')[1]=="etablissement"){
      this._Activatedroute.paramMap.subscribe(params => { 
        this.etablMail = params.get('email')||'0';
      });
      const db = this.injector.get('A');
      const auth = getAuth()
      const user = auth.currentUser;
      const q = query(collection(db, "Calendar"), where("Etablissement", "==", this.etablMail));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.events=service.getDataEtablissement(this.etablMail)
      });
    }
    
    /*this.events.push({
      start:parseISO("2022-21-21T12:00"),
      title:"test",
      end:parseISO("2022-06-21T13:00")
    })*/
   }

  ngOnInit(): void {
  }

}
