import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {Geolocation, Geoposition} from "@ionic-native/geolocation";
import Parse from 'parse';
import {Marker} from "../map/map";
import {fromPromise} from "rxjs/observable/fromPromise";
import { Store } from '@ngrx/store';


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
  // displayinfo: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public geolocation: Geolocation,
    //public viewCtrl: ViewController,
    private store: Store<any>
  ) {
    // let data  = this.navParams.get("info");
    // this.username= data;
    // console.log('HomeReceive ' + data);
    // this.displayinfo=data;
    let data  = Parse.User.current();
    this.username = data.get("username");
    console.log("username: ", this.username);
    // this.displayinfo = this.username;
    this.store.dispatch({
      type: "LOGIN",
      payload: this.username
    });
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
    // var info = this.username;
    this.navCtrl.push('CreateTaskPage');
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
        stop    : object.get('StopPoint'),
        destination :  object.get('Destination'),
        distance : object.get('Distance'),
        time    : object.get('EstimatedTime'),
        service : object.get('ServiceType'),
        number : object.get('ReferenceNumber'),
        date    : object.get('Date'),
        complete: object.get('Complete'),
        vehicletype : object.get('VehicleType'),
        vehicleid : object.get('VehicleID'),
        task    : object.get('TaskType'),
        instruction : object.get('Instruction'),
        // depot : "51.496969,0.107444",
        object  :    object.id
      };
      taskinfo.push(info);
    }
    if(taskinfo.length==0){
      alert('You have no task history!');
    }else{
      // console.log('homepush: '+ taskinfo[0].reference);
      this.store.dispatch({
        type:"TASK",
        payload:taskinfo
      })
      this.navCtrl.push('TasklistPage');
    }
    //console.log('homepush newtaskinfo: '+ newtaskinfo, 'infolength: '+newtaskinfo.length);
    //console.log('homepush taskinso: '+ taskinfo[0].object +"<>"+taskinfo[1].object);
  }
  async profile() {
    let Employees = Parse.Object.extend('Employees')
    let employees = new Parse.Query(Employees);
    employees.equalTo("Username", this.username);
    const results = await employees.find();
    // for (let i = 0; i < results.length; i++) {
    //   var object = results[i];
    //   // console.log("hahah",results.length);
    // }
    // console.log("hahah",typeof results);
    var info = {Title:results[0].get('Title'),
                FirstName:results[0].get('FirstName'),
                LastName: results[0].get('LastName'),
                Gender: results[0].get('Gender'),
                ServiceDepartment: results[0].get('ServiceDepartment'),
                EmployeeID: results[0].get('EmployeeID'),
                Username: results[0].get('Username'),
                Password: results[0].get('Password'),
                PhoneNumber: results[0].get('PhoneNumber'),
                EmailAddress: results[0].get('EmailAddress'),

              };
    this.store.dispatch({
      type: "PROFILE",
      payload: info
    });

    this.navCtrl.push('ProfilePage');

    //alert(object.get('Username'));
  }

}
