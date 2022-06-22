//Classe pour stocker les informations sur un établissement
export class Etablissement {
    constructor ( 
        //public img: string,
        public name: string,
        public localisation: string,
        public telephone: string,
        public type: string,
        public desc: string,
        public mail: string,
        public isLikedByUser:boolean,
    ) {
        //this.img = img;
        this.name = name;
        this.localisation = localisation;
        this.telephone = telephone;
        this.type = type;
        this.desc = desc;
        this.mail = mail;
        this.isLikedByUser = isLikedByUser;
    }
}