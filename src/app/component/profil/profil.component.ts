import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfilUser } from 'src/app/entite/profil/profil-user';
import { UserService } from 'src/app/service/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogoHeaderComponent } from 'src/app/Dialog/dialogo-header/dialogo-header.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  firstFormGroup!: FormGroup
  id: any;
  photoP = '';
  userListe!: ProfilUser;
  testlaod = false
  testlaod1 = true

  // uploadProgress!: Observable<number>;

  //les donnes pour uploader la photo de profil
  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  downloadURL: any = "assets/images/users/profil.jpg";
  fb: any;


  constructor(
    private afAuth: AngularFireAuth,
    private serviceUser: UserService,
    private afStorage: AngularFireStorage,
    public dialog: MatDialog,
    public toast: ToastrService
  ) {



  }

  ngOnInit(): void {
    this.initialisationformulair()
    this.afAuth.currentUser.then((user) => {
      this.id = user?.uid
      this.loadData();
      this.downloadpicture();
    })
  }

  initialisationformulair() {
    //j'initialise le formulaire au demarage de l'application pour eviter certain burg
    this.firstFormGroup = new FormGroup({
      nom: new FormControl(''),
      prenom: new FormControl(''),
      email: new FormControl(''),
      tel: new FormControl(''),
      sexe: new FormControl(''),
      ville: new FormControl(''),
      quatier: new FormControl(''),

    })
  }

  get nom() {
    return this.firstFormGroup!.get('nom')
  }

  get prenom() {
    return this.firstFormGroup!.get('prenom')
  }
  get email() {
    return this.firstFormGroup!.get('email')
  }
  get tel() {
    return this.firstFormGroup!.get('tel')
  }
  get ville() {
    return this.firstFormGroup!.get('ville')
  }
  get quatier() {
    return this.firstFormGroup!.get('quatier')
  }
  get sexe1() {
    return this.firstFormGroup!.get('sexe1')
  }
  get sexe() {
    return this.firstFormGroup!.get('sexe')
  }
  get photo() {
    return this.firstFormGroup!.get('photo')
  }


  openDialog() {
    this.dialog.open(DialogComponent);
  }
  openDialog1() {
    const dialogRef = this.dialog.open(DialogoHeaderComponent);
    this.dialog.getDialogById
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }




  seveUser() {
    var profil = new ProfilUser(
      this.nom?.value, this.prenom?.value, this.sexe?.value, this.tel?.value,
      this.id, this.ville?.value, this.quatier?.value,
      this.photo?.value, this.email?.value)
    this.serviceUser.addUser(profil).then((data) => {
      this.toast.success(this.prenom?.value + "  " + this.nom?.value + 'enregistrer', 'Enregistrement');
    }).catch(error => {
      this.toast.error('Erreur d enregistrement');
    })

  }

  loadData() {
    this.serviceUser.getUser(this.id)
      .then((data: any) => {
        this.userListe = data.ProfileUsr as ProfilUser;
        if (this.userListe.uid.length != 0) {

          this.firstFormGroup = new FormGroup({
            nom: new FormControl(this.userListe.nom),
            prenom: new FormControl(this.userListe.prenom),
            email: new FormControl(this.userListe.email),
            tel: new FormControl(this.userListe.telephone),
            sexe: new FormControl(this.userListe.sexe),
            ville: new FormControl(this.userListe.ville),
            quatier: new FormControl(this.userListe.quatier),

          })
          this.testlaod = true;
          this.testlaod1 = false;
        }

      })
      .catch((error) => {
        console.log("les erreurs de l'afficharge", error);
      });

  }

  // function to upload file
  upload = (event: { target: { files: any[]; }; }) => {
    // const randomId = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref('/images/' + this.id);
    this.task = this.ref.put(event.target.files[0]);
    this.downloadpicture();

  }

  downloadpicture() {
    const filePath = '/images/' + this.id;
    const fileRef = this.afStorage.ref(filePath);
    this.downloadURL = fileRef.getDownloadURL();
    this.downloadURL.subscribe((url: string) => {
      if (url) {
        this.fb = url;
        this.downloadURL = url;

        // console.log('valeure de la console')
      } else {
        this.downloadURL = "assets/images/users/profil.jpg";
        //  console.log('la valeure de download existe pas', this.downloadURL);

      }
      // console.log('la valeure de fb', this.downloadURL);
    }).catch(() => {
      //console.log("les erreurs de l'afficharge");
    })
      ;


  }

}
