import { Etablissement } from './class/Etablissment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObtainEtablissementListService {

  toReturn:Etablissement[]=[]

  constructor() { }
}
