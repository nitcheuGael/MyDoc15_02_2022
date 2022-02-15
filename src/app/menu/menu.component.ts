import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  @Output() public sidenavToggle = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  /* public menuVariable: boolean = false;
  menu_icon_variable: boolean = false;
  openMenu() {
    this.menuVariable = !this.menuVariable;
    this.menu_icon_variable = !this.menu_icon_variable;
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  } */
  // fonction menu angular
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();

  }


}


