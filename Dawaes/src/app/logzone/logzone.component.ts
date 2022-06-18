import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseApp, initializeApp } from '@angular/fire/app';
import { FirebaseService } from '../services/firebase.service';
import { collection, addDoc } from "firebase/firestore"; 
import { Injector } from '@angular/core';


@Component({
  selector: 'app-logzone',
  templateUrl: './logzone.component.html',
  styleUrls: ['./logzone.component.css']
})

export class LogzoneComponent implements OnInit {

  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService:FirebaseService, private injector: Injector) {
    const db = this.injector.get('A');
  }


  ngOnInit(): void {
  }

  async addItem(title:string, content:string){
    try {
      const docRef = await addDoc(collection(this.injector.get('A'), "Comment"), {
        test: content,
        last: "Lovelace"
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
  }

}
