import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Task } from '../assets/project';
@Component({
  selector: 'app-task-popup',
  templateUrl: './task-popup.component.html',
  styleUrls: ['./task-popup.component.css'],
})
export class TaskPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {}
  cancel(): void {
    this.dialogRef.close(this.data);
  }
}
export interface TaskPopupResult {
  task: Task;
}
