import { ObtainEtablissementListService } from './../obtain-etablissement-list.service';
import { Component, Input, OnInit } from '@angular/core';
import { Etablissement } from '../class/Etablissment';

@Component({
  selector: 'app-liste-etablissements',
  templateUrl: './liste-etablissements.component.html',
  styleUrls: ['./liste-etablissements.component.css']
})
export class ListeEtablissementsComponent implements OnInit {

  @Input() titre?: string
  etablissements : Etablissement[] = []

  constructor(service:ObtainEtablissementListService) {
    this.etablissements=service.getData();
   }

  ngOnInit(): void {

    
  }

}
