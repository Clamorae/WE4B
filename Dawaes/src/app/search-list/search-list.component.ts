import {  ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { ObtainEtablissementListService } from './../obtain-etablissement-list.service';
import { Etablissement } from './../class/Etablissment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  etablissements : Etablissement[]=[]

  constructor(private service:ObtainEtablissementListService,private router:Router) {
    this.etablissements=service.getList()

    this.router.events.subscribe((event: Event) =>{
      if (event instanceof NavigationEnd) {
        this.etablissements=service.getList()
      }
    })
   }

  ngOnInit(): void {
  }

}
