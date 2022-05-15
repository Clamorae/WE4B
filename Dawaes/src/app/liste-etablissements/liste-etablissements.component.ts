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

  constructor() { }

  ngOnInit(): void {

    //TODO - fetch la bdd ici plutôt que d'instancier en hard coded
    this.etablissements.push(new Etablissement("test1","test1","test1","test1","test1","test1","test1","test1","test1","test1"))
    this.etablissements.push(new Etablissement("test2","test2","test2","test2","test2","test2","test2","test2","test2","test2"))
  }

}
