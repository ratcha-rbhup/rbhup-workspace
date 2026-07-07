import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./storybook-page/storybook-page.component').then(m => m.StorybookPageComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login-demo/login-demo.component').then(m => m.LoginDemoComponent),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
