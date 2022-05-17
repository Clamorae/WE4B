import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { ButtonComponent } from './button/button.component'

// 2. Add your credentials from step 1
const config = {
  apiKey: "AIzaSyBS_X69-V4hMK7M_vwJLqM9S4879goeazk",
  authDomain: "dawaes-cf2cf.firebaseapp.com",
  projectId: "dawaes-cf2cf",
  storageBucket: "dawaes-cf2cf.appspot.com",
  messagingSenderId: "554798796231",
  appId: "1:554798796231:web:25654deee6f6b7e5b0dde2",
  measurementId: "G-3FM27BFWZB"
};

const firestore = getFirestore();
const userInfo = doc(firestore,'User/newUser')

/*async function testFirebase() {
  const newUser = {
    nom : 'test',
    prenom : 'test'
  };
  try {
    await setDoc(userInfo,newUser,{merge:true})
    console.log("worked")
  } catch (error) {
    console.log(`${error}`)
  }
}*/

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
