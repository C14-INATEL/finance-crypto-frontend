import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { Location } from '@angular/common';
import { routes } from './app.routes';

describe('App Routing', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes)
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('deve redirecionar a rota vazia ("") para "/login"', async () => {
    await router.navigate(['']);
    expect(location.path()).toBe('/login');
  });

  it('deve navegar para a rota "/home"', async () => {
    await router.navigate(['/home']);
    expect(location.path()).toBe('/home');
  });

  it('deve navegar para a rota "/signup"', async () => {
    await router.navigate(['/signup']);
    expect(location.path()).toBe('/signup');
  });

  it('deve navegar para a rota "/login"', async () => {
    await router.navigate(['/login']);
    expect(location.path()).toBe('/login');
  });
});