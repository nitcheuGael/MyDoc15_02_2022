import { Component, OnInit, } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { DialogoHeaderComponent } from 'src/app/Dialog/dialogo-header/dialogo-header.component';
import { demande } from 'src/app/entite/demande';
import { ServiceBdService } from 'src/app/service/service-bd.service';




@Component({
  selector: 'app-mes-demandes',
  templateUrl: './mes-demandes.component.html',
  styleUrls: ['./mes-demandes.component.css']
})
export class MesDemandesComponent implements OnInit {
  demandeList: demande[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  id: any;
  nDemande = true
  listedDemande: any



  constructor(
    private serviceBd: ServiceBdService,
    private auth: FirebaseApp,
    public dialog: MatDialog,


  ) { }

  ngOnInit(): void {

    this.auth.auth().onAuthStateChanged((user) => {
      if (user) {
        this.id = user?.uid;
        this.loadData();
      }
    })
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

  }

  private loadData() {
    this.serviceBd.getDemandeById(this.id)
      .then((data: any) => {
        this.demandeList = data.demande as demande[];

      })
      .catch((error) => {
      })
      ;
  }

  // LA FONCTION QUI RECUPERE LE ID DE LA DEMANDE EN COURS
  RowSelected(u: any) {
    this.listedDemande = u
    localStorage.setItem('afficheDemande', JSON.stringify(this.listedDemande))
    this.afficheDemandeSelectioner()

  }
  afficheDemandeSelectioner() {
    const dialogRef = this.dialog.open(DialogoHeaderComponent);
    this.dialog.getDialogById
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}


