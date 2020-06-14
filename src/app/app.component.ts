import { Component } from '@angular/core';
import { Platform, AlertController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';


import Parse from 'parse';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public localnotification: LocalNotifications) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // this.pushSetUp();

      //using testingtask app
      Parse.initialize("xJ7F9Uixopap8zn7WGlXoWdQMtNaH3DmamCMnMI1", "TsOqkbfPfY7gUDoDluOJ59e5r3lBYLKLeBUSsmya");
      // Parse.initialize("XiiCvvh3t61q2vMSQornvYKPPsPcTszpsMB0tpbT", "UMEsWQpchNtjV5XCyaA6uXaZOAiXO5x73vObhzKv");
      Parse.serverURL = 'https://parseapi.back4app.com/';
      Parse.liveQueryServerURL = 'ws://testingtask.back4app.io';

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


