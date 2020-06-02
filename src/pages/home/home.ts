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
    //get all the sites info
    let query = new Parse.Query('Site');
    query.find().then(stores => {
      console.log('Site', stores);

      let markers = stores.map(s => {
        return {
          lat: s.get('geo').latitude,
          lng: s.get('geo').longitude,
          // label: s.get('Name')
          slow: s.get('SlowConnectors'),
          fast: s.get('FastConnectors'),
          rapid: s.get('RapidConnectors'),
          slowA: s.get('SlowA'),
          fastA: s.get('FastA'),
          rapidA: s.get('RapidA'),
        };
      });

      this.navCtrl.push('MapPage', {data: {markers}});
    }, err => {
      console.log('Error getting closest user', err)
    })
  }
  openTask(){
    var info = this.username;
    this.navCtrl.push('TaskPage', {info});
  }
  async viewTask(){
    let Tasks = Parse.Object.extend('Task')
    let tasks = new Parse.Query(Tasks);
    var taskinfo = [];
    tasks.equalTo("Username", this.username);
    const results = await tasks.find();
    for (let i = 0; i < results.length; i++) {
      var object = results[i];
      console.log(object.id);
      var info ={
      username: object.get('Username'),
      stop    : object.get('StartPoint'),
      destination:  object.get('Destination'),
      distance: object.get('Distance'),
      time    : object.get('EstimatedTime'),
      service : object.get('ServiceType'),
      number:object.get('ReferenceNumber'),
      date    : object.get('Date'),
      complete: object.get('Complete'),
      vehicletype : object.get('VehicleType'),
      vehicleid :object.get('VehicleID'),
      task    : object.get('TaskType'),
      instruction: object.get('Instruction'),
      object  :    object.id
      };

      taskinfo.push(info);
    }
      console.log('homepush: '+ taskinfo[0].reference);
      

      
    this.navCtrl.push('TasklistPage', {taskinfo});
    //console.log('homepush newtaskinfo: '+ newtaskinfo, 'infolength: '+newtaskinfo.length);
    //console.log('homepush taskinso: '+ taskinfo[0].object +"<>"+taskinfo[1].object);
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
