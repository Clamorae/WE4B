import { Etablissement } from './../class/Etablissment';
import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
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
  public etablMail!:string
  login:boolean
  public userEmail:string|null|undefined

  @Output() isLogout = new EventEmitter<void>()
  constructor(private _Activatedroute:ActivatedRoute,  public firebaseService:FirebaseService, private injector: Injector) {
    const auth = getAuth()
    const user = auth.currentUser;
    this.userEmail=user?.email


    this._Activatedroute.paramMap.subscribe(params => { 
      this.etablMail = params.get('email')||'0'; 
      this.updateScreen();
    });

    
    this.login=firebaseService.isLoggedIn;
  }

  ngOnInit(): void {
  }

  //updates the displayed element on url parameter changes
  updateScreen(){
    const auth = getAuth()
    const user = auth.currentUser;
    const q = query(collection(this.injector.get('A'), "Institution"), where("Mail", "==", this.etablMail));
    const observable = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
      const data = doc.data();
      if(user!=null){ 
        const q2 = query(collection(this.injector.get('A'), "like"), where("Etablissement", "==", this.etablMail), where("User", "==",user?.email), where("isLiked", "==", true));
        const observable2 = onSnapshot(q2, (querySnapshot2) => {
          console.log(user?.email);
          if(querySnapshot2.size==0){          
            this.etablissement = new Etablissement(data['Nom'],data['Localisation'],data['Phone'],data['tipe'],data['Description'],data['Mail'],false);
          }else{
            this.etablissement = new Etablissement(data['Nom'],data['Localisation'],data['Phone'],data['tipe'],data['Description'],data['Mail'],true);
          }
        });
      }else{
        this.etablissement = new Etablissement(data['Nom'],data['Localisation'],data['Phone'],data['tipe'],data['Description'],data['Mail'],false);
      }
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
