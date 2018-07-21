import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignUpPage } from '../sign-up/sign-up';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';

import Swal from 'sweetalert2'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  loader: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    public formBuilder: FormBuilder,
    public authService: AuthenticateProvider,
    public loadingCtrl: LoadingController) {
      let emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.compose([Validators.pattern(emailRegexp)])]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      })
  }
  login(){
    this.appCtrl.getRootNav().setRoot(TabsPage);
  }
  signUp(){
    this.navCtrl.push(SignUpPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  onSubmit():void {
    this.presentLoading();
    this.authService.signInWithEmail(this.loginForm.value)
    .then((isLogged:boolean)=>{
      if(isLogged){
        this.login()
      this.dismissLoading();
      }
      }).catch((error)=>{
      this.dismissLoading();
        Swal('Opss!',error,'error')
      })
  }

  public presentLoading(): void {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();

  }
  private dismissLoading(): void {
    this.loader.dismiss();
  }
}
