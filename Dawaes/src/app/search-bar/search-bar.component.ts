import { ObtainEtablissementListService } from './../obtain-etablissement-list.service';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from './../services/firebase.service';
import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { getAuth, signOut,onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  public login!:boolean
  public mail:string|null
  public isMenu!:boolean

  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService:FirebaseService, private injector: Injector,private activatedRoute:ActivatedRoute,private router:Router,public service:ObtainEtablissementListService) {
    this.isMenu=false
    this.mail=""
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.login=true
        this.mail=user?.email
      } else {
        this.login=false
        this.mail=""
      }
    });

    this.router.events.subscribe((event: Event) =>{
      if (event instanceof NavigationEnd) {
        this.isMenu = (event.url=="/");
      }
    })
  }

  ngOnInit(): void {
  }

  signOut():void{
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("signed out")
    }).catch((error) => {
      console.log("not signed out")
    });
    window.location.reload()
  }

  //calls upon the service setter and transmits the search parameters
  findByParam(cat:string,val:string):void{
        this.service.setList(cat,val)
  }

}
