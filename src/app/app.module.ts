import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import  'materialize-css';
import { MaterializeModule } from 'angular2-materialize';
import { LoginPage } from '../pages/login/login';
import { GaleriaPage } from '../pages/galeria/galeria';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { UserProvider } from '../providers/user/user';

//FireBase
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthenticateProvider } from '../providers/authenticate/authenticate';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyDQUUngWHg4wRG7RN1keEJNd77QNYVA6lI",
  authDomain: "kleider-40b8e.firebaseapp.com",
  databaseURL: "https://kleider-40b8e.firebaseio.com",
  projectId: "kleider-40b8e",
  storageBucket: "",
  messagingSenderId: "793580625707"
};

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    GaleriaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule,
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    GaleriaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    AuthenticateProvider,
  ]
})
export class AppModule {}
