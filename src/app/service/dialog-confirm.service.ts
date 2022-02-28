import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageOkComponent } from '../Dialog/dialog-message-ok/dialog-message-ok.component';

@Injectable({
  providedIn: 'root'
})
export class DialogConfirmService {

  constructor(
    private dialog: MatDialog

  ) { }

  confirmActionAlertDialogue(message?: string, titre?: string) {
    let finalMessage = 'Confirmer?'
    if (message) {
      finalMessage = message;
    }
    const dialogRef = this.dialog.open(DialogMessageOkComponent, {
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
