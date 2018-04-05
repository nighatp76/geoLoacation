import { Component } from '@angular/core';
import { Platform,App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geonavigaion } from '../pages/Geo_navigaion/Geo_navigaion';
import { GeoAutoFinder } from '../pages/GeoAutoFinder/GeoAutoFinder';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
   rootPage:any = GeoAutoFinder;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private app: App) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

