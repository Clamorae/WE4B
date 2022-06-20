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

  myForm = new FormGroup({
    mdp: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email])
    });

  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService:FirebaseService, private injector: Injector) {
    const db = this.injector.get('A');
  }

  ngOnInit(): void {
  }

  async onSignUp(email:string, password:string): Promise<void>{
    await this.firebaseService.signIn(email,password);
    if(this.firebaseService.isLoggedIn){
      console.log("connected");
    }
  }

  async onGoogle(){
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
  }

}
