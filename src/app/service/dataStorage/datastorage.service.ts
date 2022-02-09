import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { demande } from 'src/app/entite/demande';

@Injectable({
  providedIn: 'root'
})
export class DatastorageService {


  isOpen = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  public tail = new Subject<boolean>()
  public listeDemande = new Subject<any>();
  public demande = new Subject<demande[]>();
  public event = this.demande.asObservable();

  constructor() {

  }

  public publishDemande(data: demande[]) {
    this.demande.next(data);
  }
  public afflisteDemande(data: any) {
    this.listeDemande.next(data)
  }
  public afTail(data: boolean) {
    this.tail.next(data)
  }


  toggle(bool: boolean) {
    this.change.emit(bool);
  }
}
