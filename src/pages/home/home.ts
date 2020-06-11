import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController,Platform} from 'ionic-angular';
import {Geolocation, Geoposition} from "@ionic-native/geolocation";
import Parse from 'parse';
import {Marker} from "../map/map";
import {fromPromise} from "rxjs/observable/fromPromise";
import { Store, ActionReducer } from '@ngrx/store';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { LaunchNavigator, LaunchNavigatorOptions} from '@ionic-native/launch-navigator';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  // geoposition: Geoposition;
  username:string;
  info: any;
  data: any;
  updatedata:any;
  ChargeLevel:any;
  start: string;
  destination: string;
  // displayinfo: any;
  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public geolocation: Geolocation,
    //public viewCtrl: ViewController,
    private store: Store<any>,
    public localnotification: LocalNotifications,
    public launchnavigator: LaunchNavigator
  ) {
    // let data  = this.navParams.get("info");
    // this.username= data;
    // console.log('HomeReceive ' + data);
    // this.displayinfo=data;
    let data  = Parse.User.current();
    this.username = data.get("username");
    console.log("username: ", this.username);
    this.store.dispatch({
      type: "LOGIN",
      payload: this.username
    });

  }


  ionViewDidLoad(){
    this.RetrieveID();
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
      this.store.dispatch({
        type:"MAP",
        payload:markers
      });
      // this.navCtrl.push('MapPage', {data: {markers}});
      this.navCtrl.push('MapPage');
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

  ClosestCharging(){
    console.log("enter check current ")
  //   this.geolocation.getCurrentPosition().then((position:Position) => {
  //     console.log("position here ")
  //     // this.GetMyCurrentPosition();
  //     // // console.log('Current Position', resp.coords);
  //     this.geoposition = position;
      var geoposition = new Parse.GeoPoint(51.488713,0.005998)
      let geoPoint = new Parse.GeoPoint(geoposition.latitude, geoposition.longitude);
      let query = new Parse.Query("Site");
      query.near('geo', geoPoint);
      query.limit(1);

      query.find().then(charge => {

        console.log("query find")
        let closest = charge[0];
        console.log('Closest user', closest);

        var chargingpoint:Marker = {
          lat: closest.get('geo').latitude,
          lng: closest.get('geo').longitude,
        };

        let user:Marker = {
          lat: geoposition.latitude,
          lng: geoposition.longitude,
        };

        this.start = user.lat +","+user.lng;
        this.destination = chargingpoint.lat +","+chargingpoint.lng;
        // console.log("start: ",this.start)
        // console.log("destination: ",this.destination)
        this.launchnavigator.navigate(this.destination, {
          start:this.start
        }).then(
          success => console.log('Launched navigator'),
          error => alert('Error launching navigator: ' + error)
        );
      }, err => {
        console.log('Error getting closest user', err)
      })


  }

  PushNotification(){
    this.localnotification.schedule({
      id: 1,
      title: 'Low Battery EV!',
      text: 'You need to charge you vehicle ASAP!',
      foreground: true,
      icon: 'res://ic_stat_battery_alert',
      smallIcon: 'res://ic_stat_flash_on',
    });
    this.localnotification.on('click').subscribe(notification => {
      this.ClosestCharging()
    });
  }

  async RetrieveID(){
    var Task = Parse.Object.extend('Task');
    var Taskquery = new Parse.Query(Task);
    Taskquery.equalTo('Username',this.username);
    const result = await Taskquery.find();
    var id = result[0].get('VehicleID');
    console.log("id is: ", id);

    var fleet = Parse.Object.extend('Fleet');
    var fleetquery = new Parse.Query(fleet);
    var subscription = fleetquery.subscribe();

    fleetquery.equalTo('VehicleID', "SS1");
    subscription.on('update', (object) => {
      var level = object.get('ChargingLevel');
      if(level<="30"){
      this.PushNotification();
      }
    });
  }


}
