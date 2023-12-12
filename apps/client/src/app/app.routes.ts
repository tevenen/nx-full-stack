import { Route } from '@angular/router';

export const appRoutes: Route[] = [{
  path: 'login',
  loadComponent: () => import('./components/auth/auth.component').then(c => c.AuthComponent)
}, {
  path: '**',
  redirectTo: 'login'
}];
