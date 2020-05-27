import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import Parse from 'parse';
import { ScaleControlStyle } from '@agm/core/services/google-maps-types';
/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {
  username: string;
  startpoint: string;
  destination: string;
  distance:string;
  time:string;
  instruction:string;
  task:string;
  date:string;
  day:string;
  month:string;
  year:string;
  service: string;
  number:string;
  vehicle:string;
  complete:string;
  info:any;
  data:any;
  displayinfo: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController) {
      let data  = this.navParams.get("info");
      this.username= data;
      console.log('TaskReceive ' + data);
      this.displayinfo=this.username;
  }
  selectedTask(event) {
    this.task =event.value
  }
  selectedComplete(event) {
    this.complete =event.value
  }
  selectedVehicle(event) {
    this.vehicle =event.value
  }
  selectedService(event) {
    this.service =event.value
  }
  selectedDate(event){
    this.date=event.value
  }
  selectedTime(event){
    this.time=event.value
  }
  async create(event){
    let data  = this.navParams.get("info");
    if(this.username!=data){
      console.log('Taskusername ' + this.username +'Taskdata'+data);
      alert('Please not change your usernmae!');
    }
    // else if((this.username==null)||(this.startpoint ==null)||(this.destination ==null)||
    //   (this.distance ==null)||(this.number==null)||(this.time ==null)||(this.vehicle==null)||
    //   (this.task ==null)||(this.service==null)||(this.date==null)||(this.complete==null)){
    //   alert('Please fill in all details inorder to creat a task!');
    //   //this.navCtrl.setRoot('RegisterPage');
    // }else{
      const Task = Parse.Object.extend("Task");
      const task = new Task();
      task.set("Username", this.username);
      task.set("StartPoint", this.startpoint);
      task.set("Destination", this.destination);
      task.set("Distance", this.distance);
      task.set("EstimatedTime", this.time);
      task.set("ReferenceNumber", this.number);
      task.set("Date", this.date);
      task.set("Day", this.date.slice(8,10));
      task.set("Month", this.date.slice(5,7));
      task.set("Year", this.date.slice(0,4));
      task.set("Complete", this.complete);
      task.set("Vehicle",this.vehicle);
      task.set("TaskType", this.task);
      task.set("Service", this.service);
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
        this.startpoint = '';
        this.destination = '';
        this.distance = '';
        this.time = '';
        this.number = ' ';
        this.date = '';
        this.vehicle = '';
        this.complete = '';
        this.task = '';
        this.service = '';
        this.instruction = '';
      }, (error) => {
        // Save fails
        alert('Failed to create new object, with error code: ' + error.message);
      });
      this.navCtrl.setRoot('HomePage');
    //}
  }
  goback(){
    this.navCtrl.setRoot('HomePage');
  }
  viewtask(){
    this.navCtrl.setRoot('TasklistPage');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskPage');
  }

}
