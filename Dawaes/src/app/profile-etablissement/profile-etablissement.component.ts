import { Etablissement } from './../class/Etablissment';
import { Component, OnInit } from '@angular/core';
import { ObtainEtablissementService } from '../obtain-etablissement.service';

@Component({
  selector: 'app-profile-etablissement',
  templateUrl: './profile-etablissement.component.html',
  styleUrls: ['./profile-etablissement.component.css']
})
export class ProfileEtablissementComponent implements OnInit {

  etablissement:Etablissement
  login:boolean

  constructor(service: ObtainEtablissementService) {
    //TODO - check le login, récupérer l'id via routage
    this.etablissement = service.getData(1)
    this.login=true
   }

  ngOnInit(): void {
  }

}
