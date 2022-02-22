import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DialogConfirmeService } from 'src/app/service/Dialog/dialog-confirme.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  @Output()
  toggleSidebar = new EventEmitter<void>();
  urlPhoto: any = "assets/images/avatar.png";
  id: any;
  fb: any;


  public showSearch = false;

  constructor(
    private afAuth: AngularFireAuth,
    private serviceAuth: AuthService,
    private router: Router,
    private dialogoService: DialogConfirmeService,
    private afStorage: AngularFireStorage,



  ) { }
  ngOnInit(): void {
    this.afAuth.currentUser.then((user) => {
      this.id = user?.uid
      // this.getPROFIL()
    })
  }


  logOut() {
    this.dialogoService.confirmActionAlertDialogue('Voullez vous vraiment vous deconnecter?? ').then(result => {
      if (result) {
        this.serviceAuth.logout().then(() => {
          this.router.navigate(['/'])
        })
      }
    });

  }
  getPROFIL() {
    const filePath = '/images/' + this.id;
    const fileRef = this.afStorage.ref(filePath);
    this.urlPhoto = fileRef.getDownloadURL();
    this.urlPhoto.subscribe((url: string) => {
      if (url) {
        this.fb = url;
        this.urlPhoto = url;

        console.log('valeure de la console')
      } else {
        this.urlPhoto = "assets/images/users/profil.jpg";
        console.log('la valeure de download existe pas', this.urlPhoto);

      }
      console.log('la valeure de fb', this.urlPhoto);
    }).catch(() => {
      console.log("les erreurs de l'afficharge");
    })
      ;


  }

}

