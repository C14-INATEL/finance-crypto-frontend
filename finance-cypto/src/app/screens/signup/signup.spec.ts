import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup';
import { vi } from 'vitest';

describe('SignupComponent', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SignupComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve criar o componente', () => {
        expect(component).toBeTruthy();
    });

    it('deve renderizar o título correto', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h2')?.textContent).toContain('Crie sua conta');
    });

    it('deve registrar os dados corretos ao chamar onSignup()', () => {
        component.name = 'João';
        component.email = 'joao@email.com';
        component.password = 'senhaForte123';

        const consoleSpy = vi.spyOn(console, 'log');

        component.onSignup();

        expect(consoleSpy).toHaveBeenCalledWith('Signup data:', {
            name: 'João',
            email: 'joao@email.com',
            password: 'senhaForte123'
        });
    });
});