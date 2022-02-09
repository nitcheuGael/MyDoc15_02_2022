import { Component, OnInit } from '@angular/core';
import { DatastorageService } from 'src/app/service/dataStorage/datastorage.service';

@Component({
  selector: 'app-total-variables',
  templateUrl: './total-variables.component.html',
  styleUrls: ['./total-variables.component.css']
})
export class TotalVariablesComponent implements OnInit {
  demandeEc = true
  tail = 0

  constructor(
    private dataService: DatastorageService,

  ) { }

  ngOnInit(): void {
    this.dataService.demande.subscribe((data) => {
      this.tail = data.length;
    });
  }





}
