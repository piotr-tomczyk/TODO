import { Component, Input } from '@angular/core';
import { Project } from '../assets/project';
@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css'],
})
export class ProjectViewComponent {
  @Input() project: Project | null = null;
}
