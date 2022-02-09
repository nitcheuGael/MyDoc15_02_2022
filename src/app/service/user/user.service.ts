import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constante } from 'src/app/entite/constante';
import { ProfilUser } from 'src/app/entite/profil/profil-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(
    private httpClient: HttpClient,
  ) { }

  addUser(profile: ProfilUser) {
    let body = new FormData();
    body.append('uid', profile.uid);
    body.append('nom', profile.nom);
    body.append('prenom', profile.prenom);
    body.append('sexe', profile.sexe);
    body.append('tel', profile.telephone);
    body.append('mail', profile.email);
    body.append('photo', profile.photo);
    body.append('ville', profile.ville);
    body.append('quatier', profile.quatier);

    return new Promise((resolve, reject) => {
      this.httpClient.post(Constante.BASE_URL + 'user/add', body).toPromise().then((data: any) => {
        resolve(data);
      }).catch(error => {
        reject(error);
      })
    });
  }




  getUser(uidUser: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(Constante.BASE_URL + 'user/get/' + uidUser).toPromise().then((data: any) => {
        resolve(data);
      }).catch(error => {
        reject(error);
      })
    });
  }

}
