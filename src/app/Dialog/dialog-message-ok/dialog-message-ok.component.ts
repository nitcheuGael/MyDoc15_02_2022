import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogConfirmService } from 'src/app/service/dialog-confirm.service';

@Component({
  selector: 'app-dialog-message-ok',
  templateUrl: './dialog-message-ok.component.html',
  styleUrls: ['./dialog-message-ok.component.css']
})
export class DialogMessageOkComponent implements OnInit {
  demande = false
  connexion = true

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmService>,
    @Inject(MAT_DIALOG_DATA)
    public data: string,
    public dialog: MatDialog
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
