import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public menuVariable: boolean = false;
  menu_icon_variable: boolean = false;
  openMenu() {
    this.menuVariable = !this.menuVariable;
    this.menu_icon_variable = !this.menu_icon_variable;
  }





}


