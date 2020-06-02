//import { LaunchNavigator } from './../../plugins/uk.co.workingedge.phonegap.plugin.launchnavigator/uk.co.workingedge.phonegap.plugin.launchnavigator.d';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AgmCoreModule } from '@agm/core';
import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    MyApp,
    //HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyBJwcfgMlynSllZzxCJ_ehUJkXx1zx6VSs'
    }),HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LaunchNavigator,
  ]
})
export class AppModule {}
