import { Router } from '@angular/router';
import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { FirebaseService } from '../services/firebase.service';

import { FormControl, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.css']
})
export class CreateAccountFormComponent implements OnInit {

  public attempted:boolean

  myForm = new FormGroup({
    mdp: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email])
    });

  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService:FirebaseService, private injector: Injector,public router:Router) {
    const db = this.injector.get('A');

    this.attempted=false
  }

  ngOnInit(): void {
  }

  async onSignIn(email:string, password:string): Promise<void>{
    this.attempted=true

    //if this check fails, nothing happens and the user stays on the create account page
    await  this.firebaseService.signUp(email,password);
    if(this.firebaseService.isLoggedIn){
      console.log("connected");
      this.router.navigateByUrl("/utilisateur")
    }
  }

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
