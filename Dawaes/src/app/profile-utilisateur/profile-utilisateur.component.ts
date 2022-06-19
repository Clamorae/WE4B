import { Component, OnInit } from '@angular/core';
import { getAuth, signOut } from 'firebase/auth';

@Component({
  selector: 'app-profile-utilisateur',
  templateUrl: './profile-utilisateur.component.html',
  styleUrls: ['./profile-utilisateur.component.css']
})
export class ProfileUtilisateurComponent implements OnInit {
  //TODO - check le login et si est chef d'établissement, récupérer l'id via routage

  login:boolean
  estChef:boolean

  constructor() {
    this.login=true
    this.estChef=true
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
