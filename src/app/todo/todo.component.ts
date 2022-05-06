import { Component } from '@angular/core';
import { Project } from '../assets/project';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import {
  ProjectPopupComponent,
  PopupResult,
} from '../project-popup/project-popup.component';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TODOComponent {
  constructor(private dialog: MatDialog) {}
  projects: Project[] = [];
  selectedProject: Project = { name: '' };
  AddProject(): void {
    const dialogRef = this.dialog.open(ProjectPopupComponent, {
      width: '270px',
      maxHeight: '40vh',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: PopupResult) => {
      if (result.project == null) {
        return;
      }
      this.projects.push(result.project);
    });
  }
  selectProject(event: Event): void {
    let projectName = (event.target as HTMLSelectElement).value;
    console.log(this.selectProject.name, projectName);
    if (projectName == 'None') {
      this.selectedProject = { name: '' };
      return;
    }
    this.projects.forEach((project) => {
      if (project.name == projectName) {
        this.selectedProject = project;
        return;
      }
    });
  }
}
