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
  {path:'etablissement', component: ProfileEtablissementComponent},
  {path:'search',component:ListeEtablissementsComponent},
  {path:'utilisateur',component:ProfileUtilisateurComponent},
  {path: 'update', component:UpdateEtablissementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
