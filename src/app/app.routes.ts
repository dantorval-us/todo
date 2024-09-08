import { Routes } from '@angular/router';
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
        path: 'temporizador',
        title: 'Todo | Temporizador',
        component: TemporizadorComponent
      }
    ]
  },
  {
    path: 'to-do-list',
    title: 'Todo | Mis tareas',
    component: TodoListComponent,
  },
  {
    path: '**',
    redirectTo: '/to-do-list'
  }
];
