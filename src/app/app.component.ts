import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { Keyboard } from '@ionic-native/keyboard';
import { AuthenticateProvider } from '../providers/authenticate/authenticate';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  changed: boolean = false
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public keyboard: Keyboard, authService: AuthenticateProvider) {
    authService.auth.authState.subscribe((authState: any) => {
      if (authState) {
        if (!this.changed) {
          this.rootPage = TabsPage;
          this.changed = true;
        }
      } else {
        if (!this.changed) {
          this.rootPage = LoginPage;
          this.changed = true;
        }
      }
    });
    platform.ready().then(() => {

      this.keyboard.disableScroll(false);
      statusBar.styleDefault();
      setTimeout(() => {
        splashScreen.hide();
      }, 100);
    });
  }
}
