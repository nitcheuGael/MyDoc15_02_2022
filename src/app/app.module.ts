import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';


import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LandingComponent } from './landing/landing.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';

import { ToastrModule } from 'ngx-toastr';
import { AuthGuardComponent } from './auth-guard/auth-guard.component';
import { AngularFireStorageModule } from '@angular/fire/storage';


import { MatDialogModule } from '@angular/material/dialog';
import { DialogoHeaderComponent } from './Dialog/dialogo-header/dialogo-header.component';
import { DialogConfirmActionComponent } from './Dialog/dialog-confirm-action/dialog-confirm-action.component';
import { CodeComponent } from './code/code.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { DataTablesModule } from 'angular-datatables';






const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    BreadcrumbComponent,
    LandingComponent,
    ConnexionComponent,
    AuthGuardComponent,
    DialogoHeaderComponent,
    DialogConfirmActionComponent,
    CodeComponent,


  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    PerfectScrollbarModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    //les dependances de material
    MatSliderModule,
    HttpClientModule,
    MatGridListModule,
    MatDialogModule,
    // fin material

    RouterModule.forRoot(Approutes, { useHash: false, relativeLinkResolution: 'legacy' }),
    AngularFireModule.initializeApp(environment.firebase),
    ToastrModule.forRoot(),
    //Fire stort
    AngularFireStorageModule,
    NgOtpInputModule,
    DataTablesModule


  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
