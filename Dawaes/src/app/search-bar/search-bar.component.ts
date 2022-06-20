import { Observable } from 'rxjs';
import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { getAuth, signOut,onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import * as firebase from 'firebase/compat';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  public login!:boolean
  public mail:string|null

  constructor(private firebaseService:FirebaseService) {
    this.mail=""
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
    if (user) {
      this.login=true
      this.mail=user?.email
    } else {
      this.login=false
      this.mail=""
    }
 });
   }

  ngOnInit(): void {
  }

  signOut():void{
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("signed out")
    }).catch((error) => {
      console.log("not signed out")
    });
  }

}
