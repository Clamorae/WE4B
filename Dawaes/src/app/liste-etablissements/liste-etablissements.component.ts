import { ObtainEtablissementListService } from './../obtain-etablissement-list.service';
import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { Etablissement } from '../class/Etablissment';
import { getAuth } from 'firebase/auth';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-liste-etablissements',
  templateUrl: './liste-etablissements.component.html',
  styleUrls: ['./liste-etablissements.component.css']
})
export class ListeEtablissementsComponent implements OnInit {

  @Input() titre?: string
  etablissements : Etablissement[] = []
  popular:Etablissement[] = []
  popuLike:number[] = [0,0,0,0,0]

  @Output() isLogout = new EventEmitter<void>()
  constructor(private service:ObtainEtablissementListService, public firebaseService:FirebaseService, private injector: Injector,private router: Router, private _Activatedroute:ActivatedRoute) {
    const db = this.injector.get('A');
    const auth = getAuth()
    const user = auth.currentUser;
    if (user != null && this.router.url!="/search") {
      const q = query(collection(db, "like"), where("User", "==", user?.email));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.updateArray();
      });
    }else if(this.router.url!="/search"){
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
      if(this.titre != "Etablissements populaires" && this.router.url=="/search"){
        this.etablissements=this.service.getList()
      }
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if(this.titre!="Etablissements populaires" && this.router.url!="/search"){
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
          this.popular =[];
          this.popuLike = [0,0,0,0,0]
          const q2 = query(collection(this.injector.get('A'), "like"), where("Etablissement", "==", data['Mail']),where("isLiked", "==",true));
          const observable2 = onSnapshot(q2, (querySnapshot2) => {
            if (querySnapshot2.size > this.popuLike[0]){
              this.popuLike[0]=querySnapshot2.size;
              this.popular[0]=new Etablissement(data['Nom'],data['Localisation'],data['Phone'],data['tipe'],data['Description'],data['Mail']);
              for (let i = 0; i < this.popuLike.length; i++) {
                let change = false;
                for (let j = 0; j < this.popuLike.length - 1; j++) {
                  if (this.popuLike[j] > this.popuLike[j + 1]) {
                    const temp = this.popuLike[j];
                    this.popuLike[j] = this.popuLike[j + 1];
                    this.popuLike[j + 1] = temp;
                    const buffer = this.popular[j];
                    this.popular[j] = this.popular[j + 1];
                    this.popular[j + 1] = buffer;
                    change = true;
                  }
                }
                if (!change) {
                  break;
                }
              }
            }
          let j = 4;
          while(this.popuLike[j]>0){
            let isAlready = false;
            for(let i = 0; i < this.etablissements.length; i++){
              if (this.etablissements[i].mail == this.popular[j].mail){
                isAlready = true;
              }
            }
            if(isAlready==false){
              this.etablissements.push(this.popular[j]);
            }
            j--;
          }
          });
        }   
      });
    });
  }


}
