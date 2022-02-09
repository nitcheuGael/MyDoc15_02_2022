import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm-action',
  templateUrl: './dialog-confirm-action.component.html',
  styleUrls: ['./dialog-confirm-action.component.css']
})
export class DialogConfirmActionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmActionComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: string
  ) { }

  ngOnInit(): void {
  }

  confirmAction() {
    this.dialogRef.close(true);
  }

  annulAction() {
    this.dialogRef.close(false);
  }

}
