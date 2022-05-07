import { Component } from '@angular/core';
import { Project } from '../assets/project';
import { MatDialog } from '@angular/material/dialog';

import {
  ProjectPopupComponent,
  ProjectPopupResult,
} from '../project-popup/project-popup.component';

import {
  TaskPopupComponent,
  TaskPopupResult,
} from '../task-popup/task-popup.component';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TODOComponent {
  constructor(private dialog: MatDialog) {}
  projects: Project[] = [];
  selectedProject: Project | null = null;
  AddProject(): void {
    const dialogRef = this.dialog.open(ProjectPopupComponent, {
      width: '270px',
      maxHeight: '40vh',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: ProjectPopupResult) => {
      console.log(result);
      if (result.project === null || !result.project.name) {
        return;
      }
      let IsTheSame = false;
      this.projects.forEach((project) => {
        if (project.name == result.project?.name) {
          IsTheSame = true;
        }
      });
      if (IsTheSame) {
        return;
      }
      this.projects.push(result.project);
    });
  }
  AddTask(): void {
    const dialogRef = this.dialog.open(TaskPopupComponent, {
      width: '270px',
      maxHeight: '40vh',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: TaskPopupResult) => {
      console.log(result);
      console.log(this.selectedProject?.tasks);
      if (result.task === null || !result.task.name) {
        return;
      }
      if (this.selectedProject != null) {
        if (this.selectedProject?.tasks === undefined) {
          this.selectedProject.tasks = [];
        }
        result.task.done = false;
        this.selectedProject?.tasks?.push(result.task);
      }
    });
  }
  selectProject(event: Event): void {
    let projectName = (event.target as HTMLSelectElement).value;
    if (
      this.selectedProject != null &&
      this.selectedProject.name != projectName
    ) {
      this.projects.forEach((project, index) => {
        if (project.name === this.selectProject.name) {
          this.projects[index] = this.selectedProject!;
        }
      });
    }
    if (projectName == 'None') {
      this.selectedProject = null;
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
