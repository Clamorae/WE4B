import { Etablissement } from './class/Etablissment';
import { Injectable, Injector } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ObtainEtablissementListService {

  etablissement:Etablissement[]=[]

  constructor(private injector:Injector){

  }

  //setter
  setList(cat:string,val:string){
    this.etablissement=[]

    //take the returned value form the options dropdown and convert it into a firestore category
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

    //search query
        const q = query(collection(this.injector.get('A'), "Institution"), where(cat, "==", val));
        const observable = onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if(user == null){
              this.etablissement.push(new Etablissement(data['Nom'],data['Localisation'],data['Phone'],data['tipe'],data['Description'],data['Mail'],false));
            }else{
              const q2 = query(collection(this.injector.get('A'), "like"), where("Etablissement", "==", data['Mail']),where("User", "==",user?.email),where("isLiked", "==",true));
              const observable2 = onSnapshot(q2, (querySnapshot2) => {
                if(querySnapshot2.size==0){
                  this.etablissement.push(new Etablissement(data['Nom'],data['Localisation'],data['Phone'],data['tipe'],data['Description'],data['Mail'],false));
                }else{
                  querySnapshot2.forEach((doc2) => {
                    const data2 = doc2.data();
                    this.etablissement.push(new Etablissement(data['Nom'],data['Localisation'],data['Phone'],data['tipe'],data['Description'],data['Mail'],data2['isLiked']));
                  });
                }
              });
            }
          });
        });
  }

  //getter
  getList():Etablissement[]{
    return this.etablissement
  }
}
