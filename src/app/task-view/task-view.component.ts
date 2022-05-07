import { Component, Input } from '@angular/core';
import { Task } from '../assets/project';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css'],
})
export class TaskViewComponent {
  @Input() task: Task | null = null;
}
