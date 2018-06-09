import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GaleriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-galeria',
  templateUrl: 'galeria.html',
})
export class GaleriaPage {
  images = [];
  grid = true;

  constructor(public navCtrl: NavController) {

    //adicionando 10 imagens randomicas no array images
    for (var i = 0; i < 10;  i++) {
      this.images.push({url:'https://source.unsplash.com/random/800x600?i='+i})
    }
  }

  //para mudar de uma foto por linha
  changeGrid(){
    this.grid = !this.grid;
  }

}
