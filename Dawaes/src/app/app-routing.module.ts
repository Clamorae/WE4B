import { SearchListComponent } from './search-list/search-list.component';
import { CreateAccountFormComponent } from './create-account-form/create-account-form.component';
import { ProfileUtilisateurComponent } from './profile-utilisateur/profile-utilisateur.component';
import { ListeEtablissementsComponent } from './liste-etablissements/liste-etablissements.component';
import { ProfileEtablissementComponent } from './profile-etablissement/profile-etablissement.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateEtablissementComponent } from './update-etablissement/update-etablissement.component';

const routes: Routes = [
  {path:'', component: LoginFormComponent},
  {path:'newaccount', component: CreateAccountFormComponent},
  {path:'etablissement/:email', component: ProfileEtablissementComponent},
  {path:'search',component:SearchListComponent},
  {path:'utilisateur',component:ProfileUtilisateurComponent},
  {path: 'update', component:UpdateEtablissementComponent}
];

@NgModule({
  //for the search page update, onSameUrlNavigation must be set on reload
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
