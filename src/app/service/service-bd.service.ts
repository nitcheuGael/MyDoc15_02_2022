import { Injectable } from '@angular/core';
import { demande } from '../entite/demande';
import { HttpClient } from '@angular/common/http';
import { Constante } from '../entite/constante';



@Injectable({
  providedIn: 'root'
})
export class ServiceBdService {

  //private static BASE_URL = 'http://localhost/mydoc/index.php';
  public constance!: Constante

  constructor(
    private httpClient: HttpClient,

  ) { }
  //INSERTION DE LA DEMANDE DANS LA BD
  addDemande(demande: demande) {
    let body = new FormData();
    body.append('idDemandeur', demande.idDemandeur);
    body.append('typeDemande', demande.typeDemande);
    body.append('nom', demande.nom);
    body.append('prenom', demande.prenom);
    body.append('statut', demande.Statut);
    body.append('adresseRetrait', demande.adresseRetrait);
    body.append('villeRetrait', demande.VilleRetrait);
    body.append('adresseDemandeur', demande.AdresseDemandeur);
    body.append('villeDemandeur', demande.VilleDemandeur);
    body.append('tel', demande.telephone);
    body.append('email', demande.email);
    body.append('photoCNI', demande.PhotoCNI);
    body.append('statutContrat', demande.Contrat);
    body.append('commentaire', demande.commentaire);
    return new Promise((resolve, reject) => {
      this.httpClient.post(Constante.BASE_URL + 'demande/add', body).toPromise().then((data: any) => {
        resolve(data);
      }).catch(error => {
        reject(error);
      })
    });
  }
  //MODIFICATION DE LA DEMANDE DANS LA BD




  /**
   * get user by id
   * @param id 
   */
  getDemandeById(idDemandeur: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(Constante.BASE_URL + 'demande/get/' + idDemandeur).toPromise().then((data: any) => {
        resolve(data);
      }).catch(error => {
        reject(error);
      })
    });
  }
  getDemandeByIdAnd_Statut(idDemandeur: string, statut: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(Constante.BASE_URL + 'demande/get_by_id_statut/' + idDemandeur + '/' + statut).toPromise().then((data: any) => {
        resolve(data);
      }).catch(error => {
        reject(error);
      })
    });
  }
  /**
    * Disable user
    * @param user 
    */
  editstatut(userId: string, statut: string) {
    let body = new FormData();
    body.append('statut', statut);
    return new Promise((resolve, reject) => {
      this.httpClient.post(Constante.BASE_URL + 'demande/editStatut/' + userId, body).toPromise().then((data: any) => {
        resolve(data);
      }).catch(erro => {
        reject(erro);
      })
    });
  }
  //EDITER DE LA DEMANDE DANS LA BD
  editAllDemande(demande: demande, demandeId: string) {
    let body = new FormData();
    body.append('idDemandeur', demande.idDemandeur);
    body.append('typeDemande', demande.typeDemande);
    body.append('nom', demande.nom);
    body.append('prenom', demande.prenom);
    body.append('statut', demande.Statut);
    body.append('adresseRetrait', demande.adresseRetrait);
    body.append('villeRetrait', demande.VilleRetrait);
    body.append('adresseDemandeur', demande.AdresseDemandeur);
    body.append('villeDemandeur', demande.VilleDemandeur);
    body.append('tel', demande.telephone);
    body.append('email', demande.email);
    body.append('photoCNI', demande.PhotoCNI);
    body.append('statutContrat', demande.Contrat);
    body.append('commentaire', demande.commentaire);
    return new Promise((resolve, reject) => {
      this.httpClient.post(Constante.BASE_URL + 'demande/editAll/' + demandeId, body).toPromise().then((data: any) => {
        resolve(data);
      }).catch(error => {
        reject(error);
      })
    });
  }


}