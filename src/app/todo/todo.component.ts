import { Component } from '@angular/core';
import { Project } from '../assets/project';
import { MatDialog } from '@angular/material/dialog';
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
  AddProject(): void {
    const dialogRef = this.dialog.open(ProjectPopupComponent, {
      width: '270px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: PopupResult) => {
      if (!result) {
        return;
      }
      console.log(result);
      this.projects.push(result.project);
    });
  }
}
