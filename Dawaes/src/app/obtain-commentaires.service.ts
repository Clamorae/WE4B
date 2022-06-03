import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObtainCommentairesService {

  toReturn:string[]=[]

  constructor() { }

  getCommentairesUtilisateur(id:number):string[]{
    this.toReturn = []

    this.toReturn.push("Commentaire 1")
    this.toReturn.push("Commentaire 2")

    return this.toReturn
  }

  getCommentairesEtablissement(id:number):string[]{
    this.toReturn = []
    //TODO - fetch la bdd ici plutôt que d'instancier en hard coded
    this.toReturn.push("Commentaire 3")
    this.toReturn.push("Commentaire 4")

    return this.toReturn
  }
}
