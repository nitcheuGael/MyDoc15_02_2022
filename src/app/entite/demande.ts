export class demande {
    nom = ''
    prenom = ''
    email = ''
    telephone = ''
    idDemandeur = ''
    typeDemande = ''
    Statut = ''
    VilleRetrait = ''
    adresseRetrait = ''
    AdresseDemandeur = ''
    VilleDemandeur = ''
    PhotoCNI = ''
    Contrat = ''
    commentaire = ''


    constructor(nom: string, prenom: string, email: string, telephone: string,
        idDemandeur: string, typeDemande: string, Statut: string, adresseRetrait: string, VilleRetrait: string, AdresseDemandeur: string
        , VilleDemandeur: string, PhotoCNI: string, Contrat: string, commentaire: string) {
        this.nom = nom
        this.prenom = prenom
        this.email = email
        this.telephone = telephone
        this.idDemandeur = idDemandeur
        this.typeDemande = typeDemande
        this.Statut = Statut
        this.adresseRetrait = adresseRetrait
        this.VilleRetrait = VilleRetrait
        this.AdresseDemandeur = AdresseDemandeur
        this.VilleDemandeur = VilleDemandeur
        this.PhotoCNI = PhotoCNI
        this.Contrat = Contrat
        this.commentaire = commentaire
    }

    // constructor1() {

    // }

}