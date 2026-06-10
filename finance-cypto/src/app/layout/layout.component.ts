import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './layout.component.html'
})
export class LayoutComponent {

    constructor(private authService: AuthService, private router: Router) { }

    sair() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}