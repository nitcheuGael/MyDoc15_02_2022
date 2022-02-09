import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-guard',
  templateUrl: './auth-guard.component.html',
  styleUrls: ['./auth-guard.component.css']
})
export class AuthGuardComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: FirebaseApp,

  ) { }

  ngOnInit(): void {
    this.auth.auth().onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate(['/dashboard'])
      } else {
        this.router.navigate(['/connexion'])
      }
    })
  }


}
