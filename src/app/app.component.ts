import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeatureContainerComponent } from "@components/feature-container/feature-container.component";
import { TodoListComponent } from "@features/todo-list/todo-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoListComponent, FeatureContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
