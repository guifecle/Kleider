import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public appCtrl: App) {

  }
  logout(){
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }
}
