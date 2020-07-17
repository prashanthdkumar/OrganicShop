import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  constructor(private auth: AngularFireAuth) {
    auth.authState.subscribe(x => console.log(x));
  }

  logout() {
    this.auth.signOut();
  }
}
