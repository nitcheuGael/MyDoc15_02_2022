import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  demande = false
  connexion = true

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
  }

  annulAction() {
    this.dialogRef.close(false);
  }

  openDialogs() {
    this.demande = true
    this.connexion = false
    this.dialog.open(DialogComponent);
  }
}



