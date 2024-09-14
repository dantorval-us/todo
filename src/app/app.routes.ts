import { Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { FeatureContainerComponent } from '@components/feature-container/feature-container.component';
import { TodoListComponent } from '@features/todo-list/todo-list.component';
import { TemporizadorComponent } from '@features/temporizador/temporizador.component';

export const routes: Routes = [
  {
    path: '',
    component: FeatureContainerComponent,
    children: [
      {
        path: '',
        redirectTo: '/to-do-list',
        pathMatch: 'full'
      },
      {
        path: 'to-do-list',
        title: 'Todo | Mis tareas',
        component: TodoListComponent,
        ...canActivate(() => redirectUnauthorizedTo(['/login']))
      },
      {
        path: 'temporizador',
        title: 'Todo | Temporizador',
        component: TemporizadorComponent,
        ...canActivate(() => redirectUnauthorizedTo(['/login']))
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/to-do-list'
  }
];
