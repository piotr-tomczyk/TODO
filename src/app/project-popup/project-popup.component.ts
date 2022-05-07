import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from '../assets/project';
@Component({
  selector: 'app-project-popup',
  templateUrl: './project-popup.component.html',
  styleUrls: ['./project-popup.component.css'],
})
export class ProjectPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<ProjectPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) {}
  cancel(): void {
    this.dialogRef.close(this.data);
  }
}
export interface ProjectPopupResult {
  project: Project | null;
}
