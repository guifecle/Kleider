import { Component, ViewChild } from '@angular/core';
import { NavController, App, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  images=[]
  count=0;
  initiliazeCube = 0;
  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController,public appCtrl: App) {

    for (var i = 0; i < 10;  i++) {
      this.images.push({url:'https://source.unsplash.com/random/800x600?i='+i})
    } 
    console.log(this.images)
  }
  
  rodaRodaDoMilhao(){
    if(this.count == 0) this.initiliazeCube = 1;

    setTimeout(() => {
      if(this.count %2 == 0 )
      this.slides.startAutoplay();
      else
      this.slides.stopAutoplay();
  
      this.count++;
      console.log(this.count);
      
    }, 100);
  
  }
 
}
