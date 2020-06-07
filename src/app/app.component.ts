import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import Parse from 'parse';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      Parse.initialize("4EpCkDqxP3a7muRq0TK5Ab95ZeEMIoQxOeRSfHyb", "3oIjMNUvn0WIj6yVTbWPM4ahuUcSoba07pwHVkTA");
      // Parse.initialize("XiiCvvh3t61q2vMSQornvYKPPsPcTszpsMB0tpbT", "UMEsWQpchNtjV5XCyaA6uXaZOAiXO5x73vObhzKv");
      Parse.serverURL = 'https://parseapi.back4app.com/';

      Parse.User.currentAsync().then(user => {
        console.log('Logged user', user);

        this.rootPage = user ? 'HomePage' : 'LoginPage';
      }, err => {
        console.log('Error getting logged user');

        this.rootPage = 'LoginPage';
      })
    });
  }
}
