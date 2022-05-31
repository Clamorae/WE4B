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

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { OneWeekCalendarComponent } from './one-week-calendar/one-week-calendar.component';
import { ListeCommentairesComponent } from './liste-commentaires/liste-commentaires.component';
import { ProfileEtablissementComponent } from './profile-etablissement/profile-etablissement.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ProfileUtilisateurComponent } from './profile-utilisateur/profile-utilisateur.component';
import { CreateAccountFormComponent } from './create-account-form/create-account-form.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

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

@NgModule({
  declarations: [
    AppComponent,
    EtablissementComponent,
    ListeEtablissementsComponent,
    OneWeekCalendarComponent,
    ListeCommentairesComponent,
    ProfileEtablissementComponent,
    LoginFormComponent,
    ProfileUtilisateurComponent,
    CreateAccountFormComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    ObtainEtablissementListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
