export class ProfilUser {
    nom = ''
    prenom = ''
    sexe = ''
    email = ''
    telephone = ''
    uid = ''
    ville = ''
    quatier = ''
    photo = ''
    constructor(
        nom: string, prenom: string, sexe: string, telephone: string, uid: string, ville: string, quatier: string, photo: string, email: string
    ) {
        this.nom = nom,
            this.prenom = prenom
        this.sexe = sexe
        this.telephone = telephone
        this.uid = uid
        this.ville = ville
        this.quatier = quatier
        this.photo = photo
        this.email = email
    }

}
