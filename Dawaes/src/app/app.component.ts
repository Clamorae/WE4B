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

  async onSignUp(email:string, password:string): Promise<void>{
    await  this.firebaseService.signUp(email,password);
    if(this.firebaseService.isLoggedIn){
      this.isSignedIn= true;
    }
  }

  async onSignIn(email:string, password:string): Promise<void>{
    await  this.firebaseService.signUp(email,password);
    if(this.firebaseService.isLoggedIn){
      this.isSignedIn= true;
    }
  }

  async onGoogle(){
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        this.isSignedIn= true;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  handleLogout(): void{
    this.isSignedIn=false;
  }


  viewDate: Date = new Date();
}
