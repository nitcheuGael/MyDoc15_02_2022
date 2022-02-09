import { Component, NgZone, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { Router } from '@angular/router';
import firebase from 'firebase/app';



@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {
  otp!: string;
  verify: any;
  auth: any;
  public testIsConnect = true

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private afuth: FirebaseApp,

  ) { }
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };

  ngOnInit(): void {
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
    console.log(this.verify);
  }
  onOtpChange(otp: string) {
    this.otp = otp;
  }
  handleClick() {
    console.log(this.otp);
    var credential = firebase.auth.PhoneAuthProvider.credential(
      this.verify,
      this.otp
    );

    console.log(credential);
    firebase.auth()
      .signInWithCredential(credential)
      .then((response) => {
        console.log(response);
        localStorage.setItem('user_data', JSON.stringify(response));
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }

  testConnexion() {
    this.afuth.auth().onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate(['/dashboard'])

      } else {
        this.testIsConnect = false;
        this.router.navigate(['/connexion'])
      }
    })

  }

}
