import { Component, EventEmitter, HostListener, Injector, OnInit, Output } from '@angular/core';
import { FirebaseService } from './../services/firebase.service';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import { query, collection, where, onSnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-profile-utilisateur',
  templateUrl: './profile-utilisateur.component.html',
  styleUrls: ['./profile-utilisateur.component.css']
})
export class ProfileUtilisateurComponent implements OnInit {

  login:boolean
  isOwner!:boolean
  uEmail?:any

  constructor(public router: Router, public firebaseService:FirebaseService, private injector: Injector) {
    this.login=true
    const db = this.injector.get('A');
  }

  @HostListener('window:load')
  onLoad() {
    const auth = getAuth()
    const user = auth.currentUser;
    if(user==null){
      this.router.navigateByUrl("")
    }
  }

  ngOnInit(): void {
    this.setIsOwner();
  }

  async setIsOwner(){
    this.isOwner = false;
    const auth = getAuth()
    const user = auth.currentUser;
    const q = query(collection(this.injector.get('A'), "User"), where("Mail", "==", user?.email));
    const observable = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data['isOwner']==true) {
          this.isOwner = true;
          this.uEmail = user?.email;
        }else{
          this.isOwner = false;
        }
      });
    });
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
