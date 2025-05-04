import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart.component').then((m) => m.CartComponent)
  },
  {
    path: 'about',
    loadComponent: () =>
    import('./features/about/about.component').then((m) => m.AboutComponent)
  }
];
