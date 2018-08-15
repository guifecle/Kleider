import { Component, ViewChild } from '@angular/core';
import { NavController, App, Slides } from 'ionic-angular';
import { PhotoProvider } from '../../providers/photo/photo';
import { UserProvider } from '../../providers/user/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Variables
  protected images = []
  private count = 0;
  protected initiliazeCube = 0;
  protected loading: boolean = false;
  //User Variables
  public currentUser: any;
  public key: string;
  //Observables
  public currentUser$: Observable<any>;

  @ViewChild(Slides) slides: Slides;

  constructor(
    public navCtrl: NavController,
    public appCtrl: App,
    private photoService: PhotoProvider,
    protected userService: UserProvider
  ) {
    this.currentUser$ = this.userService.currentUser$;
    for (var i = 0; i < 10; i++) {
      this.images.push({ url: 'https://source.unsplash.com/random/800x600?i=' + i })
    }
  }

  ionViewDidLoad() {
    this.currentUser = this.userService.currentUser;
    this.key = this.userService.key;
    console.log(this.key)
  }

  protected rodaRodaDoMilhao() {
    if (this.count == 0) this.initiliazeCube = 1;

    setTimeout(() => {
      if (this.count % 2 == 0)
        this.slides.startAutoplay();
      else
        this.slides.stopAutoplay();

      this.count++;
      console.log(this.count);
    }, 100);
  }

  protected tiraFoto() {
    if(!this.loading){
      this.loading = true;
      this.photoService.takePhoto(this.key).then(() => {
        setTimeout(() => {
          this.loading = false;
        }, 1000)
      })
    } 
  }

}
