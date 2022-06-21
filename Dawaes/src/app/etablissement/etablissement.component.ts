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
    this.estAime=true
    this.login=true
  }

  change(){
    this.estAime=!this.estAime
  }

  async like(mail:string){
    try {
      const likeCollection= collection(this.injector.get('A'), "like");
      const auth = getAuth()
      const user = auth.currentUser;
      const q = query(likeCollection, where("User", "==", user?.email), where("Etablissement", "==", mail));
      const querySnapshot = await getDocs(q);
      if(querySnapshot.empty){
        if (user !== null) {
          const docRef = await addDoc(collection(this.injector.get('A'), "like"), {
            isLiked: true,
            User: user.email,
            Etablissement: mail
          });
        console.log("Document written with ID: ", docRef.id);
        }
      }
      querySnapshot.forEach(async (doc) => {
        const data = doc.data();
        if(data['isLiked']==true) {
          updateDoc(doc.ref,{
            isLiked: false
          });
          this.change();
        }else if(data['isLiked']==false) {
          updateDoc(doc.ref,{
            isLiked: true
          });
          this.change();
        }
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
