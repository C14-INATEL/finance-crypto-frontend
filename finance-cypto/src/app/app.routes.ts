import { Routes } from '@angular/router';
import { Login } from './screens/login/login';
import { Home } from './screens/home/home';
import { SignupComponent } from './screens/signup/signup';
import { RankingAtivosComponent } from './screens/ranking-ativos/ranking-ativos.componente';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'signup', component: SignupComponent },
    { path: 'logout', redirectTo: 'login', pathMatch: 'full' },

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'home', component: Home },
            { path: 'rankingAtivos', component: RankingAtivosComponent },

            { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
    },

    { path: '**', redirectTo: 'login' }
];