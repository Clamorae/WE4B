//Classe pour stocker les informations sur un établissement
export class Etablissement {
    constructor ( 
        public img: string,
        public nom: string,
        public adresse: string,
        public codePostal: string,
        public ville: string,
        public pays: string,
        public tel: string,
        public mail: string,
        public prix: string,
        public description : string
    ) {
        this.img = img;
        this.nom = nom;
        this.adresse = adresse;
        this.codePostal = codePostal;
        this.ville = ville;
        this.pays = pays;
        this.tel = tel;
        this.mail = mail;
        this.prix = prix;
        this.description = description
    }
}