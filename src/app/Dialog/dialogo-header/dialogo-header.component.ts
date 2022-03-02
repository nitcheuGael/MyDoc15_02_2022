import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialogo-header',
  templateUrl: './dialogo-header.component.html',
  styleUrls: ['./dialogo-header.component.css']
})
export class DialogoHeaderComponent implements OnInit {

  listeDonnee: any;
  nom = ''
  prenom = ''
  email = ''
  tel = ''
  typedoc = ''
  villeRetrait = ''
  adresseComp = ''
  commentaire = ''
  ville = ''
  adresseRetrait = ''
  idDemande: any



  constructor() { }

  ngOnInit(): void {
    this.afficheDemande()

  }


  afficheDemande() {
    this.listeDonnee = JSON.parse(localStorage.getItem('afficheDemande') || '')
    this.nom = this.listeDonnee.nom
    this.prenom = this.listeDonnee.prenom
    this.email = this.listeDonnee.email
    this.tel = this.listeDonnee.tel
    this.typedoc = this.listeDonnee.typeDemande
    this.adresseComp = this.listeDonnee.adresseDemandeur
    this.ville = this.listeDonnee.villeDemandeur
    this.villeRetrait = this.listeDonnee.villeRetrait
    this.adresseRetrait = this.listeDonnee.adresseRetrait
    this.commentaire = this.listeDonnee.commentaire
    this.idDemande = this.listeDonnee.id

    localStorage.removeItem('afficheDemande')

  }


}

