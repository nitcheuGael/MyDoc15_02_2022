import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { DialogConfirmeService } from '../service/Dialog/dialog-confirme.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  testbutonD = false
  testbutonC = true
  afficheCon = false
  button1 = true
  button2 = false
  title = 'app';


  constructor(
    private serviceAuth: AuthService,
    private auth: FirebaseApp,
    private dialogoService: DialogConfirmeService,
    private router: Router,



  ) { }

  ngOnInit(): void {
    this.auth.auth().onAuthStateChanged((user) => {
      if (user) {
        this.testbutonD = true
        this.testbutonC = false

      }
    })
  }

  readMore() {
    this.afficheCon = true
    this.button2 = true
    this.button1 = false

  }
  unreadMore() {
    this.afficheCon = false
    this.button2 = false
    this.button1 = true
  }

  testeBouton() {
    this.auth.auth().onAuthStateChanged((user) => {
      if (user) {

      }
    })
  }
  logOut() {
    this.dialogoService.confirmActionAlertDialogue('Voullez vous vraiment vous deconnecter?? ').then(result => {
      if (result) {
        this.serviceAuth.logout().then(() => {
          this.router.navigate(['/'])
          this.testbutonD = false
          this.testbutonC = true
        })
      }
    });

  }

}


