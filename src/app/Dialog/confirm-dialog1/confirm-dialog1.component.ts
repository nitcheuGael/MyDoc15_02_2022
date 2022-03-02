import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog1',
  templateUrl: './confirm-dialog1.component.html',
  styleUrls: ['./confirm-dialog1.component.css']
})
export class ConfirmDialog1Component implements OnInit {
  title: string;
  message: string;
  constructor(public dialogRef: MatDialogRef<ConfirmDialog1Component>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    this.title = data.title;
    this.message = data.message;
  }
  ngOnInit() {
  }
  onCommand(): void {
    this.dialogRef.close(true);
  }
  onDelete(): void {
    this.dialogRef.close(false);
  }
}

export class ConfirmDialogModel {
  constructor(public title: string, public message: string) {
  }
}
