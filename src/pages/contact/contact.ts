import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  //User Variables
  protected user$: Observable<any>;
  constructor(
    private navCtrl: NavController,
    private appCtrl: App,
    private userService: UserProvider
  ) {
    this.user$ = this.userService.currentUser$;
  }
  ionViewDidLoad(){
    if(this.user$)
    this.user$.subscribe((us)=>{
      console.log(us);
    })
  }
  logout(){
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }
}
