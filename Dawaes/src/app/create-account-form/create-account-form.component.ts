import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.css']
})
export class CreateAccountFormComponent implements OnInit {

  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService:FirebaseService, private injector: Injector) {
    const db = this.injector.get('A');
  }

  ngOnInit(): void {
  }

  async onSignIn(email:string, password:string): Promise<void>{
    await  this.firebaseService.signUp(email,password);
    if(this.firebaseService.isLoggedIn){
      console.log("connected");
    }
  }


}
