import { Etablissement } from './class/Etablissment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObtainEtablissementListService {

  toReturn:Etablissement[]=[]

  getData():Etablissement[]{

    this.toReturn = []
    //TODO - fetch la bdd ici plutôt que d'instancier en hard coded
    this.toReturn.push(new Etablissement("test1","test1","test1","test1","test1","test1","test1","test1","test1","test1"))
    this.toReturn.push(new Etablissement("test2","test2","test2","test2","test2","test2","test2","test2","test2","test2"))

    return this.toReturn;
  }

  constructor() { }
}
