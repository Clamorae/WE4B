import { ObtainEtablissementListService } from './../obtain-etablissement-list.service';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from './../services/firebase.service';
import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { getAuth, signOut,onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { Etablissement } from '../class/Etablissment';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  public login!:boolean
  public mail:string|null
  public etablissement: Etablissement[] = []//ANCHOR faire passer cette variable vers list-etablissement et l'afficher quand le routing==search (affiche résultat requete)
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
  }

  findByParam(cat:string,val:string):void{
    this.etablissement=[]
    switch(cat){
      case "0": cat="Nom"
      break;
      case "1":cat="Localisation"
      break;
      case "2":cat="tipe"
      break;
    }
    const auth = getAuth()
    const user = auth.currentUser;
        const q = query(collection(this.injector.get('A'), "Institution"), where(cat, "==", val));
        const observable = onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            this.etablissement.push(new Etablissement(data['Nom'],data['Localisation'],data['Phone'],data['tipe'],data['Description'],data['Mail']));
          });
        });
        this.service.setList(this.etablissement)
  }

}
