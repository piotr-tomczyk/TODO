import { Component } from '@angular/core';
import { Project, Task } from '../assets/project';
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
      if (result.project === null || !result.project.name) {
        return;
      }
      let foundProject: Project | undefined = this.projects.find(
        (project) => project.name == result.project?.name
      );
      if (foundProject != undefined) {
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
      if (result.task === null || !result.task.name) {
        return;
      }
      if (this.selectedProject != null) {
        if (this.selectedProject?.tasks === undefined) {
          this.selectedProject.tasks = [];
          this.selectedProject.highestIndex = 0;
        }
        result.task.done = false;
        result.task.id = this.selectedProject.highestIndex;
        this.selectedProject.highestIndex++;
        this.selectedProject?.tasks?.push(result.task);
      }
    });
  }
  DeleteTask(taskToDelete: Task): void {
    let idOfTask = this.selectedProject?.tasks?.indexOf(taskToDelete);
    if (idOfTask != undefined) this.selectedProject?.tasks?.splice(idOfTask, 1);
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
