import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user.models';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import * as firebase from 'firebase/app'
import Swal from 'sweetalert2'
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  signupForm: FormGroup;
  loader: any;
  private filePhoto: File;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userService: UserProvider,
    public loadingCtrl: LoadingController,
    public appCtrl: App,
    public AuthService: AuthenticateProvider
  ) {
    let emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.compose([Validators.pattern(emailRegexp)])]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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

  public onSubmit(): void {
    this.presentLoading();
    let formValue = this.signupForm.value;
    let username = formValue.name;
    console.log("oi")
    this.userService.userExists(username).first().subscribe((userExists: boolean) => {
      console.log("oiii")
      if (!userExists) {
        this.AuthService.createAuthUser({
          email: formValue.email,
          password: formValue.password
        }).then((authUser: any) => {
          delete formValue.password;
          let uuid = authUser.uid;
          this.userService.create(formValue,uuid).then(() => {
            this.dismissLoading();
            Swal({ title: 'Yeahhhh!', text: 'Usuario cadastrado!', type: 'success', timer: 1500, })
            .then((result)=>{
              if(result){
                this.onSignUp();
              }
            })
          }).catch((error) => {
            this.dismissLoading();
            console.error(error.message)
            Swal({ title: 'Oops...', text: error.message, type: 'error', timer: 1500 })
          });
        }).catch((error) => {
          console.error(error.message)
          this.dismissLoading();
          Swal({ title: 'Oops...', text: error.message, type: 'error', timer: 1500 })

        })
      } else {
        this.dismissLoading();
        Swal({ title: 'Oops...', text: 'O login ja esta sendo utilizado', type: 'error', timer: 1500 })
      }
    })
    this.dismissLoading();
  }
  onSignUp() {
    let dire = "back"
    this.appCtrl.getRootNav().setRoot(TabsPage, [], { duration: 1000, animation: "ios-transition", animate: true, direction: dire })
  }
  onPhoto(event):void{
    this.filePhoto = event.target.files[0];
    console.log(event.target.files)
  }
  

}
