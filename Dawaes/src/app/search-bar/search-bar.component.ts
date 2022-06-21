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

  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService:FirebaseService, private injector: Injector) {
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
    const auth = getAuth()
    const user = auth.currentUser;
        const q = query(collection(this.injector.get('A'), "Institution"), where(cat, "==", val));
        const observable = onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            this.etablissement.push(new Etablissement(data['Nom'],data['Localisation'],data['Phone'],data['tipe'],data['Description'],data['Mail']));
          });
        });
  }

}
