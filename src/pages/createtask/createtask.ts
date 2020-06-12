import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import Parse from 'parse';
import { ScaleControlStyle } from '@agm/core/services/google-maps-types';
import { Store } from '@ngrx/store';
/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-task',
  templateUrl: 'createtask.html',
})
export class CreateTaskPage {
  username: string;
  //stop= [{}];
  stop:any=[];
  destination: string;
  distance:string;
  time:string;
  instruction:string;
  tasktype:string;
  date:string;
  day:string;
  month:string;
  year:string;
  servicetype: string;
  number:string;
  vehicletype:string;
  vehicleid:string;
  complete:string;
  info:any;
  data:any;
  // displayinfo: any;
  public stopsArray:any=[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private store:Store<any>) {
      // let data  = this.navParams.get("info");
      // this.username= data;
      // console.log('TaskReceive ' + data);
      // this.displayinfo=this.username;
     this.store.select('appReducer').subscribe(state => {
        this.username = state.username;
        console.log('username',this.username);
      });
  }
  selectedTask(event) {
    this.tasktype =event.value
  }
  selectedComplete(event) {
    this.complete =event.value
  }
  selectedVehicle(event) {
    this.vehicletype =event.value
  }
  selectedVehicleID(event) {
    this.vehicleid =event.value
  }
  selectedService(event) {
    this.servicetype =event.value
  }
  selectedDate(event){
    this.date=event.value
  }
  selectedTime(event){
    this.time=event.value
  }
  async create(event){
    for(let i=0;i<this.stopsArray.length;i++){
      this.stop.push(this.stopsArray[i].value);
    }
    // console.log('stops check: '+this.stop);
    // let data  = this.navParams.get("info");
    // if(this.username!=data){
    //   console.log('Taskusername ' + this.username +'Taskdata'+data);
    //   alert('Please not change your username!');
    // }
    if((this.username==null)||(this.destination ==null)||
      (this.distance ==null)||(this.number==null)||(this.time ==null)||(this.vehicletype==null)||
      (this.tasktype ==null)||(this.servicetype==null)||(this.date==null)||(this.complete==null)){

      alert('Please fill in all details inorder to creat a task!');
      //this.navCtrl.setRoot('RegisterPage');
    }else{
      const Task = Parse.Object.extend("Task");
      const task = new Task();
      //16 variables for Task objcet
      task.set("Username", this.username);
      task.set("StopPoint", this.stop);
      task.set("Destination", this.destination);
      task.set("Distance", this.distance);
      task.set("EstimatedTime", this.time);
      task.set("ReferenceNumber", this.number);
      task.set("Date", this.date);
      task.set("Day", this.date.slice(8,10));
      task.set("Month", this.date.slice(5,7));
      task.set("Year", this.date.slice(0,4));
      task.set("Complete", this.complete);
      task.set("VehicleType",this.vehicletype);
      task.set("VehicleID", this.vehicleid);
      task.set("TaskType", this.tasktype);
      task.set("ServiceType", this.servicetype);
      task.set("Instruction", this.instruction);
      task.save()
      .then((player) => {
        // Success
        alert('New task is created successfully!');
        // this.toastCtrl.create({
        //      message: 'Account created successfully',
        //      duration: 2000
        //    })
        this.username = '';
        //this.stop = [{}];
        this.stop = '';
        this.destination = '';
        this.distance = '';
        this.time = '';
        this.number = ' ';
        this.date = '';
        this.vehicletype = '';
        this.vehicleid = '';
        this.complete = '';
        this.tasktype = '';
        this.servicetype = '';
        this.instruction = '';
      }, (error) => {
        // Save fails
        alert('Failed to create new object, with error code: ' + error.message);
      });
      this.navCtrl.setRoot('HomePage');
    }
  }
  // goback(){
  //   var info = this.username;
  //   this.navCtrl.push('HomePage', {info} );
  // }
  viewtask(){
    this.navCtrl.push('TasklistPage');
  }
  Add(){
    this.stopsArray.push({});
  }
  Remove(){
    this.stopsArray.pop({});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskPage');
  }

}
