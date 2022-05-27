import { ObtainCommentairesService } from './../obtain-commentaires.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-liste-commentaires',
  templateUrl: './liste-commentaires.component.html',
  styleUrls: ['./liste-commentaires.component.css']
})
export class ListeCommentairesComponent implements OnInit {

  commentaires:string[]=[]

  //est lié soit à un utilisateur soit à un établissement:
  @Input() estUtilisateur!:boolean
  @Input() id!:number

  constructor(private service:ObtainCommentairesService) {
    
   }

  ngOnInit(): void {
    if(this.estUtilisateur){
      this.commentaires = this.service.getCommentairesUtilisateur(this.id)
    } else {
      this.commentaires = this.service.getCommentairesEtablissement(this.id)
    }
  }

}
