import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmActionComponent } from 'src/app/Dialog/dialog-confirm-action/dialog-confirm-action.component';

@Injectable({
  providedIn: 'root'
})
export class DialogConfirmeService {

  constructor(
    private dialog: MatDialog

  ) { }

  confirmActionAlertDialogue(message?: string) {
    let finalMessage = 'Confirmer?'
    if (message) {
      finalMessage = message;
    }
    const dialogRef = this.dialog.open(DialogConfirmActionComponent, {
      data: finalMessage,
      width: '300px',
      // height: '100px'
    });
    return new Promise<boolean>((resolve) => {
      dialogRef.afterClosed().subscribe(result => {
        try {
          if (result !== undefined && result !== null) {
            let data: boolean = (result as boolean);
            resolve(data);
          }
        } catch (error) {
          resolve(false);
        }
      });
    });
  }
}
