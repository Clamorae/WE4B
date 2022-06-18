import { Component, OnInit, Input, EventEmitter, Output, Injector } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Etablissement } from '../class/Etablissment';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.css']
})
export class EtablissementComponent implements OnInit {

  @Input() etablissement!:Etablissement //< établissement contenu dans le composant
  //attributs supplémentaires:
  estAime!:boolean
  login!:boolean

  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService:FirebaseService, private injector: Injector) {
    const db = this.injector.get('A');
   }

  ngOnInit(): void {
    //TODO - initialiser les variables avec la bdd ou les passer en input
    this.estAime=true
    this.login=true
  }

  change(){
    //TODO - update la bdd ici
    this.estAime=!this.estAime
  }

  async like(){
    try {
      const likeCollection= collection(this.injector.get('A'), "like");
      const auth = getAuth()
      const user = auth.currentUser;
      const q = query(likeCollection, where("User", "==", "mail@mail.mail"), where("Etablissement", "==", "TODO"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if(data['isLiked']==true) {
          updateDoc(doc.ref,{
            isLiked: false
          });
        }else if(data['isLiked']==false) {
          updateDoc(doc.ref,{
            isLiked: true
          });
        }
        this.change();
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

}
