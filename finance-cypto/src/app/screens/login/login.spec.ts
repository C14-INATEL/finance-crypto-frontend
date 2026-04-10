import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { vi } from 'vitest';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should log in with valid credentials', () => {
    component.email = 'seu@email.com';
    component.password = 'senha123';

    const consoleSpy = vi.spyOn(console, 'log');

    component.onLogin();

    expect(consoleSpy).toHaveBeenCalledWith('Login data:', {
      email: 'seu@email.com',
      password: 'senha123',
    });
  });

  it('should render the welcome title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Bem-vindo de volta');
  });
});