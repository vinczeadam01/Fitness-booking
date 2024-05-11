import { Routes } from '@angular/router';
import {authGuard} from "./core/guards/auth.guard";
import {ProfileComponent} from "./users/profile/profile.component";

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent), pathMatch: 'full'},
  { path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent) },
  { path: 'signup', loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent) },
  { path: 'classes', loadComponent: () => import('./classes/list/classes.component').then((c) => c.ClassesComponent) },
  { path: 'classes/:id', loadComponent: () => import('./classes/show/class.component').then((c) => c.ClassComponent)},
  { path: 'trainers', loadComponent: () => import('./trainers/list/trainers.component').then((c) => c.TrainersComponent) },
  { path: 'trainers/:id', loadComponent: () => import('./trainers/show/trainer.component').then((c) => c.TrainerComponent) },
  {
    path: 'profile',
    loadComponent: () => import('./users/profile/profile.component').then((c) => c.ProfileComponent),
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./users/profile/parts/profil/profil.component').then((c) => c.ProfilComponent), outlet: 'profile', pathMatch: 'full' },
      { path: 'registrations', loadComponent: () => import('./users/profile/parts/registrations/registrations.component').then((c) => c.RegistrationsComponent), outlet: 'profile' },
      { path: 'notification', loadComponent: () => import('./users/profile/parts/profil/profil.component').then((c) => c.ProfilComponent), outlet: 'profile' },
      { path: 'delete', loadComponent: () => import('./users/profile/parts/profil/profil.component').then((c) => c.ProfilComponent), outlet: 'profile' },
    ],
  },

];
