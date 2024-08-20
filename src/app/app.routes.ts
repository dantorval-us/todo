import { Routes } from '@angular/router';
import { TodoListComponent } from './features/todo-list/todo-list.component';

export const routes: Routes = [
  {
    path: 'to-do-list',
    component: TodoListComponent,
  },
  {
    path: '**',
    redirectTo: '/to-do-list',
  },
];
