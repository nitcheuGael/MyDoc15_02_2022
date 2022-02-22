import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { MatDialog } from '@angular/material/dialog';
import { DialogoHeaderComponent } from 'src/app/Dialog/dialogo-header/dialogo-header.component';
import { demande } from 'src/app/entite/demande';
import { DatastorageService } from 'src/app/service/dataStorage/datastorage.service';
import { DialogConfirmeService } from 'src/app/service/Dialog/dialog-confirme.service';
import { ServiceBdService } from 'src/app/service/service-bd.service';
import { MailService } from 'src/app/service/smsMail/mail.service';
import { Router } from "@angular/router";
import { Constante } from 'src/app/entite/constante';



@Component({
  selector: 'app-recent-table',
  templateUrl: './recent-table.component.html',
  styleUrls: ['./recent-table.component.css']
})
export class RecentTableComponent implements OnInit {
  id: any;
  val: any;
  idDemande: any;
  nom: any;
  Prenom: any;
  numero: any
  statut = "actif"
  demandeList: demande[] = [];
  demandeList1: demande[] = [];
  dtOptions: DataTables.Settings = {};
  nDemande = true
  demandeEC = false
  demandeA = false
  demandeR = false
  listedDemande: any
  testAfficheInfos = true
  interupteurAfficheInfos = 0
  public constance!: Constante


  // LES ELEMENTS DU TABLEAU






  constructor(
    private serviceBd: ServiceBdService,
    private auth: FirebaseApp,
    public dataService: DatastorageService,
    public serviceMailSms: MailService,
    private dialogoService: DialogConfirmeService,
    public dialog: MatDialog,
    public router: Router,


  ) { }




  ngOnInit(): void {
    this.auth.auth().onAuthStateChanged((user) => {
      if (user) {
        this.id = user?.uid;
        this.dtOptions = {
          pagingType: 'full_numbers'

        };
        this.loadData();


      }

    })


  }



  fndemande() {
    this.nDemande = true
    this.demandeEC = false
    this.demandeA = false
    this.demandeR = false
    this.statut = 'atente'

  }
  fdemandeEC() {
    this.nDemande = false
    this.demandeEC = true
    this.demandeA = false
    this.demandeR = false
    this.statut = 'enCour'
    this.loadDataByStatut()
  }
  fdemandeA() {
    this.nDemande = false
    this.demandeEC = false
    this.demandeA = true
    this.demandeR = false
    this.statut = 'acheve'
    this.loadDataByStatut()

  }
  fdemandeR() {
    this.nDemande = false
    this.demandeEC = false
    this.demandeA = false
    this.demandeR = true
    this.statut = 'refuser'
    this.loadDataByStatut()

  }

  private loadData() {
    this.serviceBd.getDemandeByIdAnd_Statut(this.id, 'atente')
      .then((data: any) => {
        this.demandeList = data.demande as demande[];
        this.statut = 'enCour'
        this.loadDataByStatut()

      })
      .catch((error) => {
      })
      ;
  }

  private loadDataByStatut() {
    this.serviceBd.getDemandeByIdAnd_Statut(this.id, this.statut)
      .then((data: any) => {
        this.demandeList1 = data.demande as demande[];

      })
      .catch((error) => {
        console.log(error)
      })
      ;
  }

  // LA FONCTION QUI RECUPERE LE ID DE LA DEMANDE EN COURS
  RowSelected(u: any) {
    this.idDemande = u.id
    this.nom = u.nom
    this.Prenom = u.prenom
    this.numero = u.tel
    this.listedDemande = u
    localStorage.setItem('afficheDemande', JSON.stringify(this.listedDemande))
    this.fndemande()
    // console.log('les donnes pour voire le tableau', u)
    /* if (this.testAfficheInfos) {
      this.afficheDemandeSelectioner()
    } */
  }

  soumettreDemande() {
    this.testAfficheInfos = false
    this.dialogoService.confirmActionAlertDialogue('Voullez vous vraiment soumettre cette demande? ').then(result => {
      if (result) {
        this.serviceBd.editstatut(this.idDemande, 'enCour').then((data) => {
          this.statut = 'atente'
          this.loadData();
          this.sendMail();
          this.sendSms();
          this.sendSmsClient()
          this.fdemandeEC();
          this.testAfficheInfos = true
        }).catch(erro => {

        })
      } else {
        this.testAfficheInfos = true
      }
    });
  }
  suprimerDemande() {
    this.testAfficheInfos = false
    this.dialogoService.confirmActionAlertDialogue('Voullez vous vraiment suprimer  cette demande? ').then(result => {
      if (result) {
        this.serviceBd.editstatut(this.idDemande, 'Suprimer').then((data) => {
          this.statut = 'atente'
          this.loadData();
          this.fndemande();
          this.testAfficheInfos = true
        }).catch(erro => {

        })
      } else {
        this.testAfficheInfos = true
      }
    })
  }

  ModifierDemande() {
    this.testAfficheInfos = false

    this.dialogoService.confirmActionAlertDialogue('Voullez vous vraiment Modifier   cette demande? ').then(result => {
      if (result) {
        // this.dataService.afflisteDemande(this.listedDemande)
        let test = true
        localStorage.setItem('modifierDemande', JSON.stringify(this.listedDemande))
        localStorage.setItem('testModif', this.idDemande)

        this.router.navigate(['/component/', 'demande1']);
        this.testAfficheInfos = true

      } else {
        this.testAfficheInfos = true
      }

    });
  }

  testPartageDonnerViaService() {
    var bool = true
    this.dataService.toggle(bool);
    this.router.navigate(['/component/', 'demande1']);
  }


  sendMail() {
    var email = Constante.emailNotification;
    var objt = "Demande";
    var message = "La demande numero " + ' ' + this.idDemande + ' de ' + this.nom + '  ' + this.Prenom + ' a ete soumise ';
    var entete = 'From: Mydoc@mydoc.cm'
    this.serviceMailSms.sendEmail(email, objt, message, entete).then((projet) => {
      console.log('Envoi du mail avec succes', projet)

    }).catch(rejet => {
      console.log('erreur d envoi du mail ', rejet)
        ;
    })
  }
  sendSms() {
    this.serviceMailSms.sendSms("MyDoc", "00237678424125", "La demande numero " + ' ' + this.idDemande + ' de ' + this.nom + '  ' + this.Prenom + ' a ete soumise ').then((projet) => {
      console.log('envoi de sms god 00237698893924', projet)

    }).catch(rejects => {
      console.log('erreur d envoi de sms ', rejects)
    })
  }
  sendSmsClient() {
    this.serviceMailSms.sendSms("MyDoc", "00237" + this.numero, " Votre demande   ID: " + this.idDemande + " a ete bien soumise").then((projet) => {
      console.log('envoi de sms god ', projet)

    }).catch(rejects => {
      console.log('erreur d envoi de sms ', rejects)
    })
  }

  afficheDemandeSelectioner() {
    const dialogRef = this.dialog.open(DialogoHeaderComponent);
    this.dialog.getDialogById
    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
