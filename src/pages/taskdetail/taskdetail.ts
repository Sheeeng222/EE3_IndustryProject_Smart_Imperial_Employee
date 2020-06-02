import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Parse from 'parse';
/**
 * Generated class for the TaskdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-taskdetail',
  templateUrl: 'taskdetail.html',
})
export class TaskdetailPage {
  displayinfo: any;
  object: any;
  username: any;
  taskref: any;

  stop: any=[];
  destination: string;
  distance:string;
  time:string;
  instruction:string;
  task:string;
  date:string;
  service: any;
  number:string;
  vehicletype:string;
  vehicleid:string;
  complete:string;
  Checkvalue: boolean;
  Updatevalue: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let detailref  = this.navParams.get("data");
    this.displayinfo = detailref.username;
    this.taskref=detailref.object;
    console.log('displayinfo: '+this.displayinfo+" detail: "+ detailref.object);

    this.stop =detailref.stop;
    this.destination=detailref.destination; 
    this.distance=detailref.distance; 
    this.time=detailref.time;
    this.service=detailref.service;
    this.date=detailref.date;
    this.complete=detailref.complete;
    this.vehicletype=detailref.vehicletype;
    this.vehicleid=detailref.vehicleid;
    this.task=detailref.task; 
    this.number=detailref.number;
    this.instruction=detailref.instruction;
    
    if(this.complete=="Yes"){
      this.Checkvalue=true;
    }else{
      this.Checkvalue=false;
    }      
  }
  openTask(){
    var info = this.displayinfo;
    this.navCtrl.push('TaskPage', {info});
  }
  updateCheck(){
    let Tasks = Parse.Object.extend('Task');
    let tasks = new Parse.Query(Tasks);
    tasks.get(this.taskref)
    .then((player)=>{
      if(this.Checkvalue==true){
        player.set('Complete',"Yes");
        console.log('yes');
      }else{
        player.set('Complete',"No");
        console.log('no');
      }
    player.save();
    console.log('check complete:'+player.get('Complete'))
    });
  }
  async goTasklist(){
    let Tasks = Parse.Object.extend('Task')
    let tasks = new Parse.Query(Tasks);
    var taskinfo = [];
    tasks.equalTo("Username", this.displayinfo);
    const results = await tasks.find();
    for (let i = 0; i < results.length; i++) {
      var object = results[i];
      console.log(object.id);
      var info ={
      username: object.get('Username'),
      stop    : object.get('StopPoint'),
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
    this.navCtrl.push('TasklistPage', {taskinfo});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskdetailPage');
  }

}
