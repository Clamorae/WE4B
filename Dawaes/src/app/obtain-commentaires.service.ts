import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObtainCommentairesService {

  toReturn:string[]=[]

  constructor() { }

  // TODO - créer ces deux fonctions et update leur appel dans profil-établissment et -utilisateur
  // TODO - décider de laisser ces fonctions dans ce service ou de les bouger dans les sergices de profils
  getCommentairesUtilisateur(id:number):string[]{
    this.toReturn = []

    this.toReturn.push("Commentaire 1")
    this.toReturn.push("Commentaire 2")

    return this.toReturn
  }

  getCommentairesEtablissement(id:number):string[]{
    this.toReturn = []
    this.toReturn.push("Commentaire 3")
    this.toReturn.push("Commentaire 4")

    return this.toReturn
  }
}
