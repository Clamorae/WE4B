import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-logzone',
  templateUrl: './logzone.component.html',
  styleUrls: ['./logzone.component.css']
})
export class LogzoneComponent implements OnInit {

  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService:FirebaseService) { }

  ngOnInit(): void {
  }

  logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
  }

}
