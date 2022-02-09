import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  /* {
    path: '',
    title: 'Personal',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  }, */
  {
    path: '/dashboard',
    title: 'DASHBOARD',
    icon: 'mdi mdi-poll',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/demande1',
    title: 'FORMULAIRE DE DEMANDE',
    icon: 'mdi mdi-sort-variant',
    class: '',
    extralink: false,

    submenu: []
  },
  /*  {
     path: '/component/suivi',
     title: 'Suivis demande',
     icon: 'mdi mdi-message-bulleted',
     class: '',
     extralink: false,
     submenu: []
   }, */
  {
    path: '/component/mes-demandes',
    title: 'MES DEMANDES',
    icon: 'mdi mdi-view-carousel',
    class: '',
    extralink: false,
    submenu: []
  },

];
