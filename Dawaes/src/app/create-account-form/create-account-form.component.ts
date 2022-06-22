import { Router } from '@angular/router';
import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { FirebaseService } from '../services/firebase.service';

import { FormControl, FormGroup,Validators } from '@angular/forms';
import { addDoc, collection } from 'firebase/firestore';

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

  async onSignIn(email:string, password:string, checked:boolean): Promise<void>{
    this.attempted=true

    //if this check fails, nothing happens and the user stays on the create account page
    await  this.firebaseService.signUp(email,password);
    if(this.firebaseService.isLoggedIn){
      try {
        const auth = getAuth()
        const user = auth.currentUser;
        if (user !== null) {
          const docRef = await addDoc(collection(this.injector.get('A'), "User"), {
            Mail: user.email,
            isOwner: checked
          });
        console.log("Document written with ID: ", docRef.id);
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
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
