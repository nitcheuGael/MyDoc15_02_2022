import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';
import { FirebaseApp } from '@angular/fire';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../Dialog/dialog/dialog.component';
import firebase from 'firebase/app';
import { MailService } from '../service/smsMail/mail.service';
import { Constante } from '../entite/constante';







@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  loginform!: FormGroup;
  response: string | null = '';
  userId!: Observable<string>;
  statutDom = false;
  statutDom1 = false;
  statutDom2 = true;
  email1: any;

  phoneNumber: any;
  reCaptchaVerifier!: any;

  public contance: Constante
    // emailh = new FormControl('', [Validators.required, Validators.email]);
    | undefined

  // emailh = new FormControl('', [Validators.required, Validators.email]);


  constructor
    (
      public router: Router,
      private authService: AuthService,
      public afAuth: AngularFireAuth,
      private auth: FirebaseApp,
      private toast: ToastrService,
      public dialog: MatDialog,
      private ngZone: NgZone,
      public serviceMailSms: MailService,


  ) { }
  //public user: User | undefined  https://remotestack.io/angular-firebase-authentication-example-tutorial/


  ngOnInit(): void {
    this.auth.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.initialisationformulair();
      } else {
        this.router.navigate(['/dashboard'])
        // this.toast.success('Good', 'Titre', { timeOut: 5000 })
      }
    })
  }

  premutationDom1() {
    this.statutDom = true;
    this.statutDom1 = false;
    this.statutDom2 = false;


  }
  premutationDom2() {
    this.statutDom = false;
    this.statutDom1 = true;
    this.statutDom2 = false;
  }
  premutationDom3() {
    this.statutDom = false;
    this.statutDom1 = false;
    this.statutDom2 = true;
  }

  //CONTROLE DU CHAMP DE SAISI EMAIL

  getErrorMessage() {
    if (this.email!.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email!.hasError('email') ? 'Not a valid email' : '';
  }


  //CONNEXION VIA COMPTE GOOGLE
  loginGoogle() {
    this.authService.googleLogin().then(() => {
      this.afAuth.currentUser.then((user) => {
        this.email1 = user?.email
      })
      var email = Constante.emailNotification;
      var objt = "Creation de Compte";
      var message = "Nouveau compte creer via GoogleLogin email: " + this.email1;
      var entete = 'From: Mydoc@mydoc.cm'
      this.serviceMailSms.sendEmail(email, objt, message, entete)

    })
  }


  initialisationformulair() {
    //j'initialise le formulaire au demarage de l'application pour eviter certain burg
    this.loginform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      pasword: new FormControl(''),
      nom: new FormControl(''),

    })
  }

  get email() {
    return this.loginform.get('email')
  }
  get pasword() {
    return this.loginform.get('pasword')
  }
  get nom() {
    return this.loginform.get('nom')
  }
  //CONNEXION VIA MOT DE PASSE
  connexion() {
    this.authService.login(this.email?.value, this.pasword?.value).then(() => {
      this.toast.success('Connexion reusir', 'Connexion');
      // this.router.navigate(['/', 'dashboard']);
    }).catch(err => {
      this.toast.error('echec de connexion', 'error');
      this.pasword?.setValue('');
      this.dialog.open(DialogComponent)

    });
    // CREATION DE COMPTE VIA EMAIL MOT DE PASSE
  }
  creerCompte() {
    this.authService.SignUp(this.email?.value, this.pasword?.value).then(() => {

      var email = Constante.emailNotification;
      var objt = "Creation de Compte";
      var message = "Nouveau compte Creer email:" + this.email;
      var entete = 'From: Mydoc@mydoc.cm'
      this.serviceMailSms.sendEmail(email, objt, message, entete).then((projet) => {

      }).catch(rejet => {

      })
    }
    )
  }

  //ENVOI DU LIEN DE VERIFICATION
  emailLinkSend() {
    this.authService.emailLinkSend(this.email?.value)
  }
  //MOT DE PASSE OUBLIER 
  resetPass() {
    this.authService.ForgotPassword(this.email?.value).then((data) => {
      if (this.email?.value != null) {
        this.toast.error('Veuillez entrer une adresse email valide')

      } else {
        this.toast.success('Email vous avez recus le mail')

      }
    }).catch(errur => {
      this.toast.error('erreur de l envoi du mail')
    })
  }
  faceboock() {
    this.authService.doFacebookLogin().then((resul) => {

    }).catch(rejet => {


    })
  }
  //CONNEXION VIA NUMERO DE TELEPHONE
  getOTP() {
    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
      }
    );
    // console.log(this.reCaptchaVerifier);

    firebase.auth()
      .signInWithPhoneNumber(this.phoneNumber, this.reCaptchaVerifier)
      .then((confirmationResult) => {
        localStorage.setItem(
          'verificationId',
          JSON.stringify(confirmationResult.verificationId)
        );
        this.ngZone.run(() => {
          this.router.navigate(['/code']);
        });
      })
      .catch((error) => {
        // console.log(error.message);
        alert(error.message);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      });
  }

}