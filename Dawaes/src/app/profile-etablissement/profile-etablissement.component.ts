import { Etablissement } from './../class/Etablissment';
import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ObtainEtablissementService } from '../obtain-etablissement.service';
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { FirebaseService } from '../services/firebase.service';
import { getAuth, signOut } from 'firebase/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-etablissement',
  templateUrl: './profile-etablissement.component.html',
  styleUrls: ['./profile-etablissement.component.css']
})
export class ProfileEtablissementComponent implements OnInit {

  etablissement!:Etablissement
  etablMail!:string
  login:boolean

  @Output() isLogout = new EventEmitter<void>()
  constructor(private _Activatedroute:ActivatedRoute, service: ObtainEtablissementService, public firebaseService:FirebaseService, private injector: Injector) {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.etablMail = params.get('email')||'0'; 
      this.updateScreen();
    });
    this.login=true;
  }

  ngOnInit(): void {
  }

  updateScreen(){
    const auth = getAuth()
    const user = auth.currentUser;
    const q = query(collection(this.injector.get('A'), "Institution"), where("Mail", "==", this.etablMail));
    const observable = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.etablissement = new Etablissement(data['Nom'],data['Localisation'],data['Phone'],data['tipe'],data['Description'],data['Mail']);
      });
    });
  }

  async addComment(comment:string){
    try {
      const auth = getAuth()
      const user = auth.currentUser;
      if (user !== null) {
        const docRef = await addDoc(collection(this.injector.get('A'), "Comment"), {
          text: comment,
          User: user.email,
          Etablissement: this.etablMail
        });
      console.log("Document written with ID: ", docRef.id);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
