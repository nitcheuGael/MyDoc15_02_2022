import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';
import { AboutComponent } from './about/about.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { FooterComponent } from './footer/footer.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { Demande1Component } from './demande1/demande1.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http';
import { MesDemandesComponent } from './mes-demandes/mes-demandes.component';
import { SuiviComponent } from './suivi/suivi.component';
import { ProfilComponent } from './profil/profil.component';
import { DataTablesModule } from 'angular-datatables';




//import { CardsComponent } from './card/card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    //les dependances de material
    MatSliderModule,
    MatGridListModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatDialogModule,
    // fin material

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    DataTablesModule





  ],
  declarations: [
    AboutComponent,
    AcceuilComponent,
    FooterComponent,
    Demande1Component,
    DialogComponent,
    MesDemandesComponent,
    SuiviComponent,
    ProfilComponent,



  ]
})
export class ComponentsModule { }
