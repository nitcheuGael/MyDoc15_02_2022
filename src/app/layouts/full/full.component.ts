import { Component, OnInit, HostListener } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { Router } from '@angular/router';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
//declare var $: any;

@Component({
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {


  public config: PerfectScrollbarConfigInterface = {};
  public testIsConnect = true

  constructor(
    public router: Router,
    private auth: FirebaseApp,

  ) { }

  public innerWidth: number = 0;
  public defaultSidebar: string = '';
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = 'full';


  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {

    this.testConnexion();
    if (this.router.url === '/') {
      this.router.navigate(['/starter']);
    }
    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.sidebartype = 'mini-sidebar';
    } else {
      this.sidebartype = this.defaultSidebar;
    }
  }

  toggleSidebarType() {
    switch (this.sidebartype) {
      case 'full':
        this.sidebartype = 'mini-sidebar';
        break;

      case 'mini-sidebar':
        this.sidebartype = 'full';
        break;

      default:
    }
  }


  testConnexion() {
    this.auth.auth().onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate(['/dashboard'])
      } else {
        this.testIsConnect = false;
        this.router.navigate(['/connexion'])
      }
    })

  }
}
