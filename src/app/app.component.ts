import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFire } from 'angularfire2';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = HomePage;
  public rootPage: any;

  constructor(platform: Platform, public af: AngularFire, statusBar: StatusBar, splashScreen: SplashScreen) {

    const authObserver = af.auth.subscribe( user => {
      if (user) {
        console.log('user');
        console.log(user);
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        console.log('loggin');
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

