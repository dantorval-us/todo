import { Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { TodoListComponent } from '@features/todo-list/todo-list.component';
import { TemporizadorComponent } from '@features/temporizador/temporizador.component';
import { LoginComponent } from '@features/login/login.component';
import { MainLayoutComponent } from '@components/main-layout/main-layout.component';
import { FeatureContainerComponent } from '@components/feature-container/feature-container.component';

const redirectLogged = () => redirectLoggedInTo(['/to-do-list']);
const redirectUnauthorized = () => redirectUnauthorizedTo(['/login']);

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@features/login/login.component').then(c => c.LoginComponent),
    ...canActivate(redirectLogged)
  },
  {
    path: '',
    loadComponent: () => import('@components/main-layout/main-layout.component').then(c => c.MainLayoutComponent),
    ...canActivate(redirectUnauthorized),
    children: [
      {
        path: '',
        loadComponent: () => import('@components/feature-container/feature-container.component').then(c => c.FeatureContainerComponent),
        children: [
          {
            path: 'to-do-list',
            title: 'Todo | Mis tareas',
            loadComponent: () => import('@features/todo-list/todo-list.component').then(c => c.TodoListComponent)
          },
          {
            path: 'temporizador',
            title: 'Todo | Temporizador',
            loadComponent: () => import('@features/temporizador/temporizador.component').then(c => c.TemporizadorComponent)
          },
          {
            path: '',
            redirectTo: '/to-do-list',
            pathMatch: 'full'
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
