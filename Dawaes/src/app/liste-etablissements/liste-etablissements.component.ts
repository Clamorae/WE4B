import { ObtainEtablissementListService } from './../obtain-etablissement-list.service';
import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { Etablissement } from '../class/Etablissment';
import { getAuth } from 'firebase/auth';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-liste-etablissements',
  templateUrl: './liste-etablissements.component.html',
  styleUrls: ['./liste-etablissements.component.css']
})
export class ListeEtablissementsComponent implements OnInit {

  @Input() titre?: string
  etablissements : Etablissement[] = []

  @Output() isLogout = new EventEmitter<void>()
  constructor(private service:ObtainEtablissementListService, public firebaseService:FirebaseService, private injector: Injector) {
    const db = this.injector.get('A');
    const auth = getAuth()
    const user = auth.currentUser;
    if (user != null) {
      const q = query(collection(db, "like"), where("User", "==", user?.email));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.updateArray();
      });
    }else{
      this.updateArray();
    }
  }
 
  ngOnInit(): void {
  }

  updateArray(){
    const auth = getAuth()
    const user = auth.currentUser;
    const q = query(collection(this.injector.get('A'), "Institution"));
    const observable = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if(this.titre!="Etablissements populaires"){
          this.etablissements = [];
          const q2 = query(collection(this.injector.get('A'), "like"), where("Etablissement", "==", data['Mail']),where("User", "==",user?.email),where("isLiked", "==",true));
          const observable2 = onSnapshot(q2, (querySnapshot2) => {
            querySnapshot2.forEach((doc2) => {
              const data2 = doc2.data();
              this.etablissements.push(new Etablissement(data['Nom'],data['Localisation'],data['Phone'],data['tipe'],data['Description'],data['Mail']));
            });
          });
        }
        if(this.titre == "Etablissements populaires"){
          this.etablissements = [];
          console.log(this.etablissements);
          const q2 = query(collection(this.injector.get('A'), "like"), where("Etablissement", "==", data['Mail']),where("isLiked", "==",true));
          const observable2 = onSnapshot(q2, (querySnapshot2) => {
            querySnapshot2.forEach((doc2) => {
              const data2 = doc2.data();
              let isAlready = false;
              for(let i = 0; i < this.etablissements.length; i++){
                if (this.etablissements[i].mail == data2['Etablissement']){
                  isAlready = true;
                }
              }
              if(isAlready==false){
                this.etablissements.push(new Etablissement(data['Nom'],data['Localisation'],data['Phone'],data['tipe'],data['Description'],data['Mail']));
              }
            });
          });
        }   
      });
    });
  }
}
