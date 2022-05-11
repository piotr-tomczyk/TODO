import { Component, OnInit } from '@angular/core';
import { Project, Task } from '../assets/project';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, subscribeOn } from 'rxjs';
import {
  ProjectPopupComponent,
  ProjectPopupResult,
} from '../project-popup/project-popup.component';
import {
  TaskPopupComponent,
  TaskPopupResult,
} from '../task-popup/task-popup.component';
import { AuthService } from '../Services/auth.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TODOComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private store: AngularFirestore,
    public auth: AuthService
  ) {}
  ngOnInit(): void {
    this.projects.subscribe((val) => {
      this.projectsLenght = val.length;
    });
    this.projects.subscribe((val) => {
      this.localProjects = val;
    });
  }
  projects = this.store
    .collection(`users/${this.auth.getUser().uid}/projects`)
    .valueChanges() as Observable<Project[]>;
  selectedProject: Project | null = null;
  projectsLenght = 0;
  localProjects: Project[] = [];
  isLoggedIn = false;
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
      let foundProject: Project | undefined = this.localProjects.find(
        (project) => project.name == result.project?.name
      );
      if (foundProject != undefined) {
        return;
      }
      result.project.tasks = [];
      result.project.highestIndex = 0;
      result.project.id = this.store.createId();
      this.store
        .collection(`users/${this.auth.getUser().uid}/projects`)
        .doc(result.project.id)
        .set(result.project);
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
        console.log(this.selectedProject);
        result.task.done = false;
        result.task.id = this.selectedProject.highestIndex;
        this.selectedProject.highestIndex++;
        this.selectedProject.tasks.push(result.task);
        this.store
          .collection(`users/${this.auth.getUser().uid}/projects`)
          .doc(this.selectedProject.id)
          .update({
            highestIndex: this.selectedProject.highestIndex,
            tasks: this.selectedProject.tasks,
          });
      }
    });
  }
  DeleteTask(taskToDelete: Task): void {
    if (this.selectedProject != undefined) {
      let idOfTask = this.selectedProject.tasks.indexOf(taskToDelete);
      if (idOfTask != undefined) this.selectedProject.tasks.splice(idOfTask, 1);
      console.log(this.selectedProject);
      this.store
        .collection(`users/${this.auth.getUser().uid}/projects`)
        .doc(this.selectedProject.id)
        .update({ tasks: this.selectedProject.tasks });
    }
  }
  ChangeTask(taskToChange: Task): void {
    console.log(taskToChange);
    if (this.selectedProject != undefined) {
      let idOfTask = this.selectedProject.tasks.indexOf(taskToChange);
      if (idOfTask != undefined)
        this.selectedProject.tasks[idOfTask].done = !taskToChange.done;
      console.log(this.selectedProject);
      this.store
        .collection(`users/${this.auth.getUser().uid}/projects`)
        .doc(this.selectedProject.id)
        .update({ tasks: this.selectedProject.tasks });
    }
  }
  DeleteProject(): void {
    if (this.selectedProject != undefined) {
      this.store
        .collection(`users/${this.auth.getUser().uid}/projects`)
        .doc(this.selectedProject.id)
        .delete();
      this.selectedProject = null;
    }
  }
}
