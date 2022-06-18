import { ObtainCommentairesService } from './../obtain-commentaires.service';
import { Component, OnInit, Input, EventEmitter, Injector, Output } from '@angular/core';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { FirebaseService } from '../services/firebase.service';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-liste-commentaires',
  templateUrl: './liste-commentaires.component.html',
  styleUrls: ['./liste-commentaires.component.css']
})
export class ListeCommentairesComponent implements OnInit {

  comment:string[]=[]
  @Input() titre?: string

  //est lié soit à un utilisateur soit à un établissement:
  @Input() estUtilisateur!:boolean
  @Input() id!:number

  @Output() isLogout = new EventEmitter<void>()
  constructor(private service:ObtainCommentairesService, public firebaseService:FirebaseService, private injector: Injector) {
    const db = this.injector.get('A');
  }

  ngOnInit(): void {
    /*if(this.estUtilisateur){
      this.commentaires = this.service.getCommentairesUtilisateur(this.id)
    } else {
      this.commentaires = this.service.getCommentairesEtablissement(this.id)
    }*/
    const auth = getAuth()
    const user = auth.currentUser;
    const q = query(collection(this.injector.get('A'), "Comment"), where("Etablissement", "==", "TODO"));
    const observable = onSnapshot(q, (querySnapshot) => {
      this.comment = [];
      querySnapshot.forEach((doc) => {
          const data = doc.data();
          this.comment.push(data['text']);
      });
    });

  }

}
