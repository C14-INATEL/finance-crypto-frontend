import { Routes } from '@angular/router';
import { Login } from './screens/login/login';
import { Home } from './screens/home/home'; 

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'home', component: Home}, 
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];