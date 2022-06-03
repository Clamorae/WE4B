import { Injectable } from '@angular/core';
import { Etablissement } from './class/Etablissment';

@Injectable({
  providedIn: 'root'
})
export class ObtainEtablissementService {

  constructor() {  }

  getData(id:number):Etablissement{
    //TODO - fetch la bdd ici plutôt que d'instancier en hard coded
    return new Etablissement("test3","test3","test3","test3","test3","test3","test3","test3","test3","test3");
  }
}
