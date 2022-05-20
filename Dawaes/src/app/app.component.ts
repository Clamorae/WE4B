import { Component, OnInit } from '@angular/core';
import { async } from '@firebase/util';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Dawaes';
  isSignedIn=false;
  constructor(public firebaseService : FirebaseService){}
  ngOnInit(){
    if(localStorage.getItem('user')!==null){
      this.isSignedIn = true;
    }else{
      this.isSignedIn = false;
    }
  }

  async onSignUp(email:string, password:string){
    await  this.firebaseService.signUp(email,password);
    if(this.firebaseService.isLoggedIn){
      this.isSignedIn= true;
    }
  }

  async onSignIn(email:string, password:string){
    await  this.firebaseService.signUp(email,password);
    if(this.firebaseService.isLoggedIn){
      this.isSignedIn= true;
    }
  }

  handleLogout(){
    this.isSignedIn=false;

  }
}
