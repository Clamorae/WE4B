import { Etablissement } from './../class/Etablissment';
import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ObtainEtablissementService } from '../obtain-etablissement.service';
import { addDoc, collection } from 'firebase/firestore';
import { FirebaseService } from '../services/firebase.service';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-profile-etablissement',
  templateUrl: './profile-etablissement.component.html',
  styleUrls: ['./profile-etablissement.component.css']
})
export class ProfileEtablissementComponent implements OnInit {

  etablissement:Etablissement
  login:boolean

  @Output() isLogout = new EventEmitter<void>()
  constructor(service: ObtainEtablissementService, public firebaseService:FirebaseService, private injector: Injector) {
    //TODO - check le login, récupérer l'id via routage
    this.etablissement = service.getData(1)
    this.login=true
    const db = this.injector.get('A');
   }

  ngOnInit(): void {
  }

  async addComment(comment:string){
    try {
      const auth = getAuth()
      const user = auth.currentUser;
      if (user !== null) {
        const docRef = await addDoc(collection(this.injector.get('A'), "Comment"), {
          text: comment,
          User: user.email,
          Etablissement: "TODO"
          //ANCHOR maybe add rating
        });
      console.log("Document written with ID: ", docRef.id);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  

}
