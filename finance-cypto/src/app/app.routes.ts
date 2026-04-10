import { Routes } from '@angular/router';
import { Login } from './screens/login/login';
import { Home } from './screens/home/home';
import { SignupComponent } from './screens/signup/signup';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'home', component: Home },
    { path: 'signup', component: SignupComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];