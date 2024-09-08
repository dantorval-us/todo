import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeatureContainerComponent } from "@components/feature-container/feature-container.component";
import { NavbarComponent } from '@components/navbar/navbar.component';
import { TodoListComponent } from "@features/todo-list/todo-list.component";

const COMPONENTS = [TodoListComponent, FeatureContainerComponent, NavbarComponent];
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, COMPONENTS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
