import { Component, OnInit } from '@angular/core';
import { async } from '@firebase/util';
import { FirebaseService } from './services/firebase.service';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Dawaes';
  isSignedIn : boolean = false;
  isTrying : boolean = false;
  constructor(public firebaseService : FirebaseService){}
  ngOnInit(): void{
    if(localStorage.getItem('user')!==null){
      this.isSignedIn = true;
    }else{
      this.isSignedIn = false;
      this.isTrying = true;
    }
  }

  handleLogout(): void{
    this.isSignedIn=false;
  }


  viewDate: Date = new Date();
}
