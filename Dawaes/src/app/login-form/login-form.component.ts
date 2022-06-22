import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseApp, initializeApp } from '@angular/fire/app';
import { FirebaseService } from '../services/firebase.service';
import { collection, addDoc } from "firebase/firestore"; 
import { Injector } from '@angular/core';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FormControl, FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public attempted:boolean

  myForm = new FormGroup({
    mdp: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email])
    });

  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService:FirebaseService, private injector: Injector, public router:Router) {
    const db = this.injector.get('A');
    this.attempted=false
  }

  ngOnInit(): void {
  }

  async onSignUp(email:string, password:string,event:Event): Promise<void>{
    this.attempted=true

    //if this check fails, nothing happens and the user stays on the login page
    await  this.firebaseService.signIn(email,password);
    if(this.firebaseService.isLoggedIn){
      console.log("connected");
      this.router.navigateByUrl("/utilisateur")
    } 
    
  }

  //google function was removed because the sign up caused issues with our database model, code was left for showcase
  /*async onGoogle(){
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log("connected");
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
    this.router.navigateByUrl("/utilisateur");
  }*/

}
