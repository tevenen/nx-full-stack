import { Route } from '@angular/router';

export const appRoutes: Route[] = [{
  path: 'login',
  loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent)
}, {
  path: '**',
  redirectTo: 'login'
}];
