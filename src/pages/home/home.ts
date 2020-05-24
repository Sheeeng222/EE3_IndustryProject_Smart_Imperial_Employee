import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {Geolocation, Geoposition} from "@ionic-native/geolocation";
import Parse from 'parse';
import {Marker} from "../map/map";
import {fromPromise} from "rxjs/observable/fromPromise";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  geoposition: Geoposition;
  username:string;
  info: any;
  data: any;
  updatedata:any;
  displayinfo: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public geolocation: Geolocation,
    //public viewCtrl: ViewController,
  ) {
    let data  = this.navParams.get("info");

    this.username= data;
    console.log('HomeReceive ' + data);
    this.displayinfo=data;
  
    
  }

  logOut() {
    Parse.User.logOut().then((resp) => {
      console.log('Logged out successfully', resp);

      this.navCtrl.setRoot('LoginPage');
    }, err => {
      console.log('Error logging out', err);

      this.toastCtrl.create({
        message: 'Error logging out',
        duration: 2000
      }).present();
    })
  }
  openMap() {
    let query = new Parse.Query('ChargingPoint');
    query.find().then(stores => {
      console.log('ChargingPoint', stores);

      let markers = stores.map(s => {
        return {
          lat: s.get('Location').latitude,
          lng: s.get('Location').longitude,
          label: s.get('Name')
        };
      });

      this.navCtrl.push('MapPage', {data: {current: markers[0], markers}});
    }, err => {
      console.log('Error getting closest user', err)
    })
  }
  async profile() {
    let Employees = Parse.Object.extend('Employees')
    let employees = new Parse.Query(Employees);
    employees.equalTo("Username", this.username);
    const results = await employees.find();
    for (let i = 0; i < results.length; i++) {
      var object = results[i];
      console.log(object.id);
    }
    var info = [object.get('Title'),
                object.get('FirstName'),
                object.get('LastName'),
                object.get('Gender'),
                object.get('ServiceDepartment'),
                object.get('EmployeeID'),
                object.get('Username'),
                object.get('Password'),
                object.get('PhoneNumber'),
                object.get('EmailAddress'),
                object.id
              ];
    console.log(info);
    this.navCtrl.push('ProfilePage',{info});
    //alert(object.get('Username'));
  }
  
}
