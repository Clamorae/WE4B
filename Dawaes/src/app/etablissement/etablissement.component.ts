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
  estAime!:boolean
  login!:boolean

  constructor() { }

  ngOnInit(): void {
    //TODO - initialiser les variables avec la bdd ou les passer en input
    this.estAime=true
    this.login=true
  }

  change(){
    //TODO - update la bdd ici
    this.estAime=!this.estAime
  }

}
