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
    component: LoginComponent,
    ...canActivate(redirectLogged)
  },
  {
    path: '',
    component: MainLayoutComponent,
    ...canActivate(redirectUnauthorized),
    children: [
      {
        path: '',
        component: FeatureContainerComponent,
        children: [
          {
            path: 'to-do-list',
            title: 'Todo | Mis tareas',
            component: TodoListComponent,
          },
          {
            path: 'temporizador',
            title: 'Todo | Temporizador',
            component: TemporizadorComponent,
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
