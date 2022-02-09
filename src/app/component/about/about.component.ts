import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs'
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  images!: Observable<any[]>;
  downloadURL: Observable<any> | undefined;
  fb: any;
  constructor(
    private storage: AngularFireStorage
  ) {
    storage.ref("/").getDownloadURL().subscribe(downloadURL => {
      this.images = downloadURL;

    });

  }

  ngOnInit(): void {
  }




}
