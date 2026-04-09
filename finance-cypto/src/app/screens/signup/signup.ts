import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './signup.html',
    styleUrls: ['./signup.scss'],
})
export class SignupComponent {

    name: string = '';
    email: string = '';
    password: string = '';

    onSignup() {
        console.log('Signup data:', {
            name: this.name,
            email: this.email,
            password: this.password
        });
    }

}