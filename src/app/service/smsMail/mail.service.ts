import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constante } from 'src/app/entite/constante';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(
    private httpClient: HttpClient,

  ) { }



  sendEmail(to: string, subjet: string, message: string, sender: string) {
    let body = new FormData();
    body.append('email', to);
    body.append('objet', subjet);
    body.append('message', message);
    body.append('entetes', sender);
    return new Promise((resolve, reject) => {
      this.httpClient.post(Constante.BASE_URL + 'Send/sendEmail/', body).toPromise().then((data: any) => {
        resolve(data);
      }).catch(erro => {
        reject(erro);
      })
    });
  }

  sendSms(sender: string, numero: string, message: string) {
    let body = new FormData();
    body.append('phones', numero);
    body.append('message', message);
    body.append('sender', sender);
    return new Promise((resolve, reject) => {
      this.httpClient.post(Constante.BASE_URL + 'Send/bulkSend/', body).toPromise().then((data: any) => {
        resolve(data);
      }).catch(erro => {
        reject(erro);
      })
    });
  }
}
