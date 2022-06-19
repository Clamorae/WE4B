import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-update-etablissement',
  templateUrl: './update-etablissement.component.html',
  styleUrls: ['./update-etablissement.component.css']
})
export class UpdateEtablissementComponent implements OnInit {

  @Output() isLogout = new EventEmitter<void>()
  constructor( public firebaseService:FirebaseService, private injector: Injector) {
    const db = this.injector.get('A');
  }

  ngOnInit(): void { 
  }

  async updateInstitution(nom:string, localisation:string, type:string, tel:string, description:string){
    try {
      //ANCHOR image
      const likeCollection= collection(this.injector.get('A'), "Institution");
      const q = query(likeCollection, where("Nom", "==", "TODO"));
      const querySnapshot = await getDocs(q);
      let isCreated : boolean = false;
      if(querySnapshot.empty){
        const docRef = await addDoc(collection(this.injector.get('A'), "Institution"), {
          Nom:nom,
          Localisation: localisation,
          tipe : type, 
          Phone:tel,
          Description:description
        });
      }else{
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          updateDoc(doc.ref,{
            Localisation: localisation,
            tipe : type //not a language error I just can't use "Type"
          });
        });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

}
