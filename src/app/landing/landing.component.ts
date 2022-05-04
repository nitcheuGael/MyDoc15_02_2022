import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constante } from '../entite/constante';
import { AuthService } from '../service/auth.service';
import { DialogConfirmService } from '../service/dialog-confirm.service';
import { DialogConfirmeService } from '../service/Dialog/dialog-confirme.service';
import { MailService } from '../service/smsMail/mail.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  firstFormGroup!: FormGroup

  testbutonD = false
  testbutonC = true
  afficheCon = false
  button1 = true
  button2 = false
  title = 'app';
  submitted = true;



  constructor(
    private serviceAuth: AuthService,
    private auth: FirebaseApp,
    private dialogoService: DialogConfirmeService,
    private router: Router,
    public serviceMailSms: MailService,
    private message_confirme: DialogConfirmService,
    private formBuilder: FormBuilder,




  ) { }

  ngOnInit(): void {
    // this.initialisationformulair()
    this.init1();
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
  get nom() {
    return this.firstFormGroup!.get('nom')
  }
  get email() {
    return this.firstFormGroup!.get('email')
  }
  get sujet() {
    return this.firstFormGroup!.get('sujet')
  }
  get message() {
    return this.firstFormGroup!.get('message')
  }
  /* Constante.emailNotification */
  sendMail() {


    var email = Constante.emailNotification + ',' + 'gaelnitcheufatal@gmail.com' + ',' + this.email?.value;
    var email1 = '' + this.email?.value;
    var objt = '' + this.sujet?.value;
    var message = 'Nom :  ' + this.nom?.value + '    Email:   ' + email1 + '     Message:   ' + this.message?.value;
    var entete = 'From: Mydoc@mydoc.cm'


    if (!this.firstFormGroup.invalid) {
      this.serviceMailSms.sendEmail(email, objt, message, entete).then((projet) => {
      }).catch(rejet => {
        this.message_confirme.confirmActionAlertDialogue('Votre message sera pris en compte. Merci de nous avoir contacté.');
        this.init1()
      })

    } else {
      this.message_confirme.confirmActionAlertDialogue('Veuillez Remplir tous les champs oubligatoire');
    }

  }

  init1() {
    this.firstFormGroup = this.formBuilder.group({
      nom: ['', Validators.required],
      email: ['', Validators.email],
      message: ['', Validators.required],
      sujet: [''],

    })

  }
  openNewTab() {
    window.open("https://youtu.be/-XmEg4B4DSY");
  }
  openNewTab1(lien: string) {
    window.open(lien);
  }
}



