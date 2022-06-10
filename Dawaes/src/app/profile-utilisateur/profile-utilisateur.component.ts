import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-utilisateur',
  templateUrl: './profile-utilisateur.component.html',
  styleUrls: ['./profile-utilisateur.component.css']
})
export class ProfileUtilisateurComponent implements OnInit {
  //TODO - check le login, récupérer l'id via routage

  login:boolean

  constructor() {
    this.login=true
   }

  ngOnInit(): void {
  }

}
