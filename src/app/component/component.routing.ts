import { Routes } from '@angular/router';
import { Demande1Component } from './demande1/demande1.component';
import { MesDemandesComponent } from './mes-demandes/mes-demandes.component';
import { ProfilComponent } from './profil/profil.component';
import { SuiviComponent } from './suivi/suivi.component';

export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [


			{
				path: 'demande1',
				component: Demande1Component,
				data: {
					title: '',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: '' }
					]
				}
			},
			{
				path: 'profil',
				component: ProfilComponent,
				data: {
					title: '',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: '' }
					]
				}
			},

			{
				path: 'suivi',
				component: SuiviComponent,
				data: {
					title: 'Etat de mes demandes en cours',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Etat demande' }
					]
				}
			},
			{
				path: 'mes-demandes',
				component: MesDemandesComponent,
				data: {
					title: 'Liste de mes Demandes ',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'A propos' }
					]
				}
			},


		]
	},



];
