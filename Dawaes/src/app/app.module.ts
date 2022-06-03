import { ObtainEtablissementListService } from './obtain-etablissement-list.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { EtablissementComponent } from './etablissement/etablissement.component';
import { ListeEtablissementsComponent } from './liste-etablissements/liste-etablissements.component';

import {getFirestore} from 'firebase/firestore';
import { LogzoneComponent } from './logzone/logzone.component'
import { initializeApp } from 'firebase/app';

const config = {
  apiKey: "AIzaSyBS_X69-V4hMK7M_vwJLqM9S4879goeazk",
  authDomain: "dawaes-cf2cf.firebaseapp.com",
  projectId: "dawaes-cf2cf",
  storageBucket: "dawaes-cf2cf.appspot.com",
  messagingSenderId: "554798796231",
  appId: "1:554798796231:web:25654deee6f6b7e5b0dde2",
  measurementId: "G-3FM27BFWZB"
};

const app = initializeApp(config)
const db = getFirestore(app);

@NgModule({
  declarations: [
    AppComponent,
    EtablissementComponent,
    ListeEtablissementsComponent,
    LogzoneComponent
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule
  ],
  providers: [
    ObtainEtablissementListService,
    { provide: 'A', useValue: db}],
  bootstrap: [AppComponent]
})
export class AppModule { }
