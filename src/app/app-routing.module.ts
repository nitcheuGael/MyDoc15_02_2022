import { Routes } from '@angular/router';
import { AuthGuardComponent } from './auth-guard/auth-guard.component';
import { CodeComponent } from './code/code.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { LandingComponent } from './landing/landing.component';
import { FullComponent } from './layouts/full/full.component';
export const Approutes: Routes = [


  {
    path: '',
    component: LandingComponent

  },

  {


    path: '',
    component: FullComponent,
    children: [
      /*  {
        
         path: '',
         redirectTo: '/component/about',
         pathMatch: 'full'
       }, */
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      }
    ]
  },

  {
    path: 'land',
    component: LandingComponent
  },
  {
    path: 'connexion',
    component: ConnexionComponent
  },
  {
    path: 'code',
    component: CodeComponent
  },
  {
    path: 'loading',
    component: AuthGuardComponent
  },
  {
    path: '',
    component: LandingComponent
  },

  {
    path: '**',
    component: LandingComponent

  }

];
