import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DialogConfirmeService } from 'src/app/service/Dialog/dialog-confirme.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {

  @Output()
  toggleSidebar = new EventEmitter<void>();
  //url = '#pricing'


  public showSearch = false;

  constructor(
    private serviceAuth: AuthService,
    private router: Router,
    private dialogoService: DialogConfirmeService


  ) { }


  logOut() {
    this.dialogoService.confirmActionAlertDialogue('Voullez vous vraiment vous deconnecter?? ').then(result => {
      if (result) {
        this.serviceAuth.logout().then(() => {
          this.router.navigate(['/'])
        })
      }
    });

  }
}
