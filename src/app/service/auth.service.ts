import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { User } from '../entite/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { DialogConfirmeService } from './Dialog/dialog-confirme.service';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  firebase: any;
  idUser: string | undefined;

  private currentUserSubject = new BehaviorSubject<any>(null);
  dialogoService!: DialogConfirmeService

  constructor(
    public afAuth: AngularFireAuth,
    public auth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public firestore: AngularFirestore,
    private toast: ToastrService,

  ) {

    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', '');

      }
    })


  }



  //AUTHENTIFICATION VIA EMAIL EL PASSE
  loginWithEmail(data: User) {
    return this.auth.signInWithEmailAndPassword(data.email, data.passeword);
  }

  getDetails(data: { uid: string; }) {
    return this.firestore.collection("users").doc(data.uid).valueChanges();
  }




  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
        this.toast.info('good')
      })
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(value => {
        //this.router.navigate(['/', 'dashboard']);
      })
      .catch(err => {
        this.dialogoService.confirmActionAlertDialogue('Email ou Mot de passe erroner');
        console.log('erre', err);
      });
  }

  // Reset Forggot password
  ForgotPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        this.toast.error('Password reset email sent, check your inbox.')
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        this.toast.error(error)
        window.alert(error)

      })
  }


  // Sign up with email/password: Creer compte 
  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.sendUserEmailVerification();

        //this.SetUserData(result.user);
        window.alert(result.user?.email)

      }).catch((error) => {
        window.alert(error.message)
      })
  }

  sendUserEmailVerification() {
    return new Promise<string | void>((resolve, reject) => {
      this.firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
          // Email sent.
          // resolve();
        })
        .catch((error: any) => {
          // An error happened.
          reject(error);
        });
    });
  }
  emailLinkSend(email: string) {

    var actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: 'http://localhost:4200/connexion',
      // This must be true.
      handleCodeInApp: true
    };

    return new Promise(
      (resolve, reject) => {
        this.firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
          .then(() => {
            resolve(email);
          })
          .catch((error: { code: any; message: any; }) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            reject(errorMessage);
          });
      });
  }



  emailSignup(nom: string, email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Sucess', value);
        this.router.navigate(['/component/', 'demande']);
      })
      .catch(error => {
        console.log('Something went wrong: ', error);
      });
  }
  // [routerLink]="['/component/','acceuil']'
  googleLogin() {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
      .then(value => {
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
      });
  }

  logout() {
    return this.afAuth.signOut()
  }

  private oAuthLogin(provider: firebase.default.auth.AuthProvider) {
    return this.afAuth.signInWithPopup(provider);
  }

  //https://angular-templates.io/tutorials/about/firebase-authentication-with-angular

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.default.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        })
    })
  }

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.default.auth.FacebookAuthProvider();
      this.afAuth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }
  getUid() {
    console.log("la valeur de uid est de : ")

    var val = this.afAuth.currentUser.then(this.userData.uid)
    console.log("la valeur de uid est de : " + val)

  }

  getuid() {
    this.firebase.auth.currentUser.uid;
  }

  getCurrentUser(): Observable<any> {
    console.log('donnee de la personne ');
    return this.currentUserSubject.asObservable();
  }

}
