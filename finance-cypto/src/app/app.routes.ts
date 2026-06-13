import { Routes } from '@angular/router';
import { Login } from './screens/login/login';
import { Home } from './screens/home/home';
import { SignupComponent } from './screens/signup/signup';
import { RankingAtivosComponent } from './screens/ranking-ativos/ranking-ativos.componente';
import { LayoutComponent } from './layout/layout.component';
import { Dashboard } from './screens/crypto-dashboard/dashboard';
import { NoticiasComponent } from './screens/news-crypto/noticias.component';
import { ProfileComponent } from './screens/profile/profile.component';
import { PortfolioComponent } from './screens/portfolio/portfolio.component';

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
            { path: 'dashboard', component: Dashboard },
            { path: 'rankingAtivos', component: RankingAtivosComponent },
            { path: 'noticias', component: NoticiasComponent },
            { path: 'perfil', component: ProfileComponent },
            { path: 'portfolio', component: PortfolioComponent }
        ]
    },

    { path: '**', redirectTo: 'login' }
];