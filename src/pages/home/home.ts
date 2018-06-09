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
  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController,public appCtrl: App) {
    
    // $(document).ready(function(){
    //   $('#demo-carousel').carousel();
    // });
    for (var i = 0; i < 20;  i++) {
      this.images.push({url:'https://source.unsplash.com/random/800x600?i='+i})
    }
  }
  rodaRodaDoMilhao(){
    if(this.count %2 == 1 )
    this.slides.startAutoplay();
    else
    this.slides.stopAutoplay();

    this.count++;
    console.log(this.count);
    
  }
 
}
