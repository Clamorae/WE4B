import { Etablissement } from './class/Etablissment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObtainEtablissementListService {

  toReturn:Etablissement[]=[]

  /*getData():Etablissement[]{

    this.toReturn = []
    this.toReturn.push(new Etablissement("test1","test1","test1","test1","test1","test1","test1","test1","test1","test1"))
    this.toReturn.push(new Etablissement("test2","test2","test2","test2","test2","test2","test2","test2","test2","test2"))

    return this.toReturn;
  }*/
  // TODO - remplacer getData par les recherches avec filtres qu'on peut (besoin de ne renvoyer que les infos dans la classe établissement) et pour les établissements les plus aimés par les utilisateurs
  // TODO - Remplacer getData dans liste-etablissement par les recherches correspondantes à la situation (adaptation à faire sur l'appel dans la page de recherche pour transmettre le filtre)

  constructor() { }
}
