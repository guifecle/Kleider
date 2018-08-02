import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  user: any;
  constructor(public navCtrl: NavController, public appCtrl: App,public userService: UserProvider) {
  }
  ionViewDidLoad(){
    this.user = this.userService.currentUser;
    this.user.subscribe((us)=>{
      console.log(us);
      
    })
    
  }
  logout(){
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }
}
