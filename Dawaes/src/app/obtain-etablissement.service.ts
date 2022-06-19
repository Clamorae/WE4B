import { Injectable } from '@angular/core';
import { Etablissement } from './class/Etablissment';

@Injectable({
  providedIn: 'root'
})
export class ObtainEtablissementService {

  constructor() {  }

  getData(id:number):Etablissement{
    return new Etablissement("test3","test3","test3","test3","test3","test3");
  }
  //TODO - remplacer getData par une recherche d'un établissement précis, renvoyer les infos de la classe établissement + les événements de l'établissement (dans une 2e fonction/autre service?)
  //TODO - remplacer getData par la recherche dans profil-établissement pour récupérer les infos, les événements
  //TODO - décider: migration du service de commentaires - fonction getCommentairesEtablissement ici ou laisser dans un service de commentaires à part? 
}
