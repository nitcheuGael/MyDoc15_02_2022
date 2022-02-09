import { Injectable, NgZone } from '@angular/core';
import { User } from "../entite/user";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";



@Injectable({
  providedIn: 'root'
})

export class Authen1Service {
  userData: any; // Save logged in user data
  //donneruser: User | undefined;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        // JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', this.userData);
        // JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password:  SE CONNECTER

  SignIn(email: User, passeword: User) {
    return this.afAuth.signInWithEmailAndPassword(email.email, passeword.passeword)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/component/', 'acceuil']);
        });
        //this.SetUserData(result);
      }).catch((error) => {
        window.alert(error.message)
      })
  }



  // Sign up with email/password: Creer compte 
  SignUp(client: User) {
    return this.afAuth.createUserWithEmailAndPassword(client.email, client.passeword)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(client);
      }).catch((error) => {
        window.alert(error.message)
      })
  }


  // Auth logic to run auth providers
  // AuthLogin(provider: firebase.default.auth.AuthProvider) {
  //   return this.afAuth.signInWithPopup(provider)
  //   .then((result) => {
  //      this.ngZone.run(() => {
  //         this.router.navigate(['dashboard']);
  //       })
  //     this.SetUserData1(result);
  //   }).catch((error) => {
  //     window.alert(error)
  //   })
  // }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }


  // Reset Forggot password
  ForgotPassword(passwordResetEmail: any) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }






  // Returns true when user is looged in and email is verified
  // VERIFI SI C'EST LA BONNE PERSONNES QUI SE CONNECTE 
  get isLoggedIn(): boolean {
    // const user = JSON.parse(localStorage.getItem('user'));
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new this.afAuth.GoogleAuthProvider());
  // }

  // Send email verfificaiton when new user sign up


  async SendVerificationMail() {
    await (await this.afAuth.currentUser)?.sendEmailVerification().then(() => {
      console.log('email sent');
    });
  }


  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(client: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${client.uid}`);
    const userData: User = {
      uid: client.uid,
      email: client.email,
      displayName: client.displayName,
      photoURL: client.photoURL,
      emailVerified: client.emailVerified,
      passeword: client.passeword
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  SetUserData1(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      passeword: user.passeword

    }
    return userRef.set(userData, {
      merge: true
    })
  }

  SetUserData2(user: { uid: any; email: any; displayName: any; photoURL: any; emailVerified: any; }) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userState: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      passeword: ''
    }
    return userRef.set(userState, {
      merge: true
    })
  }


}