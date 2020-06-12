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

      //ranking now
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

  // pushSetUp(){
  //   const options: PushOptions = {
  //     android: {
  //         iconColor:'red',
  //         icon:'notify',
  //         sound:true,
  //         vibrate: true
  //       }
  //   };
  //   const pushObject: PushObject = this.push.init(options);

  //   this.push.createChannel({
  //     id: "testchannel1",
  //     description: "My first test channel",
  //     // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
  //     importance: 4
  //    }).then(() => console.log('Channel created'));

  //    pushObject.on('notification').subscribe((notification: any) => {
  //     console.log(notification)
  //     let youralert = this.alertCtrl.create({
  //       title: 'Warning: Low Charging Level',
  //       message: 'Please charge your car ASAP!'
  //    });
  //     youralert.present();
  //   });
  //   }
  }


