import { Component, OnInit, Input } from '@angular/core';
import { Etablissement } from '../class/Etablissment';

@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.css']
})
export class EtablissementComponent implements OnInit {

  @Input() etablissement!:Etablissement //< établissement contenu dans le composant
  //attributs supplémentaires:
  @Input() estAimé?:boolean

  constructor() { }

  ngOnInit(): void {
  }

}
