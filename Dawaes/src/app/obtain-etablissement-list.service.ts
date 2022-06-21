import { Etablissement } from './class/Etablissment';
import { Injectable, Injector } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ObtainEtablissementListService {

  etablissement:Etablissement[]=[]

  constructor(private injector:Injector) { }

  setList(cat:string,val:string){
    this.etablissement=[]
    switch(cat){
      case "0": cat="Nom"
      break;
      case "1":cat="Localisation"
      break;
      case "2":cat="tipe"
      break;
      case "3":cat="Mail";
      break;
      case "4":cat="Phone";
      break;
    }
    const auth = getAuth()
    const user = auth.currentUser;
        const q = query(collection(this.injector.get('A'), "Institution"), where(cat, "==", val));
        const observable = onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            this.etablissement.push(new Etablissement(data['Nom'],data['Localisation'],data['Phone'],data['tipe'],data['Description'],data['Mail']));
          });
        });
  }

  getList():Etablissement[]{
    return this.etablissement
  }
}
