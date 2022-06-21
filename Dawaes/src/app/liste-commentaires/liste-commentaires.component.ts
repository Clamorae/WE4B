import { Component, OnInit, Input, EventEmitter, Injector, Output } from '@angular/core';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { FirebaseService } from '../services/firebase.service';
import { getAuth } from 'firebase/auth';
import { ActivatedRoute, Router } from '@angular/router';

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
  etablMail!:string

  @Output() isLogout = new EventEmitter<void>()
  constructor(private _Activatedroute:ActivatedRoute, public firebaseService:FirebaseService, private injector: Injector,private router: Router) {
    const db = this.injector.get('A');
    this._Activatedroute.paramMap.subscribe(params => { 
      this.etablMail = params.get('email')||'0';
      this.updateComment();
    });
  }

  ngOnInit(): void {
  }

  updateComment():void{
    const auth = getAuth()
    const user = auth.currentUser;
    if(this.router.url=="/utilisateur"){
      const q = query(collection(this.injector.get('A'), "Comment"), where("User", "==", user?.email));
      const observable = onSnapshot(q, (querySnapshot) => {
        this.comment = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            this.comment.push(data['text']);
        });
      });
    }else{
      const q = query(collection(this.injector.get('A'), "Comment"), where("Etablissement", "==", this.etablMail));
      const observable = onSnapshot(q, (querySnapshot) => {
      this.comment = [];
      querySnapshot.forEach((doc) => {
          const data = doc.data();
          this.comment.push(data['text']);
      });
    });
    }
  }

}
